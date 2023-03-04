import { useState, useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Launches() {
  const [launches, setLaunches] = useState(null);

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

  return (
    <>
      {!launches ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
            <h1 className="heading">Launches</h1>

            <div className="max-width grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {launches.map(({ id, details, links, name }) => (
                <Link to={`/launches/${id}`} key={id}>
                  <article className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-lg p-5">
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
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
