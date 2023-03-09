import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import axios from "axios";

export default function SingleCrew() {
  const [singleCrew, setSingleCrew] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const singleCrewMember = async () => {
      try {
        const res = await axios.get(`https://api.spacexdata.com/v4/crew/${id}`);
        const data = res.data;
        setSingleCrew(data);
      } catch (error) {
        console.log(error);
      }
    };
    singleCrewMember();
  }, [id]);

  return (
    <>
      {!singleCrew ? (
        <LoadingState />
      ) : (
        <>
          <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
            <article>
              <img src={singleCrew.image} alt={singleCrew.name} />
            </article>
            <article>
              <h1 className="heading-inner">{singleCrew.name}</h1>
              <h2 className="font-bold text-white text-xl mb-3">Details</h2>
              <ul className="text-white">
                <li className="mb-1 opacity-75">
                  Currently at {singleCrew.agency}
                </li>
                <li className="mb-1 opacity-75">
                  {singleCrew.launches.length} launches
                </li>
                <li
                  className={`capitalize mb-1 opacity-75 ${
                    singleCrew.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {singleCrew.status}
                </li>
              </ul>

              <ul className="flex items-center mt-5">
                <li className="mr-5">
                  <a
                    href={singleCrew.wikipedia}
                    className="btn mb-8  py-2 px-4 rounded-full border border-solid border-gray-300 text-white font-semibold text-sm transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-white"
                  >
                    Wiki
                  </a>
                </li>
                <li>
                  <Link to="/crew" className="text-white">
                    &larr; Back
                  </Link>
                </li>
              </ul>
            </article>
          </section>
        </>
      )}
    </>
  );
}
