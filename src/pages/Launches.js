import { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { Link, redirect, useLoaderData, useSubmit } from "react-router-dom";
import Favorite from "../components/Favorite";
import attachHoverListener from "../utils/hover";
import launchesService from "../services/launches.service";
import favoritesService from "../services/favorites.service";
import SearchBar from "../components/SearchBar";

export const launchesPagesLoader = async () => {
  const { data: launches } = await launchesService.getLaunches();
  const userId = localStorage.getItem("userId");
  const { data: favorites } = await favoritesService.getFavorites(userId);

  return { launches, favorites };
};

export const launchesPageAction = async ({ request }) => {
  const formData = await request.formData();
  const launchId = formData.get("launchId");
  const isFavorite = formData.get("isFavorite") === "true";

  const userId = localStorage.getItem("userId");
  if (isFavorite) {
    await favoritesService.removeFavorite(userId, launchId);
  } else {
    await favoritesService.addFavorite(userId, launchId);
  }

  return redirect("/launches");
};

export default function Launches() {
  const [searchQuery, setSearchQuery] = useState("");
  const submit = useSubmit();

  let { launches, favorites } = useLoaderData();
  favorites = favorites?.map((fav) => fav.launch);

  const [isHovering, setIsHovering] = useState(false);

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

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    submit(
      { launchId, isFavorite: favorites.includes(launchId) },
      { method: "POST", action: "/launches" }
    );
  };

  return (
    <>
      {!launches ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Launches</h1>
            <div className="w-full lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <SearchBar
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </div>
            <div
              className="max-width mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
              id="cards"
            >
              {filteredLaunches.map(({ _id, details, links, name }) => (
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
                      <img src={links.patch.large} alt={name} loading="lazy" />
                      <h2 className="text-white font-bold text-xl my-1">
                        {name}
                      </h2>
                      {details ? (
                        <p className="text-white opacity-75 text-sm">
                          {`${details.substring(0, 50)}...`}
                        </p>
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
