import { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { Link, useLoaderData, useSubmit, redirect } from "react-router-dom";
import attachHoverListener from "../utils/hover";
import Favorite from "../components/Favorite";
import favoritesService from "../services/favorites.service";
import launchesService from "../services/launches.service";

export const favoritesPageLoader = async () => {
  const userId = localStorage.getItem("userId");
  const { data: favorites } = await favoritesService.getFavorites(userId);

  const launchesIds = favorites.map((favorite) => favorite.launch);
  const { data: launches } = await launchesService.getLaunchById(launchesIds);

  return { favorites, launches };
};

export const favoritesPageAction = async ({ request, state }) => {
  const formData = await request.formData();
  const launchId = formData.get("launchId");
  const isFavorite = formData.get("isFavorite") === "true";

  const userId = localStorage.getItem("userId");
  if (isFavorite) {
    await favoritesService.removeFavorite(userId, launchId);
    state.favorites = state.favorites.filter(
      (favorite) => favorite.launch !== launchId
    );
  } else {
    await favoritesService.addFavorite(userId, launchId);
    state.favorites.push({ launch: launchId });
  }

  return redirect("/favorites");
};

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites, launches } = useLoaderData();
  const submit = useSubmit();

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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const toggleFavorite = async (launchId) => {
    submit(
      {
        launchId,
        isFavorite: favorites.some((favorite) => favorite.launch === launchId),
      },
      { method: "POST", action: "/favorites/" + localStorage.getItem("userId") }
    );
  };

  const filteredFavorites = favorites.filter((favorite) =>
    launches.some((launch) => launch._id === favorite.launch)
  );

  return (
    <>
      {!favorites ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Favorites</h1>
            <div className="w-full lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <input
                type="text"
                placeholder="Search by launch name"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div
              className="max-width mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
              id="cards"
            >
              {filteredFavorites.map((favorite) => {
                const launch = launches.find(
                  (launch) => launch._id === favorite.launch
                );

                if (!launch) {
                  return null;
                }

                const { _id, details, links, name } = launch;

                return (
                  <div
                    key={_id}
                    className="launch-wrapper flex-grow"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Favorite
                      launchId={_id}
                      isFavorite={favorites.some(
                        (favorite) => favorite.launch === _id
                      )}
                      toggleFavorite={toggleFavorite}
                    />
                    <Link to={`/launches/${_id}`} key={_id}>
                      <article className="card rounded-lg p-5 flex flex-col">
                        <img
                          src={links.patch.large}
                          alt={name}
                          loading="lazy"
                        />
                        <h2 className="text-white font-bold text-xl my-1">
                          {name}
                        </h2>
                        {details ? (
                          <p className="text-white opacity-75 text-sm">
                            {details.substring(0, 50)}...
                          </p>
                        ) : (
                          <p></p>
                        )}
                      </article>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
