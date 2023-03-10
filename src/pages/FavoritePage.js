import { useEffect, useState } from "react";
import { Link, redirect, useSubmit } from "react-router-dom";

import LoadingState from "../components/LoadingState";
import SearchBar from "../components/SearchBar";
import Favorite from "../components/Favorite";

import attachHoverListener from "../utils/hover";

import userService from "../services/user.service";
import favoritesService from "../services/favorites.service";

export const favoritesPageAction = async ({ request }) => {
  const formData = await request.formData();
  const launchId = formData.get("launchId");

  const userId = localStorage.getItem("userId");

  await favoritesService.removeFavorite(userId, launchId);

  return redirect("/favorites");
};

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  const submit = useSubmit();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");

      const userResponse = await userService.fetchUser(userId);
      const favorites = userResponse.data.favorites;

      setFavorites(favorites);

      const favoriteLaunches = favorites.map((favorite) => favorite.launch);

      setLaunches(favoriteLaunches);
    };

    fetchData();
  }, [favorites]);

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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const filteredLaunchesByName = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFav = async (launchId) => {
    submit(
      { launchId, isFavorite: favorites.includes(launchId) },
      { method: "POST", action: "/favorites" }
    );
  };

  const toggleFavorite = async (launchId) => {
    submit(
      { launchId, isFavorite: favorites.includes(launchId) },
      { method: "POST", action: "/favorites" }
    );
  };

  return (
    <>
      {!launches ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Favorites</h1>
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
              {filteredLaunchesByName.map((launch) => (
                <div
                  key={launch._id}
                  className="launch-wrapper flex-grow"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Favorite
                    launchId={launch._id}
                    isFavorite={favorites.includes(launch._id)}
                    toggleFavorite={toggleFavorite}
                    removeFavorite={removeFav}
                  />
                  <Link to={`/launches/${launch._id}`} key={launch._id}>
                    <article className="card rounded-lg p-5 flex flex-col">
                      <img
                        src={launch.links.patch.large}
                        alt={launch.name}
                        loading="lazy"
                      />
                      <h2 className="text-white font-bold text-lg my-3">
                        {launch.name}
                      </h2>
                      <p className="text-gray-400 mb-3">{launch.date_utc}</p>
                      <div className="flex-grow flex flex-col justify-end">
                        <p className="text-white opacity-75 text-sm">
                          {launch.details}
                        </p>
                        <span className="text-green-500 font-semibold text-xl">
                          {launch.success ? "Success" : "Failure"}
                        </span>
                      </div>
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
