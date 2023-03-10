import { useEffect, useState } from "react";
import LoadingState from "../components/LoadingState";
import { Link } from "react-router-dom";
import launchesService from "../services/launches.service";
import userService from "../services/user.service";
import attachHoverListener from "../utils/hover";

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      const userResponse = await userService.fetchUser(userId);

      const favorites = userResponse.data.favorites;
      console.log(favorites);

      setFavorites(favorites);
      setLaunches(launches);
    };

    fetchData();
  }, []);

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

  return (
    <>
      {!launches ? (
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
              {filteredLaunchesByName.map((launch) => (
                <div
                  key={launch._id}
                  className="launch-wrapper flex-grow"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
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
                      <div className="flex-grow flex justify-end">
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
