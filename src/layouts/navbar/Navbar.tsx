/* eslint-disable array-callback-return */
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { checkIfUserIsAuthenticated } from "../../utils/utils";

import "./styles/styles.css";
import "./styles/dropdown.css";
import logo from "./img/logo.png";
import dp from "./img/dp.png";
import api from "../../utils/api";
import "./styles/carousel.css";
import { topcountries0 } from "./component/topcountries";
import "react-multi-carousel/lib/styles.css";
import { countries } from "../home/Components/countries";

type Props = {};

function createGroups(array: any, groupSize: number) {
  var result = [];
  var subArray = [];

  for (var i = 0; i < array.length; i++) {
    subArray.push(array[i]);

    if (subArray.length === groupSize || i === array.length - 1) {
      result.push(subArray);
      subArray = [];
    }
  }

  return result;
}

const Navbar = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cities, setCities] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [mobiledisplay, setmobiledisplay] = useState(false);
  const [countriesList, setCountriesList] = useState<any>([]);
  const [topcountries, settopcountries] = useState<any>(topcountries0);
  const location = useLocation();
  const navigate = useNavigate();
  //const [isDropdownOpen,setIsDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{
    role: string;
    _id: string;
    username: string;
    image: string;
    userInfo: any;
    stripeConnected: boolean | null;
  }>({
    role: "",
    _id: "",
    username: "",
    userInfo: {},
    stripeConnected: null,
    image: "",
  });

  const TopCountries = async () => {
    try {
      let { data } = await api.get("/itinerary/topCountries");
      const topCountryCodes = data?.map((item: any, i: any) => item._id);

      let topCountries = [];
      for (const code of topCountryCodes) {
        const country = countries.find((item: any, i: any) => item.code === code);
        if (country) {
          topCountries.push({ country: country?.country, code: country?.code });
        }
      }
      // settopcountries(topCountries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TopCountries();
  }, []);

  const [mobileview, setmobileview] = useState(false);

  const verifyLogin = async () => {
    let isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  };

  const handleShowDropdown = (e: MouseEvent<HTMLLIElement>, type: boolean) => {
    e.preventDefault();
    setIsDropdownOpen(type);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth/login");
  };

  const getUser = async () => {
    try {
      const user = await api("/users/get-profile");
      // console.log(user);
      setUser(user.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const getCountries = async () => {
    try {
      const countryList = await api("/users/get-countries");
      setCities(countryList.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    verifyLogin();
    getCountries();
  }, [location]);

  const handleProfileOpen = () => {
    navigate("/profile/edit");
  };

  const handleStripeOnboarding = async () => {
    const stripe_data = await api("/billing/get-account-links");
    window.location.href = stripe_data.data;
  };

  const closeDropdown = () => {
    setmobileview(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });

  const closeDropdown1 = () => {
    setmobiledisplay(false);
  };

  const mobileref0 = useDetectClickOutside({ onTriggered: closeDropdown1 });

  const closeDropdown0 = () => {
    setProfileOpen(false);
  };

  const mobileref = useDetectClickOutside({ onTriggered: closeDropdown0 });

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

  useEffect(() => {
    console.log(mobileview);
  }, [mobileview]);

  return (
    <>
      <div className="container">
        <div className="row" id="nav-section">
          <nav className="navbar">
            <div className="container-fluid">
              <div className="navbar-header nav-head" style={{ display: "flex" }}>
                <Link to="/" className="atag">
                  <img src={logo} width="64px" height="64px" alt="imglogo" />
                </Link>

                <div style={{ flexDirection: "row", alignItems: "center" }} className="mobiletop">
                  {isLoggedIn && (
                    <div>
                      <ul
                        ref={mobileref}
                        className={`nav navbar-nav navbar-right dropdown dropdown-toggle mobileul ${
                          profileOpen ? " open" : ""
                        }`}
                        style={{ marginLeft: !isLoggedIn ? "22%" : "30%" }}
                        data-toggle="dropdown"
                        onClick={() => {
                          setProfileOpen(!profileOpen);
                          setmobileview(false);
                        }}
                        // style={
                        //   user.role === "seller"
                        //     ? {
                        //         display: "flex",
                        //         alignItems: "center",
                        //         justifyContent: "center",
                        //         cursor: "pointer",
                        //         marginTop: "-68px",
                        //       }
                        //     : {}
                        // }
                      >
                        <li>
                          <img
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            width="35px"
                            height="35px"
                            src={
                              user.image ||
                              "	https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                            }
                            alt="DisplayPicture"
                          />
                        </li>

                        <ul
                          className="dropdown-menu profile-dropdown mobiledrop"
                          style={{ zIndex: 1000000 }}
                        >
                          <li
                            onClick={() => {
                              setProfileOpen(false);
                              handleProfileOpen();
                            }}
                          >
                            Edit Profile
                          </li>
                          {user.role === "seller" && user.stripeConnected === false ? (
                            <li onClick={handleStripeOnboarding}>Complete Onboarding</li>
                          ) : (
                            ""
                          )}
                          <li>
                            <Link
                              onClick={() => {
                                setProfileOpen(!profileOpen);
                              }}
                              to="/qrcode"
                            >
                              My Qrcode
                            </Link>
                          </li>
                          {/* {user?.userInfo?.name && ( */}
                          <li>
                            <a
                              onClick={() => {
                                if (user?.userInfo?.bio) {
                                  setProfileOpen(!profileOpen);
                                  navigate(`/user/${user.username}`);
                                } else {
                                  localStorage.setItem("profilenav", `/user/${user.username}`);
                                  navigate(`/itinerary/setupProfile`);
                                }
                              }}
                            >
                              My Profile
                            </a>
                          </li>
                          {/* )} */}

                          <li>
                            <Link
                              onClick={() => {
                                setProfileOpen(!profileOpen);
                              }}
                              to="/itinerary/me"
                            >
                              My Voyage
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => {
                                setProfileOpen(!profileOpen);
                              }}
                              to="https://dls7hd5yq8f.typeform.com/to/dzOCfYcC"
                              target="_blank"
                            >
                              Voyage Request
                            </Link>
                          </li>

                          <li onClick={handleLogout} className="mobilelog">
                            Logout
                          </li>
                        </ul>
                      </ul>
                    </div>
                  )}
                  <div ref={ref}>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setmobileview(!mobileview);
                      }}
                      type="button"
                      className="navbar-toggle btnspan"
                      data-toggle="collapse"
                      data-target="#myNavbar"
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    {mobileview && (
                      <div
                        className="mobileview"
                        style={{
                          zIndex: "9000",
                          background: "white",
                          width: "95%",
                          height: "auto",
                          justifyContent: "unset",
                          display: "flex",
                          border: " 1px solid #00000059",
                          boxShadow: "1px 1px 4px 0px #0000009c",
                          padding: "5px",
                          position: "fixed",
                          top: "64px",
                          left: "7px",
                        }}
                      >
                        <ul
                          className="nav navbar-nav mobileul"
                          // style={
                          //   user.role === "seller"
                          //     ? {
                          //         display: "flex",
                          //         // alignItems: "center",
                          //         marginTop: 0,
                          //         marginLeft: "20%",
                          //       }
                          //     : {}
                          // }
                        >
                          <li className="active">
                            <Link
                              to="/"
                              onClick={() => {
                                setmobileview(false);
                              }}
                            >
                              Home
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/about-us"
                              onClick={() => {
                                setmobileview(false);
                              }}
                            >
                              About us
                            </Link>
                          </li>
                          {/* {!isLoggedIn && (
                <li>
                  <Link
                    to="https://dls7hd5yq8f.typeform.com/to/dzOCfYcC"
                    onClick={() => {
                      setmobileview(false);
                    }}
                    target="_blank"
                  >
                    Itinerary Request
                  </Link>
                </li>
              )} */}

                          {!isLoggedIn && (
                            <>
                              <li>
                                <Link to="/auth/login">Login</Link>
                              </li>
                              <li>
                                <Link to="/itinerary/setupProfile">Create Voyage</Link>
                              </li>
                            </>
                          )}

                          {/* {!user._id ? ( */}
                          {/* <li
                onMouseLeave={(e) => handleShowDropdown(e, false)}
                onMouseEnter={(e) => handleShowDropdown(e, true)}
                className={`dropdown ${isDropdownOpen ? " open" : ""}`}
              >
                <a style={{ margin: 0 }} className="dropdown-toggle btn" data-toggle="dropdown">
                  Destinations <b className="caret"></b>
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-large row"
                  style={{
                    maxHeight: "50vh",
                    overflowY: "auto",
                    left: "-40%",
                  }}
                >
                  {Object.entries(cities).map(([key, val]) => (
                    <li className="col-sm-6">
                      <ul>
                        {/* <li className="dropdown-header">{key}</li> 
                        <div className="row inn-dropdown">
                          {createGroups(val, 23).map((each) => (
                            <div className="col-sm-6">
                              {each.map((item) => (
                                <li>
                                  <Link
                                    onClick={() => {
                                      setmobileview(false);
                                    }}
                                    to={{
                                      pathname: "/itinerary/list",
                                      search: createSearchParams({
                                        region: item.code,
                                      }).toString(),
                                    }}
                                  >
                                    {item.country}
                                  </Link>
                                </li>
                              ))}
                            </div>
                          ))}
                        </div>
                      </ul>
                    </li>
                  ))}
                </ul>
              </li> */}

                          {user._id && (user?.role === "seller" || user?.role === "influencer") && (
                            <li>
                              <Link
                                to="/itinerary/list"
                                onClick={() => {
                                  setmobileview(false);
                                }}
                              >
                                Voyages
                              </Link>
                            </li>
                          )}

                          <li
                            className="destinations-search"
                            onClick={() => setSearchOpen(true)}
                            style={{ display: "flex", flexDirection: "row", marginBottom: "12px" }}
                          >
                            <p>Explore Destinations</p>
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
                          </li>

                          {/* )} */}

                          {user.role === "seller" || user.role === "influencer" ? (
                            <li>
                              <Link to="/itinerary/setupProfile">
                                <button
                                  className="btn btn-orange navbar-btn"
                                  onClick={() => {
                                    setmobileview(false);
                                  }}
                                  style={{ padding: "7px 9px", fontSize: "14px" }}
                                >
                                  Create Voyage
                                </button>
                              </Link>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="collapse navbar-collapse" id="myNavbar">
                <ul
                  className="nav navbar-nav"
                  style={
                    user?.role === "seller" || user?.role === "influencer"
                      ? {
                          display: "flex",
                          alignItems: "center",
                          marginTop: 0,
                          marginLeft: "13%",
                        }
                      : {
                          marginLeft: "",
                        }
                  }
                >
                  <li className="active">
                    <Link to="/">Home</Link>
                  </li>

                  {user._id && (user?.role === "seller" || user?.role === "influencer") && (
                    <li>
                      <Link to="/itinerary/list">Voyages</Link>
                    </li>
                  )}

                  <li>
                    <Link to="/about-us">About us</Link>
                  </li>

                  {/* {!isLoggedIn && (
                    <li>
                      <Link to="https://dls7hd5yq8f.typeform.com/to/dzOCfYcC" target="_blank">
                        Itinerary Request
                      </Link>
                    </li>
                  )} */}

                  {user.role === "seller" || user.role === "influencer" ? (
                    <li>
                      <Link to="/itinerary/setupProfile">
                        <button className="btn btn-orange navbar-btn">Create Voyage</button>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}

                  <div className="destinations-search" onClick={() => setSearchOpen(true)}>
                    <p>Explore Destinations</p>
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
                </ul>

                {isLoggedIn ? (
                  <div>
                    <ul
                      ref={mobileref0}
                      className={`nav navbar-nav navbar-right dropdown dropdown-toggle ${
                        mobiledisplay ? " open" : ""
                      }`}
                      data-toggle="dropdown"
                      onClick={() => setmobiledisplay(!mobiledisplay)}
                      style={
                        user?.role === "seller" || user?.role === "influencer"
                          ? {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              marginTop: "-68px",
                            }
                          : {}
                      }
                    >
                      <li>
                        <img
                          width="44px"
                          height="44px"
                          src={
                            user.image ||
                            "https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                          }
                          alt="DisplayPicture"
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </li>
                      <li>
                        <p className="welcome-message">WELOME!</p>
                        <p className="name">{user.username}</p>
                      </li>
                      <li style={{ marginLeft: "13.5px" }}>
                        <i className="fa fa-angle-down"></i>
                      </li>

                      <ul className="dropdown-menu profile-dropdown">
                        <li onClick={handleProfileOpen}>Edit Profile</li>
                        {user.role === "seller" && user.stripeConnected === false ? (
                          <li onClick={handleStripeOnboarding}>Complete Onboarding</li>
                        ) : (
                          ""
                        )}
                        <li>
                          <Link to="/qrcode">My Qrcode</Link>
                        </li>
                        {/* {user?.userInfo?.name && ( */}
                        <li>
                          <a
                            onClick={() => {
                              if (user?.userInfo?.bio) {
                                navigate(`/user/${user.username}`);
                              } else {
                                localStorage.setItem("profilenav", `/user/${user.username}`);
                                navigate(`/itinerary/setupProfile`);
                              }
                            }}
                          >
                            My Profile
                          </a>
                        </li>
                        {/* )} */}

                        <li>
                          <Link to="/itinerary/me">My Voyage</Link>
                        </li>

                        <li>
                          <Link to="https://dls7hd5yq8f.typeform.com/to/dzOCfYcC" target="_blank">
                            Voyage Request
                          </Link>
                        </li>

                        <li onClick={handleLogout}>Logout</li>
                      </ul>
                    </ul>
                  </div>
                ) : (
                  <>
                    <ul className="nav navbar-nav navbar-right">
                      <li>
                        <Link to="/auth/login" className="btn btn-border navbar-btn">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/itinerary/setupProfile" className="btn btn-orange navbar-btn">
                          Create Voyage
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </nav>
          {/* <!-- header end--> */}
        </div>
      </div>
      {!!searchOpen && (
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
      )}
    </>
  );
};

export default Navbar;
