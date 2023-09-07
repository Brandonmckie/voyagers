import React, { useEffect, useState } from "react";
import { topcountries0 } from "../../navbar/component/topcountries";
import { Link } from "react-router-dom";
import { countries } from "./countries";
type Props = {
  setSearchOpen: any;
};

const SearchInput = ({ setSearchOpen }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [countriesList, setCountriesList] = useState<any>([]);
  const [topcountries, settopcountries] = useState<any>(topcountries0);

  useEffect(() => {
    (() => {
      if (searchInput === "") {
        setCountriesList([]);
      } else {
        const filteredCountries = countries.filter((item: any) =>
          item.country.toLowerCase().includes(searchInput.toLowerCase())
        );

        setCountriesList(filteredCountries);
      }
    })();
  }, [searchInput]);

  return (
    <div className="searchmodal">
      <div className="searchmodal-container">
        <div className="form">
          <div>
            <input
              type="text"
              placeholder="Type to search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        <div className="destinations">
          {countriesList.length > 0 ? <p>SUGGESTIONS</p> : <p>TRENDING DESTINATIONS</p>}

          <div className="destinations-lists" style={{ overflow: "auto" }}>
            {countriesList.length > 0
              ? countriesList.map((item: any) => (
                  <div className="destinations-single" onClick={() => setSearchOpen(false)}>
                    <Link to={`/itinerary/list?region=${item.code}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <p>{item.country}</p>
                    </Link>
                  </div>
                ))
              : topcountries.map((item: any) => (
                  <div className="destinations-single" onClick={() => setSearchOpen(false)}>
                    <Link to={`/itinerary/list?region=${item.value}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <p>{item.label}</p>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="searchmodal-closeicon"
          onClick={() => setSearchOpen(false)}
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
