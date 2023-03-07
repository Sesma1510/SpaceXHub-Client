import { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { Link, useOutletContext } from "react-router-dom";
import Favorite from "../components/Favorite";
import attachHoverListener from "../utils/hover";
import launchesService from "../services/launches.service";
import favoritesService from "../services/favorites.service";

export default function Launches() {
  const { user } = useOutletContext();

  const [launches, setLaunches] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const { data } = await launchesService.getLaunches();
        const { data: favorites } = await favoritesService.getFavorites(
          user._id
        );
        console.log(favorites);
        setLaunches(data);
        setFavorites(favorites.map((fav) => fav.launch));
      } catch (error) {
        console.log(error);
      }
    };

    fetchLaunches();
  }, [user._id]);

  useEffect(() => {
    if (isHovering) {
      attachHoverListener();
    } else {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.setProperty("--mouse-x", "0px");
        card.style.setProperty("--mouse-y", "0px");
      });
    }
  }, [isHovering]);

  const handleLaunchClick = (event) => {
    event.stopPropagation();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const toggleFavorite = async (launchId) => {
    try {
      if (favorites.includes(launchId)) {
        // Remove launch from favorites
        const response = await favoritesService.removeFavorite(
          user._id,
          launchId
        );
        if (response.status >= 200 && response.status < 300) {
          setFavorites((favorites) =>
            favorites.filter((fav) => fav !== launchId)
          );
        } else {
          throw new Error(
            `Failed to remove launch from favorites: ${response.statusText}`
          );
        }
      } else {
        // Add launch to favorites
        const response = await favoritesService.addFavorite(user._id, launchId);
        if (response.status >= 200 && response.status < 300) {
          setFavorites((favorites) => [...favorites, launchId]);
        } else {
          throw new Error(
            `Failed to add launch to favorites: ${response.statusText}`
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!launches ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Launches</h1>

            <div
              className="max-width flex flex-col justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
              id="cards"
            >
              {launches.map(({ _id, details, links, mission_name }) => (
                <div
                  key={_id}
                  className="launch-wrapper flex-grow"
                  onClick={handleLaunchClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Favorite
                    launchId={_id}
                    isFavorite={favorites.includes(_id)}
                    toggleFavorite={toggleFavorite}
                  />
                  <Link to={`/launches/${_id}`} key={_id}>
                    <article className="card rounded-lg p-5 flex flex-col">
                      <img
                        src={links.patch.large}
                        alt={mission_name}
                        loading="lazy"
                      />
                      <h2 className="text-white font-bold text-xl my-1">
                        {mission_name}
                      </h2>
                      {details ? (
                        <p className="text-white opacity-75 text-sm">{`${details.substring(
                          0,
                          50
                        )}...`}</p>
                      ) : (
                        <p></p>
                      )}
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
