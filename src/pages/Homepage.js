import { useState, useEffect } from "react";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import axios from "axios";

export default function Homepage() {
  const [spaceData, setSpaceData] = useState(null);

  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const res = await axios.get(`https://api.spacexdata.com/v4/company`);
        const data = res.data;
        setSpaceData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCompanyInfo();
  }, []);

  return (
    <>
      <Header />
      <section className="showcase">
        <div className="overlay px-5">
          <h1 className="heading">
            SpaceX Hub{" "}
            <span className="block mt-2 opacity-50">
              the right place to get informed
            </span>
          </h1>

          {!spaceData ? (
            <LoadingState />
          ) : (
            <>
              <div className="flex flex-col justify-center md:flex-row">
                <article className="mt-5 mb-5 sm:mt-0 md:mr-10 lg:mr-20">
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    About SpaceX
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Founded in {spaceData.founded} by {spaceData.founder}
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Has {spaceData.employees} employees,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {spaceData.vehicles} space vehicles,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      {spaceData.vehicles} launch sites,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      and {spaceData.test_sites} test sites,
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      Valued at ${spaceData.valuation.toLocaleString()}.
                    </li>
                  </ul>
                </article>

                <article>
                  <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                    SpaceX Social Media
                  </h2>
                  <ul>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={spaceData.links.website}>Website</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={spaceData.links.flickr}>Flickr</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={spaceData.links.twitter}>Twitter</a>
                    </li>
                    <li className="text-sm text-white opacity-75 mb-1">
                      <a href={spaceData.links.elon_twitter}>
                        Elon Musk Twitter
                      </a>
                    </li>
                  </ul>
                </article>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
