import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { format } from "date-fns";
import launchesService from "../services/launches.service";

export default function SingleLaunch() {
  const [singleLaunch, setSingleLaunch] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getSingleLaunch = async () => {
      try {
        const response = await launchesService.getLaunchById(id);
        setSingleLaunch(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleLaunch();
  }, [id]);

  return (
    <>
      {!singleLaunch ? (
        <LoadingState />
      ) : (
        <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
          <article>
            <img
              src={singleLaunch.links?.patch?.large}
              alt={singleLaunch.name}
            />
          </article>

          <article>
            <h1 className="heading-inner">{singleLaunch.name}</h1>
            <h2 className="text-white text-xl opacity-75 mb-5 font-bold">
              Launch Date:{" "}
              {format(new Date(singleLaunch.date_utc), "dd MMMM yyyy")},{" "}
              {singleLaunch.success ? (
                <span className="text-green-500">Successful</span>
              ) : (
                <span className="text-red-500">Failed</span>
              )}
            </h2>

            {singleLaunch.details ? (
              <p className="text-white opacity-75 text-sm lg:text-base mb-5">
                {singleLaunch.details}
              </p>
            ) : null}

            <ul className="text-white opacity-75">
              <li>
                Fairings:{" "}
                {singleLaunch.rocket?.first_stage?.cores[0]?.fairing
                  ? `${
                      singleLaunch.rocket.first_stage.cores[0].fairing?.reused
                        ? "Reused"
                        : "Not Reused"
                    }`
                  : "No Fairings Used"}
              </li>
              <li>
                Recovered:{" "}
                {singleLaunch.rocket?.fairings
                  ? `${
                      singleLaunch.rocket.fairings?.recovered
                        ? "Fairings Recovered"
                        : "Fairings Not Recovered"
                    }`
                  : "No Fairings Used"}
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap items-center justify-start">
              {singleLaunch.links?.article ? (
                <li className="mr-2 mb-2 md:mb-0">
                  <a href={singleLaunch.links.article} className="btn">
                    Read Article
                  </a>
                </li>
              ) : null}
            </ul>

            <article className="mt-5">
              <a
                href={singleLaunch.links.webcast}
                className="btn mb-8  py-2 px-4 rounded-full border border-solid border-gray-300 text-white font-semibold text-sm transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-white"
              >
                Watch Launch on YouTube
              </a>
            </article>

            <button className="text-white mt-5">
              <Link to="/launches">&larr; Back</Link>
            </button>
          </article>
        </section>
      )}
    </>
  );
}
