import { MouseEvent, useEffect, useState } from "react";
import api from "../../utils/api";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { checkIfUserIsAuthenticated, getUserRole } from "../../utils/utils";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import dp from "../navbar/img/dp.png";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.jpg";
import image1 from "./images/image2.jpg";
import image2 from "./images/image3.jpg";
// import image3 from "./images/imag";

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
  const [badgeHover, setBadgeHover] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountry, setshowCountry] = useState(true);
  const [user, setUser] = useState(false);
  const [showItinerary, setshowItinerary] = useState(true);
  const [showWonders, setshowWonders] = useState(false);
  const [voyageshow, setvoyageshow] = useState(false);
  const [wondersshow, setwondersshow] = useState(false);
  const [countriesshow, setcountriesshow] = useState(false);
  const [message, setmessage] = useState("Show More");
  const [profile, setprofile] = useState<any>([]);
  const [countriescount, setcountriescount] = useState<any>([]);
  const [navInfo, setnavInfo] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getItineraries = async () => {
    setIsLoading(true);

    try {
      let getdata = (await api(`/itinerary/userItinerary?username=${id?.toLowerCase()}`)) as {
        data: Itinerary[];
      };

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

      // let purchasedData = (await api(`/itinerary/purchased/${""}`)) as { data: Itinerary[] };
      // setPurchasedItineraries(purchasedData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyLogin = async () => {
    let isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) setUser(true);
    else setUser(false);
  };

  useEffect(() => {
    // const userRole = getUserRole(); // Replace this with your logic to get the user's role
    // if (userRole !== "seller") {
    //   navigate("/itinerary/list");
    // }
    // getUserDetails();
    verifyLogin();

    getItineraries();
  }, []);

  const getProfile = async () => {
    try {
      let user = await api(`/users/get-userprofile?name=${id?.toLowerCase()}`);

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

      // console.log({
      //   name: user.data.user.userInfo.name,
      //   country: countries?.label,
      //   voyagestyle: user.data.user.userInfo.voyageStyle,
      //   visitedCountries: user.data.user.userInfo.visitedCountries,
      //   visitedWonders: user.data.user.userInfo.visitedWonders,
      // });

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
    flag: string;
  }
  const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode, flag }) => {
    return (
      <span
        style={{
          width: flag === "flag" ? "18px" : "",
          height: flag === "flag" ? "18px" : "",
        }}
        className={`fi fi-${countryCode.toLowerCase()} ${flag !== "flag" && "countryStyling"}`}
      />
    );
  };

  return (
    <>
      <section className="listing-bg section1style">
        {/* <div className="container"> */}
        {/* <!-- -----------------------  right image and left text -------------- --> */}
        <div className="row first-section111">
          <div className="col-sm-12 col-md-2 col-lg-2"></div>
          <div className="col-sm-12 col-md-8 col-lg-12">
            <div
              style={{
                width: "100%",
                minHeight: "263px",
                position: "relative",
                // color: "white",
                borderRadius: "20px",
                margin: "60px 0px",
                color: "white",
                marginTop: "0px",
              }}
            >
              <img
                src={image2}
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
                  background: "rgb(0 0 0 / 59%)",
                  zIndex: "10",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
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
                  padding: "0px 178px",
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
                    style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}
                  >
                    <div style={{ width: "135px" }}>
                      <img
                        style={{
                          width: "135px",
                          height: "135px",
                          cursor: "pointer",
                          borderRadius: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={
                          profile?.image
                            ? profile?.image
                            : "https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                        }
                        alt=""
                      />
                    </div>
                    <div style={{ marginLeft: "50px" }}>
                      <div>
                        <h2 style={{ fontWeight: 400, color: "white" }}>{navInfo?.name}</h2>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <h5 style={{ fontSize: "16px", margin: "0px", width: "111px" }}>
                          Voyage Style:{" "}
                        </h5>
                        {navInfo?.voyagestyle?.length > 0 ? (
                          navInfo?.voyagestyle?.map(
                            (item: any, i: any) =>
                              i < 8 && (
                                <h5
                                  style={{
                                    fontSize: "15px",
                                    margin: "7px 0px",
                                    marginLeft: "10px",
                                    background: " white",
                                    color: "black",
                                    padding: "4px",
                                    borderRadius: "10px",
                                  }}
                                  key={i}
                                >
                                  {item.replace(/\s+/g, "_")}
                                </h5>
                              )
                          )
                        ) : (
                          <h5
                            style={{
                              fontSize: "15px",
                              margin: "7px 0px",
                              marginLeft: "10px",
                              background: " white",
                              color: "black",
                              padding: "4px",
                              borderRadius: "10px",
                            }}
                          >
                            No Voyage Style
                          </h5>
                        )}
                        {}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <h5 style={{ fontSize: "16px", margin: "0px" }}>Country: </h5>
                        <p
                          style={{
                            margin: "0px",
                            marginLeft: "10px",
                            background: " white",
                            color: "black",
                            padding: "4px",
                            borderRadius: "10px",
                          }}
                        >
                          {navInfo?.country ? navInfo?.country : "No Country"}
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",

                          marginBottom: "10px",
                          alignItems: "center",
                        }}
                      >
                        <h5 style={{ fontSize: "16px", margin: "0px" }}>Visited Countries: </h5>
                        {navInfo?.visitedCountries?.length > 0 ? (
                          navInfo?.visitedCountries?.map((item: any, i: any) => (
                            <p
                              style={{
                                margin: "0px",
                                marginLeft: "10px",
                                background: " white",
                                color: "black",
                                padding: "4px",
                                borderRadius: "10px",
                              }}
                            >
                              {item.label}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              margin: "0px",
                              marginLeft: "10px",
                              background: " white",
                              color: "black",
                              padding: "4px",
                              borderRadius: "10px",
                            }}
                          >
                            No Visited Countries
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",

                          marginBottom: "10px",
                          alignItems: "center",
                        }}
                      >
                        <h5 style={{ fontSize: "16px", margin: "0px" }}>Visited Wonders: </h5>
                        {navInfo?.visitedWonders?.length > 0 ? (
                          navInfo?.visitedWonders?.map((item: any, i: any) => (
                            <p
                              style={{
                                margin: "0px",
                                marginLeft: "10px",
                                background: " white",
                                color: "black",
                                padding: "4px",
                                borderRadius: "10px",
                                width: item.label.trim() === "Roman Colosseum, Italy" ? "21%" : "",
                              }}
                            >
                              {item.label}
                            </p>
                          ))
                        ) : (
                          <p
                            style={{
                              margin: "0px",
                              marginLeft: "10px",
                              background: " white",
                              color: "black",
                              padding: "4px",
                              borderRadius: "10px",
                            }}
                          >
                            No Visited Wonders
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          // alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <h5 style={{ fontSize: "16px", margin: "0px" }}>Introduction:</h5>
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
        {/* </div> */}
      </section>
      <section className="listing-bg section2style">
        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section111">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div
              className="col-sm-12 col-md-8 col-lg-12"
              style={{ padding: "0px", height: "auto", position: "relative" }}
            >
              <img
                src={image2}
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
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    // color: "white",
                    // margin: "10px 0px",
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
                      {navInfo?.name}
                    </h2>
                  </div>
                  <div
                    style={{
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      padding: "0px 21px",
                      paddingRight: "0px",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                      <div style={{ width: "80px" }}>
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                            cursor: "pointer",
                            borderRadius: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          src={
                            profile?.image
                              ? profile?.image
                              : "https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                          }
                          alt=""
                        />
                      </div>{" "}
                      <div style={{ marginLeft: "0px", color: "white", width: "186px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            height: "34px",
                            width: "93%",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              margin: "7px 0px",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              height: "39px",
                              gap: "9px",
                            }}
                          >
                            <h3 style={{ margin: "0px" }}>{navInfo?.voyagestyle?.length}</h3>
                            <h5
                              style={{
                                fontSize: "15px",
                                margin: "0px",
                              }}
                            >
                              {navInfo?.voyagestyle?.length > 1 ? "Voyage Styles" : "Voyage Style"}
                            </h5>
                          </div>
                          <div
                            onClick={() => {
                              setvoyageshow(!voyageshow);
                            }}
                          >
                            {!voyageshow ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-up"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        {voyageshow && navInfo?.voyagestyle?.length > 0 && (
                          <div
                            style={{
                              overflowX: "scroll",
                              // width: "170px",
                              display: "flex",
                              flexWrap: "wrap",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            {navInfo?.voyagestyle?.map(
                              (item: any, i: any) => {
                                return (
                                  // i < 2 && ( // Check if index is less than 2
                                  <p
                                    style={{ fontSize: "9px", listStyle: "disc", margin: "0px" }}
                                    key={i}
                                  >
                                    {`${item},`}
                                  </p>
                                );
                              }
                              // )
                            )}
                          </div>
                        )}

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "93%",
                            justifyContent: "space-between",
                          }}
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
                            {navInfo?.country ? navInfo?.country : "No Country"}
                          </h5>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "93%",
                            justifyContent: "space-between",
                          }}
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
                          <div
                            onClick={() => {
                              setcountriesshow(!countriesshow);
                            }}
                          >
                            {!countriesshow ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-up"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        {countriesshow && navInfo?.visitedCountries?.length > 0 && (
                          <div
                            style={{
                              overflowX: "scroll",
                              // width: "170px",
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              gap: "6px",
                            }}
                          >
                            {navInfo?.visitedCountries?.map(
                              (item: any, i: any) => {
                                return (
                                  // i < 2 && ( // Check if index is less than 2
                                  <CountryFlag countryCode={item.value} flag="flag" />
                                  // <p
                                  //   style={{ fontSize: "15px", listStyle: "disc", margin: "0px" }}
                                  //   key={i}
                                  // >
                                  //   {`${item.label.replace(/\s+/g, "_")},`}
                                  // </p>
                                );
                              }
                              // )
                            )}
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "93%",
                            justifyContent: "space-between",
                          }}
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
                          <div
                            onClick={() => {
                              setwondersshow(!wondersshow);
                            }}
                          >
                            {!wondersshow ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-down"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-up"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        {wondersshow && navInfo?.visitedWonders?.length > 0 && (
                          <div
                            style={{
                              // width: "170px",
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              gap: "6px",
                            }}
                          >
                            {navInfo?.visitedWonders?.map(
                              (item: any, i: any) => {
                                return (
                                  // i < 2 && ( // Check if index is less than 2
                                  <p
                                    style={{ fontSize: "9px", listStyle: "disc", margin: "0px" }}
                                    key={i}
                                  >
                                    {`${item.label},`}
                                  </p>
                                );
                              }
                              // )
                            )}
                          </div>
                        )}

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
      <div className="container aboutUs">
        <div className="row">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              paddingTop: "0px",
            }}
          >
            <p style={{ margin: "0px", marginTop: "10px", textAlign: "justify" }}>
              {message === "Show Less"
                ? profile?.userInfo?.bio
                : profile?.userInfo?.bio?.length <= 200
                ? profile?.userInfo?.bio
                : `${profile?.userInfo?.bio?.slice(0, 200)}...`}
            </p>
            {profile?.userInfo?.bio?.length > 200 && (
              <p
                style={{ cursor: "pointer", color: "#939191" }}
                onClick={() => {
                  if (message === "Show More") {
                    setmessage("Show Less");
                  } else {
                    setmessage("Show More");
                  }
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          onClick={() => {
            if (!user) {
              navigate("/auth/sign-up");
            } else {
              navigate("/itinerary/setupProfile");
            }
          }}
        >
          <button
            style={{
              background: " #f5ad01",
              outline: "none",
              border: "none",
              fontSize: "16px",
              color: "white",
              padding: "5px",
              borderRadius: " 7px",
              cursor: "pointer",
            }}
          >
            {user ? "Create Voyage" : "Start your voyage"}
          </button>
        </div>
      </div>

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
            {/* <h4
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
            </h4> */}
            {/* <div style={{ width: "1px", height: "30px", border: "1px solid #00000099" }}></div> */}
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
              My Voyages
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
                      <span className="first-textbg itlisting"> My Voyages</span>
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
                          to={`/itinerary/list?region=${each?.code}&&name=${id}`}
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
                              <CountryFlag countryCode={each.code} flag="flag1" />
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
              No Voyages
            </h3>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "18px",
              }}
            >
              <a
                href="https://dls7hd5yq8f.typeform.com/to/dzOCfYcC?typeform-source=www.myvoyages.com"
                // target="_blank"
              >
                <button
                  style={{
                    background: " #f5ad01",
                    outline: "none",
                    border: "none",
                    color: "white",
                    padding: "5px",
                    borderRadius: " 7px",
                    cursor: "pointer",
                  }}
                >
                  Start Your Voyage
                </button>
              </a>
            </div> */}
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
                      {navInfo?.visitedWonders?.map((each: any) => {
                        return (
                          <Link
                            to={``}
                            style={{ marginBottom: "20px", cursor: "default" }}
                            key={each._id}
                            // onMouseEnter={() => setBadgeHover(each._id)}
                            // onMouseLeave={() => setBadgeHover(null)}
                            className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                          >
                            <div className="card">
                              <img
                                className="card-img-top"
                                src={
                                  each.label.trim() === "Chichen Itza, Mexico"
                                    ? img5
                                    : each.label.trim() === "Great Wall of China"
                                    ? img1
                                    : each.label.trim() === "Petra, Jordan"
                                    ? img2
                                    : each.label.trim() === "Machu Picchu, Peru"
                                    ? img4
                                    : each.label.trim() === "Roman Colosseum, Italy"
                                    ? img6
                                    : each.label.trim() === "Christ the Redeemer, Brazil"
                                    ? img3
                                    : each.label.trim() === "Taj Mahal, India"
                                    ? img7
                                    : ""
                                }
                                alt="Cardimage"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                  objectPosition: "top",
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
                        );
                      })}
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
                    <span className="first-textbg itlisting">VOYAGES</span>
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
                              <img src={each.image} alt="" />
                              {/* <span className="b">{each.userId.username}</span> */}
                            </div>
                            <div className="subtitle">
                              <span className="a">Created At:</span>

                              {/* <span className="b">{each.userId.username}</span> */}
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
            No Voyages
          </h3>
        </div>
      )}
    </>
  );
};

export default SingleUserDetail;
