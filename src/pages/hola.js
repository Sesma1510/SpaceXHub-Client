import { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { Link } from "react-router-dom";
import axios from "axios";
import Favorite from "../components/Favorite";
import { attachHoverListener } from "../utils/hover";

export default function Launches() {
  const [launches, setLaunches] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const getLaunches = async () => {
      try {
        const res = await axios.get(`https://api.spacexdata.com/v4/launches`);
        const data = res.data;
        setLaunches(data);
      } catch (error) {
        console.log(error);
      }
    };

    getLaunches();
  }, []);

  useEffect(() => {
    if (isHovering) {
      console.log("hovering");
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
    console.log("hola");
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    console.log("adios");
    setIsHovering(false);
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
              {launches.map(({ id, details, links, name }) => (
                <div
                  key={id}
                  className="launch-wrapper flex-grow"
                  onClick={handleLaunchClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={`/launches/${id}`} key={id}>
                    <article className="card rounded-lg p-5 flex flex-col">
                      <Favorite launchId={id} />
                      <img src={links.patch.large} alt={name} loading="lazy" />
                      <h2 className="text-white font-bold text-xl my-1">
                        {name}
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
