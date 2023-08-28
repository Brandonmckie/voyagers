import { MouseEvent, useEffect, useState } from "react";
import api from "../../utils/api";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { getUserRole } from "../../utils/utils";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.jpg";

import ReactModal from "react-modal";
import { options } from "./countriesNames";
import "./styles/style.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

type Props = {};

type Itinerary = {
  category: string[];
  country: string;
  details: string;
  image: string;
  introduction: string;
  price: string;
  salesPitch: string;
  services: string[];
  title: string;
  userId: {
    username: string;
    _id: string;
  };
  __v: number;
  _id: string;
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 8000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SingleUserDetail = (props: Props) => {
  const [data, setData] = useState<Itinerary[]>([]);
  const [purchasedItineraries, setPurchasedItineraries] = useState<Itinerary[]>([]);
  const [badgeHover, setBadgeHover] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountry, setshowCountry] = useState(false);
  const [showItinerary, setshowItinerary] = useState(true);
  const [showWonders, setshowWonders] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState<string>("");
  const [profile, setprofile] = useState<any>([]);
  const [countriescount, setcountriescount] = useState<any>([]);
  const [navInfo, setnavInfo] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getItineraries = async () => {
    setIsLoading(true);

    try {
      let getdata = (await api(`/itinerary/userItinerary?username=${id}`)) as { data: Itinerary[] };
      console.log(getdata);
      // console.log(getdata);
      // let countries0 = getdata.data.map((item: any) => item.country);
      // for (const data of countries0) {
      //   let countries = options.find((item, i) => {
      //     return item.value === data;
      //   });
      //   if (countries) {
      //     countriesData.push({ country: countries.label, code: data });
      //   }
      // }
      // console.log(countriesData);
      // let countriesData0: any[] = Array.from(countriesData).map((code) => {
      //   let country = options.find((item) => item.value === code)?.label;
      //   return { country, code };
      // });
      // console.log(countriesData0);

      let countries0 = getdata.data.map((item: any) => item.country);
      let uniqueCountryCodes = new Set<string>();

      for (const data of countries0) {
        let countries = options.find((item, i) => {
          return item.value === data;
        });
        if (countries) {
          uniqueCountryCodes.add(data);
        }
      }
      let countriesData: any[] = Array.from(uniqueCountryCodes).map((code) => {
        let country = options.find((item) => item.value === code)?.label;
        return { country, code };
      });
      setcountriescount(countriesData);
      setData(getdata.data);

      let purchasedData = (await api(`/itinerary/purchased/${""}`)) as { data: Itinerary[] };
      setPurchasedItineraries(purchasedData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // const userRole = getUserRole(); // Replace this with your logic to get the user's role

    // if (userRole !== "seller") {
    //   navigate("/itinerary/list");
    // }

    // getUserDetails();
    getItineraries();
  }, []);

  const getProfile = async () => {
    try {
      let user = await api(`/users/get-userprofile?name=${id}`);
      console.log(user);

      let countries = options.find((item, i) => {
        return item.value === user.data.user.userInfo.country;
      });

      setnavInfo({
        ...navInfo,
        name: user.data.user.userInfo.name,
        country: countries?.label,
        voyagestyle: user.data.user.userInfo.voyageStyle,
        visitedCountries: user.data.user.userInfo.visitedCountries,
        visitedWonders: user.data.user.userInfo.visitedWonders,
      });

      setprofile(user.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  interface CountryFlagProps {
    countryCode: string;
  }
  const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode }) => {
    return <span className={`fi fi-${countryCode.toLowerCase()} countryStyling`} />;
  };

  return (
    <>
      <section className="listing-bg section1style">
        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section111">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-8 col-lg-12">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  position: "relative",
                  // color: "white",
                  borderRadius: "20px",
                  margin: "60px 0px",
                }}
              >
                {/* <img
                  src={data[0]?.image}
                  alt=""
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                /> */}
                <div
                  style={{
                    // background: " #00000061",
                    zIndex: "10",
                    position: "inherit",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    padding: "0px 40px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "10px", width: "90%" }}
                    >
                      {" "}
                      <img
                        style={{
                          width: "170px",
                          height: "170px",
                          cursor: "pointer",
                          borderRadius: "360px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={profile?.image}
                        alt=""
                      />
                      <div style={{ marginLeft: "50px" }}>
                        <div>
                          <h2 style={{ fontWeight: 400, color: "rgb(0,0,0)" }}>{navInfo?.name}</h2>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h5 style={{ fontSize: "16px", margin: "0px", fontWeight: "bold" }}>
                            Voyage Style:{" "}
                          </h5>
                          {navInfo?.voyagestyle?.map(
                            (item: any, i: any) =>
                              i < 2 && (
                                <h5
                                  style={{
                                    fontSize: "15px",
                                    margin: "7px 0px",
                                    marginLeft: "10px",
                                  }}
                                  key={i}
                                >
                                  {item}
                                </h5>
                              )
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h5 style={{ fontSize: "16px", margin: "0px", fontWeight: "bold" }}>
                            Country:{" "}
                          </h5>
                          <p style={{ margin: "0px", marginLeft: "10px" }}>{navInfo?.country}</p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h5 style={{ fontSize: "16px", margin: "0px", fontWeight: "bold" }}>
                            Visited Countries:{" "}
                          </h5>
                          {navInfo?.visitedCountries?.map((item: any, i: any) => (
                            <p style={{ margin: "0px", marginLeft: "10px" }}>{item.label}</p>
                          ))}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h5 style={{ fontSize: "16px", margin: "0px", fontWeight: "bold" }}>
                            Visited Wonders:{" "}
                          </h5>
                          {navInfo?.visitedWonders?.map((item: any, i: any) => (
                            <p style={{ margin: "0px", marginLeft: "10px" }}>{item.label}</p>
                          ))}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <h5 style={{ fontSize: "16px", margin: "0px", fontWeight: "bold" }}>
                            About Us:{" "}
                          </h5>
                          <p style={{ margin: "0px", marginLeft: "10px" }}>
                            {profile?.userInfo?.bio}
                          </p>
                        </div>

                        {/* <div style={{ cursor: "pointer" }}>
                          <p
                            onClick={() => {
                              setshowCountry(true);
                            }}
                          >
                            {countriescount.length} Visited Countries
                          </p>
                          <p> {data.length} Itineraries</p>
                        </div> */}
                      </div>
                    </div>

                    {/* <div style={{ marginLeft: "10px" }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {navInfo?.voyagestyle?.map((item: any, i: any) => (
                          <p>{item}</p>
                        ))}
                      </div>

                      <p>{navInfo?.country}</p>

                      <div style={{ cursor: "pointer" }}>
                        <p
                          onClick={() => {
                            setshowCountry(true);
                          }}
                        >
                          {countriescount.length} Visited Countries
                        </p>
                        <p> {data.length} Itineraries</p>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* <img className="" src={data.image} alt={data?.title} style={{width: "100%"}}/> */}
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>
        </div>
      </section>
      <section className="listing-bg section2style">
        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section111">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-8 col-lg-12" style={{ padding: "0px" }}>
              <div
                style={{
                  width: "100%",
                  height: "205px",
                  position: "relative",
                  // color: "white",
                  margin: "10px 0px",
                }}
              >
                <img
                  src={data[1]?.image}
                  alt=""
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    color: "white",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />

                <div
                  style={{
                    background: "#00000061",
                    zIndex: "10",
                    position: "inherit",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontWeight: 400,
                        color: "white",
                        margin: "0px",
                        textAlign: "center",
                        background: "#00000040",
                        padding: "4px",
                      }}
                    >
                      {profile?.username}
                    </h2>
                  </div>
                  <div
                    style={{
                      height: "169px",
                      alignItems: "center",
                      display: "flex",
                      padding: "0px 21px",

                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "28px", width: "100%" }}
                    >
                      {" "}
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          cursor: "pointer",
                          borderRadius: "360px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={profile?.image}
                        alt=""
                      />
                      <div style={{ marginLeft: "0px", color: "white" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-gem"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" />
                          </svg>
                          {navInfo?.voyagestyle?.map(
                            (item: any, i: any) =>
                              i < 2 && ( // Check if index is less than 2
                                <h5 style={{ fontSize: "15px", margin: "7px 0px" }} key={i}>
                                  {item}
                                </h5>
                              )
                          )}
                        </div>

                        <div
                          style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                        >
                          <h5
                            style={{
                              fontSize: "15px",
                              margin: "7px 0px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-geo-alt-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>{" "}
                            {navInfo?.country}
                          </h5>
                        </div>

                        <div
                          style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                        >
                          <div
                            style={{
                              margin: "0px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              height: "39px",
                              gap: "9px",
                            }}
                          >
                            <h3 style={{ margin: "0px" }}>{navInfo?.visitedCountries?.length}</h3>
                            <h5
                              style={{
                                fontSize: "15px",
                                margin: "0px",
                              }}
                            >
                              Visited Countries
                            </h5>
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                        >
                          <h5
                            style={{
                              margin: "0px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              height: "39px",
                              gap: "9px",
                            }}
                          >
                            <h3 style={{ margin: "0px" }}> {navInfo?.visitedWonders?.length}</h3>{" "}
                            <h5
                              style={{
                                fontSize: "15px",
                                margin: "0px",
                              }}
                            >
                              Visited Wonders{" "}
                            </h5>
                          </h5>
                        </div>

                        {/* <div style={{ cursor: "pointer" }}>
                          <p
                            onClick={() => {
                              setshowCountry(true);
                            }}
                          >
                            {countriescount.length} Visited Countries
                          </p>
                          <p> {data.length} Itineraries</p>
                        </div> */}
                      </div>
                    </div>

                    {/* <div style={{ marginLeft: "10px" }}>
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        {navInfo?.voyagestyle?.map((item: any, i: any) => (
                          <p>{item}</p>
                        ))}
                      </div>

                      <p>{navInfo?.country}</p>

                      <div style={{ cursor: "pointer" }}>
                        <p
                          onClick={() => {
                            setshowCountry(true);
                          }}
                        >
                          {countriescount.length} Visited Countries
                        </p>
                        <p> {data.length} Itineraries</p>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* <img className="" src={data.image} alt={data?.title} style={{width: "100%"}}/> */}
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "62px",
              cursor: "pointer",
              justifyContent: "center",
              margin: "40px",
            }}
            className="tabsStyle"
          >
            <h4
              className="heading-style0"
              onClick={() => {
                setshowCountry(false);
                setshowItinerary(true);
                setshowWonders(false);
              }}
              style={{
                color: showItinerary ? "#f1a501" : "black",
                borderBottom: showItinerary ? "2px solid #f1a501" : "none",
              }}
            >
              Itineraries
            </h4>
            <div style={{ width: "1px", height: "30px", border: "1px solid #00000099" }}></div>
            <h4
              className="heading-style0"
              style={{
                color: showCountry ? "#f1a501" : "black",
                borderBottom: showCountry ? "2px solid #f1a501" : "none",
              }}
              onClick={() => {
                setshowCountry(true);
                setshowItinerary(false);
                setshowWonders(false);
              }}
            >
              Countries
            </h4>
            <div style={{ width: "1px", height: "30px", border: "1px solid #00000099" }}></div>

            <h4
              className="heading-style0"
              style={{
                color: showWonders ? "#f1a501" : "black",
                borderBottom: showWonders ? "2px solid #f1a501" : "none",
              }}
              onClick={() => {
                setshowCountry(false);
                setshowItinerary(false);
                setshowWonders(true);
              }}
            >
              Wonders
            </h4>
          </div>
        </div>
      </div>
      {showCountry ? (
        countriescount?.length > 0 ? (
          <section className="listing">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="left-first">
                    <h1 className="top-heading">
                      <span className="first-textbg itlisting">COUNTRIES</span>
                    </h1>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <div className="row">
                    <div className="card-grid">
                      {countriescount.map((each: any) => (
                        <Link
                          to={`/itinerary/list?region=${each?.code}`}
                          style={{ marginBottom: "20px" }}
                          key={each.code}
                          className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                        >
                          <div className="card cardvalue">
                            {/* <img
                              className="card-img-top"
                              src={each.image}
                              alt="Cardimage"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            /> */}
                            <div style={{ position: "relative" }}>
                              <CountryFlag countryCode={each.code} />
                              <div
                                className="countryHover"
                                style={{
                                  height: "99%",
                                  width: "100%",
                                  top: "3px",
                                  position: "absolute",
                                  background: "#00000075",
                                }}
                              ></div>
                            </div>

                            <div className="card-body cardvalue1">
                              <h4 className="card-title">{each.country}</h4>
                            </div>
                            <div className="card-country">
                              <h4 className="card-title" style={{ color: "white" }}>
                                {each.country}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="row">
                <div className="col-md-12 ">
                  <div className="more-listing text-center">
                    {/* <button className="btn btn-orange navbar-btn">Create Itinerary</button> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <h3 style={{ textAlign: "center" }} className="headingtag">
              No Countries
            </h3>
          </div>
        )
      ) : showWonders ? (
        navInfo?.visitedWonders?.length > 0 ? (
          <section className="listing">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <div className="left-first">
                    <h1 className="top-heading">
                      <span className="first-textbg itlisting">Visited Wonders</span>
                    </h1>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <div className="row">
                    <div className="card-grid">
                      {navInfo?.visitedWonders?.map((each: any) => (
                        <Link
                          to={``}
                          style={{ marginBottom: "20px" }}
                          key={each._id}
                          // onMouseEnter={() => setBadgeHover(each._id)}
                          // onMouseLeave={() => setBadgeHover(null)}
                          className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                        >
                          <div className="card">
                            <img
                              className="card-img-top"
                              src={
                                each.label === "Great Wall of China"
                                  ? img1
                                  : each.label === "Petra, Jordan"
                                  ? img2
                                  : each.label === "Machu Picchu, Peru"
                                  ? img4
                                  : each.label === "Chichen Itza, Mexico"
                                  ? img5
                                  : each.label === "Roman Colosseum, Italy"
                                  ? img6
                                  : each.label === "Christ the Redeemer, Brazil"
                                  ? img3
                                  : each.label === "Taj Mahal, India"
                                  ? img7
                                  : ""
                              }
                              alt="Cardimage"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />

                            {/* <div className="badge" style={{ top: "20px" }}>
                              <p>{each.category[0]}</p>
                            </div> */}
                            <div
                              className="card-body"
                              style={{
                                height: " 66px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px",
                                paddingLeft: "14px",
                              }}
                            >
                              <h4 className="card-title">{each.label}</h4>
                              {/* <div className="subtitle">
                                <span className="a">Created by:</span>
                                <span className="b">{each.userId.username}</span>
                              </div> */}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="row">
                <div className="col-md-12 ">
                  <div className="more-listing text-center">
                    {/* <button className="btn btn-orange navbar-btn">Create Itinerary</button> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <h3 style={{ textAlign: "center" }} className="headingtag">
              No Wonders
            </h3>
          </div>
        )
      ) : data.length > 0 ? (
        <section className="listing">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="left-first">
                  <h1 className="top-heading">
                    <span className="first-textbg itlisting">ITINERARIES</span>
                  </h1>
                </div>
              </div>
            </div>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <div className="row">
                  <div className="card-grid">
                    {data.map((each) => (
                      <Link
                        to={`/itinerary/view/${each._id}`}
                        style={{ marginBottom: "20px" }}
                        key={each._id}
                        onMouseEnter={() => setBadgeHover(each._id)}
                        onMouseLeave={() => setBadgeHover(null)}
                        className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                      >
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={each.image}
                            alt="Cardimage"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />

                          <div className="badge" style={{ top: "20px" }}>
                            <p>{each.category[0]}</p>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">{each.title}</h4>
                            <div className="subtitle">
                              <span className="a">Created by:</span>
                              <span className="b">{each.userId.username}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="row">
              <div className="col-md-12 ">
                <div className="more-listing text-center">
                  {/* <button className="btn btn-orange navbar-btn">Create Itinerary</button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <h3 style={{ textAlign: "center" }} className="headingtag">
            No Itineraries
          </h3>
        </div>
      )}
    </>
  );
};

export default SingleUserDetail;
