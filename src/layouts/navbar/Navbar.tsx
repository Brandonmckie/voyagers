import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";

import { checkIfUserIsAuthenticated } from "../../utils/utils";

import "./styles/styles.css";
import "./styles/dropdown.css";
import logo from "./img/logo.png";
import dp from "./img/dp.png";
import api from "../../utils/api";
import "./styles/carousel.css";
import "react-multi-carousel/lib/styles.css";

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
  const location = useLocation();
  const navigate = useNavigate();
  //const [isDropdownOpen,setIsDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<{
    role: string;
    _id: string;
    username: string;
    image: string;
    stripeConnected: boolean | null;
  }>({
    role: "",
    _id: "",
    username: "",
    stripeConnected: null,
    image: "",
  });

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

  return (
    <div className="container">
      <div className="row" id="nav-section">
        {/* <!-- header --> */}
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
                      className={`nav navbar-nav navbar-right dropdown dropdown-toggle mobileul ${
                        profileOpen ? " open" : ""
                      }`}
                      data-toggle="dropdown"
                      onClick={() => setProfileOpen(!profileOpen)}
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
                          width="35px"
                          height="35px"
                          src={user.image || dp}
                          alt="DisplayPicture"
                        />
                      </li>

                      <ul className="dropdown-menu profile-dropdown mobiledrop">
                        <li onClick={handleProfileOpen}>Edit Profile</li>
                        {user.role === "seller" && user.stripeConnected === false ? (
                          <li onClick={handleStripeOnboarding}>Complete Onboarding</li>
                        ) : (
                          ""
                        )}
                        <li onClick={handleLogout} className="mobilelog">
                          Logout
                        </li>
                      </ul>
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => {
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
              </div>
            </div>

            <div className="collapse navbar-collapse" id="myNavbar">
              <ul
                className="nav navbar-nav"
                style={
                  user.role === "seller"
                    ? {
                        display: "flex",
                        alignItems: "center",
                        marginTop: 0,
                        marginLeft: "20%",
                      }
                    : {}
                }
              >
                <li className="active">
                  <Link to="/">Home</Link>
                </li>

                {!user._id || user.role === "user" ? (
                  <li
                    onMouseLeave={(e) => handleShowDropdown(e, false)}
                    onMouseEnter={(e) => handleShowDropdown(e, true)}
                    className={`dropdown ${isDropdownOpen ? " open" : ""}`}
                  >
                    <a
                      style={{ margin: 0, padding: "15px" }}
                      className="dropdown-toggle btn"
                      data-toggle="dropdown"
                    >
                      Destinations <b className="caret"></b>
                    </a>

                    <ul
                      className="dropdown-menu dropdown-menu-large row"
                      style={{
                        maxHeight: "70vh",
                        // overflowY: "hidden",
                        left: "-74%",
                        width: "228%",
                      }}
                    >
                      {Object.entries(cities).map(([key, val]) => (
                        <li className="col-sm-6">
                          <ul>
                            <li className="dropdown-header">{key}</li>
                            <div className="row inn-dropdown" style={{ width: "250px" }}>
                              {createGroups(val, 23).map((each) => (
                                <div className="col-sm-6">
                                  {each.map((item) => (
                                    <li>
                                      <Link
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
                  </li>
                ) : (
                  <li>
                    <Link to="/itinerary/me">Voyager Itineraries</Link>
                  </li>
                )}

                <li>
                  <Link to="/about-us">About us</Link>
                </li>

                <li>
                  <Link to="/contact-us">Contact us</Link>
                </li>

                {user.role === "seller" ? (
                  <li>
                    <Link to="/itinerary/create">
                      <button className="btn btn-orange navbar-btn">Create Itinerary</button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>

              {isLoggedIn ? (
                <div>
                  <ul
                    className={`nav navbar-nav navbar-right dropdown dropdown-toggle ${
                      profileOpen ? " open" : ""
                    }`}
                    data-toggle="dropdown"
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={
                      user.role === "seller"
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
                        style="border-radius:50%"
                        width="44px"
                        height="44px"
                        src={user.image || dp}
                        alt="Display Picture"
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
                      <Link to="/itinerary/create" className="btn btn-orange navbar-btn">
                        Create Itinerary
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
      {mobileview && (
        <div className="mobileview">
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

            <li>
              <Link
                to="/contact-us"
                onClick={() => {
                  setmobileview(false);
                }}
              >
                Contact us
              </Link>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                <li>
                  <Link to="/itinerary/create">Create Itinerary</Link>
                </li>
              </>
            )}

            {!user._id || user.role === "user" ? (
              <li
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
                        <li className="dropdown-header">{key}</li>
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
              </li>
            ) : (
              <li>
                <Link
                  to="/itinerary/me"
                  onClick={() => {
                    setmobileview(false);
                  }}
                >
                  Voyager Itineraries
                </Link>
              </li>
            )}

            {user.role === "seller" ? (
              <li>
                <Link to="/itinerary/create">
                  <button
                    className="btn btn-orange navbar-btn"
                    onClick={() => {
                      setmobileview(false);
                    }}
                    style={{ padding: "7px 9px", fontSize: "14px" }}
                  >
                    Create Itinerary
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
  );
};

export default Navbar;
