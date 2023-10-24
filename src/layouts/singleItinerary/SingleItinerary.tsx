import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import img123 from "../home/img/img123.jpg";
import { getUser } from "../../utils/utils";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import Carousel from "react-multi-carousel";
import { options } from "../profile/countriesNames";
import dp from "../navbar/img/dp.png";
import { ProcessRecords } from "../../utils/processReocrds";
import { Switch } from "antd";
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
type Params = { itineraryId: string };

type EachDetail = {
  day: number;
  stayTitle: string;
  stayDescription: string;
  stayImages: string[];
  services: string[];
  dayTitle: string;
  tasteImages: string[];
  tasteDescription: string;
  vibeDescription: string;
  vibeImages: string[];
  experienceDescription: string;
  highlights: string;
  experienceImages: string[];
};

type Itinerary = Partial<{
  country: string;
  title: string;
  price: string;
  introduction: string;
  image: string;
  salesPitch: string;
  eachDetail: EachDetail[];
  details: string;
  category: string[];
  _id?: string;
  userId?: any;
}>;

const SingleItinerary = (props: any) => {
  const { itineraryId } = useParams() as Params;
  const [activitydata, setactivitydata] = useState([]);
  const [checkeddata, setchecked] = useState<any>(true);
  const [data, setData] = useState<Itinerary>({});
  const [selectedTab, setselectedTab] = useState("");
  const [voyageshow, setvoyageshow] = useState(false);
  const [wondersshow, setwondersshow] = useState(false);
  const [countriesshow, setcountriesshow] = useState(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isMy, setIsMy] = useState(false);
  const [purchasedItineraries, setPurchasedItineraries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [message, setmessage] = useState("Show More");

  const navigate = useNavigate();

  const getItinerary = async () => {
    setIsLoading(true);
    try {
      let getdata = (await api(`/itinerary/view/${itineraryId}`)) as {
        data: Itinerary;
      };
      let activities = ProcessRecords([getdata.data]);
      setactivitydata(activities);
      let countries = options.find((item, i) => {
        return item.value === getdata?.data?.userId.userInfo.country;
      });

      setProfile({
        ...getdata?.data?.userId,
        bio: getdata?.data?.userId.userInfo.bio,
        name: getdata?.data?.userId.userInfo.name,
        country: countries?.label,
        voyagestyle: getdata?.data?.userId.userInfo.voyageStyle,
        visitedCountries: getdata?.data?.userId.userInfo.visitedCountries,
        visitedWonders: getdata?.data?.userId.userInfo.visitedWonders,
      });

      const user = getUser();

      if (user?.id === getdata?.data?.userId?._id) {
        setIsMy(true);
      }
      if (getdata?.data) {
        setData(getdata?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckout = async () => {
    try {
      const user = await getUser();
      if (user?.id) {
        // setIsMy(true);
      } else {
        navigate("/auth/sign-up");
        return;
      }
      let data = await api.post("/billing/checkout", {
        itineraryId,
        isChecked,
      });

      if (data.data) {
        window.open(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTab = (e: MouseEvent<any>, tab: number) => {
    e.preventDefault();
    setCurrentTab(tab);
  };
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
  const handleEdit = () => {
    navigate(`/itinerary/edit/${itineraryId}`);
  };

  const getProfile = async () => {
    try {
      let user = await api("/users/get-profile");
      setPurchasedItineraries(user.data.user.boughtItineraries);
      // setProfile(user.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async () => {
    try {
      let user = await api(`/itinerary/sendEmail/${itineraryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getItinerary();
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("check");
    if (status) {
      if (status === "true" && localStorage.getItem("check")) {
        sendEmail();
        localStorage.removeItem("check");
      }
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          <section className="itineraries style-input">
            <div className="container containersize">
              <div className="d-itineraries">
                <div className="row singlerow">
                  <div className="col-md-6 divrow">
                    <div
                      className="divclass0"
                      style={{
                        width: "91%",
                        height: "100%",
                        position: "relative",
                        color: "white",
                        borderRadius: "20px",
                      }}
                    >
                      <img
                        className="divimage0"
                        src={data.image}
                        alt=""
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: "20px",
                          objectFit: "fill",
                          objectPosition: "center",
                          imageRendering: "auto",
                        }}
                      />
                      <div style={{ zIndex: "10", position: "inherit" }}>
                        <h2
                          className="h2style"
                          onClick={() => {
                            navigate(`/user/${profile?.username}`);
                          }}
                          style={{
                            fontWeight: 400,
                            cursor: "pointer",
                            color: "white",
                            margin: "0px",
                            textAlign: "center",
                            padding: "4px",
                            background: "rgba(0, 0, 0, 0.51)",
                            borderTopRightRadius: " 20px",
                            borderTopLeftRadius: "20px",
                          }}
                        >
                          {profile?.name}
                        </h2>
                      </div>
                      <div
                        className="div3"
                        style={{
                          background: "rgb(0 0 0 / 51%)",
                          zIndex: "10",
                          position: "inherit",
                          width: "100%",
                          height: "77%",
                          borderBottomRightRadius: "20px",
                          borderBottomLeftRadius: "20px",
                          padding: "0px 14px 0px 23px",
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
                            className="divstyle1"
                            style={{ display: "flex", alignItems: "center", gap: "10px" }}
                          >
                            {" "}
                            <img
                              className="divimage"
                              style={{
                                width: "80px",
                                height: "80px",
                                cursor: "pointer",
                                borderRadius: "360px",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              src={
                                data?.userId?.image
                                  ? data?.userId?.image
                                  : "https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                              }
                              alt=""
                            />
                            <div style={{ marginLeft: "10px", display: "none" }}>
                              <p className="itemprofileinfo-username">
                                by <i>{profile?.name}</i>
                              </p>
                              <p className="itemprofileinfo-country">
                                {data?.userId?.country || "Country"}
                              </p>
                            </div>
                          </div>

                          <div style={{ marginLeft: "10px", color: "white" }}>
                            <div
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                height: "34px",
                                width: "100%",
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

                                  width: "100%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <h3 style={{ margin: "0px" }}>{profile?.voyagestyle?.length}</h3>
                                  <h5
                                    style={{
                                      fontSize: "15px",
                                      margin: "0px",
                                    }}
                                  >
                                    Voyage Style
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
                            </div>
                            {voyageshow && profile?.voyagestyle?.length > 0 && (
                              <div
                                style={{
                                  // width: "170px",
                                  display: "flex",
                                  flexWrap: "wrap",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                {profile?.voyagestyle?.map(
                                  (item: any, i: any) => {
                                    return (
                                      // i < 2 && ( // Check if index is less than 2
                                      <p
                                        style={{
                                          fontSize: "9px",
                                          listStyle: "disc",
                                          margin: "0px",
                                        }}
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
                            {/* <div
                              className="slider001"
                              style={{
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
                              <div
                                style={{
                                  overflowX: "auto",
                                  width: "170px",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                {profile?.voyagestyle?.map((item: any, i: any) => (
                                  <h5 style={{ fontSize: "15px", margin: "7px 0px" }} key={i}>
                                    {`${item.replace(/\s+/g, "_")},`}
                                  </h5>
                                ))}
                              </div>
                            </div> */}

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
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
                                {profile?.country}
                              </h5>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                height: "34px",
                                width: "101%",
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
                                <h3 style={{ margin: "0px" }}>
                                  {profile?.visitedCountries?.length}
                                </h3>
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

                            {countriesshow && profile?.visitedCountries?.length > 0 && (
                              <div
                                style={{
                                  // width: "170px",
                                  display: "flex",
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  gap: "6px",
                                }}
                              >
                                {profile?.visitedCountries?.map(
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
                                height: "34px",
                                width: "101%",
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
                                <h3 style={{ margin: "0px" }}>
                                  {" "}
                                  {profile?.visitedWonders?.length}
                                </h3>{" "}
                                <h5
                                  style={{
                                    fontSize: "15px",
                                    margin: "0px",
                                  }}
                                >
                                  {" "}
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

                            {wondersshow && profile?.visitedWonders?.length > 0 && (
                              <div
                                style={{
                                  // width: "170px",
                                  display: "flex",
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  gap: "6px",
                                }}
                              >
                                {profile?.visitedWonders?.map(
                                  (item: any, i: any) => {
                                    return (
                                      // i < 2 && ( // Check if index is less than 2
                                      <p
                                        style={{
                                          fontSize: "9px",
                                          listStyle: "disc",
                                          margin: "0px",
                                        }}
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
                      </div>
                      {/* <img className="" src={data.image} alt={data?.title} style={{width: "100%"}}/> */}
                    </div>

                    <div className="single-itinery">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingBottom: "0px",
                        }}
                      >
                        <p style={{ margin: "0px", textAlign: "justify" }}>
                          {message === "Show Less"
                            ? profile?.bio
                            : profile?.bio?.length <= 200
                            ? profile?.bio
                            : `${profile?.bio?.slice(0, 200)}...`}
                        </p>
                        {profile?.bio?.length > 200 && (
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
                      <div className="editstyle0">
                        <h1 className="h1styletitle">{data.title}</h1>
                        {isMy ? (
                          <div
                            className="col-md-2 col-sm-12 col-xs-12"
                            style={{ paddingLeft: "0px", marginTop: "11px" }}
                          >
                            <button
                              onClick={handleEdit}
                              className="btn btn-orange navbar-btn"
                              style={{ padding: " 8px 15px" }}
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <ul className="ulstyle ulstyle9">
                        {data.category?.map((item) => (
                          <li>{item}</li>
                        ))}
                        {/* <li>Experience</li> 
                      </ul> */}

                      {/* <p>{data.introduction}</p> */}

                      <div className="row">
                        {/* <div
                          className="col-md-4 col-sm-12 col-xs-12"
                          // style={{ paddingLeft: "0px" }}
                        >
                          <h3 className="price-sec text-left">
                            Price: <span> ${data.price}</span>
                          </h3>
                        </div> */}

                        {/* {profile.role === "seller" ? (
                          ""
                        ) : ( */}
                        {/* <div className="col-md-12 col-sm-12 col-xs-12">
                          {purchasedItineraries.includes(itineraryId) || isMy ? (
                            <></>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "flex-start",
                                  margin: "12px 0px -2px 0px",
                                }}
                              >
                                <input
                                  style={{
                                    width: "17px",
                                    height: "17px",
                                    position: "relative",
                                    top: "-2px",
                                  }}
                                  type="checkbox"
                                  id="myCheckbox"
                                  name="myCheckbox"
                                  value="1"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    localStorage.setItem("check", `${e.target.checked}`);
                                    setIsChecked(e.target.checked);
                                  }}
                                />
                                <label
                                  htmlFor="myCheckbox"
                                  className="labelmessage"
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "15px",
                                    color: "#383838f7",
                                  }}
                                >
                                  To have a My Voyages Travel Expert execute this itinerary and
                                  contact you.
                                </label>
                              </div>
                              <button
                                onClick={handleCheckout}
                                style={{ width: "116px" }}
                                className="btn btn-orange navbar-btn"
                              >
                                Checkout
                              </button>
                            </div>
                          )}
                        </div> */}
                        {/* )} */}
                        <div className="col-md-4 col-sm-12 col-xs-12"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      className="image00 image11"
                      src={data.image}
                      alt={data?.title}
                      style={{ imageRendering: "auto", objectFit: "fill" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="listing">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="left-first">
                    <ul className="nav nav-tabs text-center singlenavstyle">
                      <li className={`${selectedTab === "" ? "active" : ""}`}>
                        <a
                          href="#tab_default_1"
                          onClick={() => setselectedTab("")}
                          data-toggle="tab"
                        >
                          All Activities
                        </a>
                      </li>
                      <li className={`${selectedTab === "stay" ? "active" : ""}`}>
                        <a
                          href="#tab_default_2"
                          data-toggle="tab"
                          onClick={() => setselectedTab("stay")}
                        >
                          Stay
                        </a>
                      </li>
                      <li className={`${selectedTab === "taste" ? "active" : ""}`}>
                        <a
                          href="#tab_default_3"
                          data-toggle="tab"
                          onClick={() => setselectedTab("taste")}
                        >
                          Taste
                        </a>
                      </li>
                      <li className={`${selectedTab === "vibe" ? "active" : ""}`}>
                        <a
                          href="#tab_default_4"
                          data-toggle="tab"
                          onClick={() => setselectedTab("vibe")}
                        >
                          Vibe
                        </a>
                      </li>
                      <li className={`${selectedTab === "experience" ? "active" : ""}`}>
                        <a
                          href="#tab_default_5"
                          data-toggle="tab"
                          onClick={() => setselectedTab("experience")}
                        >
                          {" "}
                          Experience
                        </a>
                      </li>
                    </ul>
                    {/* <h1 className="top-heading">
                      <span className="first-textbg">Activities Listing</span>
                    </h1> */}
                  </div>
                </div>
              </div>
              {/* <div
                className="switchstyle00"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "13px",
                  flexDirection: "row",
                  gap: "13px",
                }}
              >
                <p style={{ fontWeight: 600, fontSize: "18px", color: "#00000096" }}>Horizontal</p>
                <Switch
                  style={{ position: "relative", top: "3px" }}
                  checked={checkeddata}
                  onChange={(e) => {
                    setchecked(!checkeddata);
                  }}
                />
                <p style={{ fontWeight: 600, fontSize: "18px", color: "#00000096" }}>Vertical</p>
              </div> */}
              {activitydata.length > 0 ? (
                checkeddata ? (
                  <div className="row">
                    <div
                      className="card-grid verticalslider"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        padding: "50px 0px",
                      }}
                    >
                      {activitydata
                        .filter(
                          (each: any) => (selectedTab ? each?.type === selectedTab : true)
                          // selectedTab ? each?.category.includes(selectedTab) : true
                        )
                        .map((each: any, i: any) => (
                          <div
                            key={i}
                            className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                            style={{ marginBottom: "12px" }}
                          >
                            <div
                              style={{
                                textDecoration: "none",
                                cursor: "default",
                                marginBottom: "6px",
                                background: "none",
                              }}
                              // to={`/itinerary/view/${each?._id}`}
                              // to={`/user/${each.username}`}
                              className="card"
                            >
                              {each.image.includes("mp4") ||
                              each.image.includes("mp4") ||
                              each.image.includes("mkv") ||
                              each.image.includes("MKV") ||
                              each.image.includes("mov") ||
                              each.image.includes("wmv") ||
                              each.image.includes("WMV") ||
                              each.image.includes("MOV") ||
                              each.image.includes("webm") ||
                              each.image.includes("WEBM") ||
                              each.image.includes("m4v") ||
                              each.image.includes("M4V") ||
                              each.image.includes("3gp") ||
                              each.image.includes("3GP") ||
                              each.image.includes("mpeg") ||
                              each.image.includes("MPEG") ||
                              each.image.includes("ogv") ||
                              each.image.includes("OGV") ? (
                                <video
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "fill",
                                    // objectPosition: "center",
                                    borderRadius: "7px",
                                  }}
                                  className="card-img-top imgStyle"
                                  poster="https://myvoyagemedia.s3.amazonaws.com/uploads/d6abaa3a-305b-420c-a1f5-d1da1929f348-image.png"
                                  controls
                                >
                                  <source src={each.image} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <img
                                  className="card-img-top imgStyle"
                                  src={each.image}
                                  alt="Cardimage"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "fill",
                                    imageRendering: "auto",
                                    // objectPosition: "center",
                                    borderRadius: "7px",
                                  }}
                                />
                              )}
                              <div className="badge">{<p>{each.type}</p>}</div>
                              {/* <div className="" style={{ padding: "8px" }}>
                              <p
                                className=""
                                style={{
                                  fontFamily: "Work Sans",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  lineHeight: "19px",
                                  letterSpacing: "-0.04em",
                                  color: "#5e6282",
                                  textAlign: "justify",
                                }}
                              >
                                {each.description
                                  ? each.description.length > 20
                                    ? `${each.description.slice(0, 20)}...`
                                    : each.description
                                  : "No Description"}
                              </p>
                            </div> */}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner" style={{ padding: "10px 0px" }}>
                        <div className="item active">
                          <Carousel itemClass="w-full" responsive={responsive}>
                            {activitydata
                              .filter((each: any) =>
                                selectedTab ? each?.type === selectedTab : true
                              )
                              .map((each: any, i: any) => (
                                <div key={i} style={{ marginBottom: "12px" }}>
                                  <div
                                    style={{
                                      textDecoration: "none",
                                      cursor: "default",
                                      background: "none",
                                      borderRadius: " 0px",
                                      boxShadow: "none",
                                      paddingLeft: "10px",
                                    }}
                                    className="card"
                                  >
                                    {each.image.includes("mp4") ||
                                    each.image.includes("mp4") ||
                                    each.image.includes("mkv") ||
                                    each.image.includes("MKV") ||
                                    each.image.includes("mov") ||
                                    each.image.includes("wmv") ||
                                    each.image.includes("WMV") ||
                                    each.image.includes("MOV") ||
                                    each.image.includes("webm") ||
                                    each.image.includes("WEBM") ||
                                    each.image.includes("m4v") ||
                                    each.image.includes("M4V") ||
                                    each.image.includes("3gp") ||
                                    each.image.includes("3GP") ||
                                    each.image.includes("mpeg") ||
                                    each.image.includes("MPEG") ||
                                    each.image.includes("ogv") ||
                                    each.image.includes("OGV") ? (
                                      <video
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                          objectFit: "fill",
                                          // objectFit: "cover",
                                          // objectPosition: "center",
                                          borderRadius: "7px",
                                        }}
                                        className="card-img-top imgStyle"
                                        poster="https://myvoyagemedia.s3.amazonaws.com/uploads/d6abaa3a-305b-420c-a1f5-d1da1929f348-image.png"
                                        controls
                                      >
                                        <source src={each.image} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : (
                                      <img
                                        className="card-img-top imgStyle"
                                        src={each.image}
                                        alt="Cardimage"
                                        style={{
                                          width: "93%",
                                          margin: "0px 12px",
                                          height: "auto",
                                          objectFit: "fill",
                                          imageRendering: "auto",
                                          // objectPosition: "center",
                                          borderRadius: "7px",
                                        }}
                                      />
                                    )}

                                    <div className="badge">{<p>{each.type}</p>}</div>
                                  </div>
                                </div>
                              ))}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <h3 style={{ textAlign: "center" }}>No Voyages found</h3>
                </div>
              )}
              {/* </Carousel> */}
            </div>
          </section>

          {/* {purchasedItineraries.includes(itineraryId) || isMy ? (
            data.eachDetail?.map((each) => (
              <section className="dt-deatils">
                <div className="container">
                  <h4 style={{ marginBottom: "20px" }}>
                    Day {each.day} - {each.dayTitle}
                  </h4>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="details-tabs">
                        <div className="tabbable-panel tabs-pgs">
                          <div className="tabbable-line">
                            <ul className="nav nav-tabs text-center">
                              <li className={currentTab === 0 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 0)} data-toggle="tab">
                                  {" "}
                                  Stay
                                </a>
                              </li>
                              <li className={currentTab === 1 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 1)} data-toggle="tab">
                                  {" "}
                                  Taste
                                </a>
                              </li>
                              <li className={currentTab === 2 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 2)} data-toggle="tab">
                                  {" "}
                                  Vibe
                                </a>
                              </li>
                              <li className={currentTab === 3 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 3)} data-toggle="tab">
                                  {" "}
                                  Experience
                                </a>
                              </li>
                            </ul>

                            <div className="tab-content">
                              <div
                                className={`tab-pane${currentTab === 0 ? " active" : ""}`}
                                id="tab_default_1"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <h4>Services</h4>
                                    <div className="service-options">
                                      <ul className="service-options-ul">
                                        {each.services.map((item) => (
                                          <li>
                                            <span>-</span> {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="col-md-9">
                                    <h4>Description:</h4>
                                    <p>
                                      {each?.stayDescription
                                        ? each?.stayDescription
                                        : "No Description"}
                                    </p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="carousel-reviews broun-block">
                                      <div className="container-fuild">
                                        <div className="row">
                                          <div
                                            id="carousel-reviews"
                                            className="carousel slide"
                                            data-ride="carousel"
                                          >
                                            <div className="carousel-inner">
                                              <div className="item active">
                                                <div className="card-slid">
                                                  {each?.stayImages?.length !==
                                                    (0 || undefined) && (
                                                    <Carousel
                                                      itemClass="w-full"
                                                      responsive={responsive}
                                                    >
                                                      {each.stayImages?.map((image) => (
                                                        <div key={image}>
                                                          <div className="card">
                                                            <img
                                                              className="card-img-top singleimages"
                                                              src={image}
                                                              alt="Cardimage"
                                                            />
                                                          </div>
                                                        </div>
                                                      ))}
                                                    </Carousel>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                    
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`tab-pane${currentTab === 1 ? " active" : ""}`}
                                id="tab_default_2"
                              >
                                <div className="row">
                                  <div className="col-md-9">
                                    <h4>Description:</h4>
                                    <p>
                                      {each?.tasteDescription
                                        ? each?.tasteDescription
                                        : "No Description"}
                                    </p>
                                  </div>
                                  <div className="col-md-3"></div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="carousel-reviews broun-block">
                                      <div className="container-fuild">
                                        <div className="row">
                                          {each?.tasteImages?.length !== 0 && (
                                            <div
                                              id="carousel-reviews"
                                              className="carousel slide"
                                              data-ride="carousel"
                                            >
                                              <div className="carousel-inner">
                                                <div className="item active">
                                                  <div className="card-slid">
                                                    {
                                                      <Carousel
                                                        itemClass="w-full"
                                                        responsive={responsive}
                                                      >
                                                        {each.tasteImages?.map((image) => (
                                                          <div key={image}>
                                                            <div className="card">
                                                              <img
                                                                className="card-img-top singleimages"
                                                                src={image}
                                                                alt="Cardimage"
                                                              />
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </Carousel>
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`tab-pane${currentTab === 2 ? " active" : ""}`}
                                id="tab_default_3"
                              >
                                <div className="row">
                                  <div className="col-md-9">
                                    <h4>Description:</h4>
                                    <p>
                                      {each?.vibeDescription
                                        ? each?.vibeDescription
                                        : "No Description"}
                                    </p>
                                  </div>
                                  <div className="col-md-3"></div>
                                </div>

                                <div className="row">
                                  {each?.vibeImages.length !== 0 && (
                                    <div className="col-md-12">
                                      <div className="carousel-reviews broun-block">
                                        <div className="container-fuild">
                                          <div className="row">
                                            <div
                                              id="carousel-reviews"
                                              className="carousel slide"
                                              data-ride="carousel"
                                            >
                                              <div className="carousel-inner">
                                                <div className="item active">
                                                  <div className="card-slid">
                                                    {
                                                      <Carousel
                                                        itemClass="w-full"
                                                        responsive={responsive}
                                                      >
                                                        {each?.vibeImages?.map((image) => (
                                                          <div key={image}>
                                                            <div className="card">
                                                              <img
                                                                className="card-img-top singleimages"
                                                                src={image}
                                                                alt="Cardimage"
                                                              />
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </Carousel>
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div
                                className={`tab-pane${currentTab === 3 ? " active" : ""}`}
                                id="tab_default_4"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <h4>Highlights of:</h4>
                                    <div className="service-options">
                                      <p>{each?.highlights ? each?.highlights : "No Highlights"}</p>
                                    </div>
                                  </div>
                                  <div className="col-md-9">
                                    <h4>Description:</h4>
                                    <p>
                                      {each?.experienceDescription
                                        ? each?.experienceDescription
                                        : "No Description"}
                                    </p>
                                  </div>
                                </div>

                                <div className="row">
                                  {each?.experienceImages.length !== 0 && (
                                    <div className="col-md-12">
                                      <div className="carousel-reviews broun-block">
                                        <div className="container-fuild">
                                          <div className="row">
                                            <div
                                              id="carousel-reviews"
                                              className="carousel slide"
                                              data-ride="carousel"
                                            >
                                              <div className="carousel-inner">
                                                <div className="item active">
                                                  <div className="card-slid">
                                                    {
                                                      <Carousel
                                                        itemClass="w-full"
                                                        responsive={responsive}
                                                      >
                                                        {each?.experienceImages?.map((image) => (
                                                          <div key={image}>
                                                            <div className="card">
                                                              <img
                                                                className="card-img-top singleimages"
                                                                src={image}
                                                                alt="Cardimage"
                                                              />
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </Carousel>
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div style={{ position: "relative" }}>
              <div id="showBlur">Buy now to show details</div>
              <section className="dt-deatils">
                <div className="container">
                  <h4 style={{ marginBottom: "20px" }}>Day 1</h4>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="details-tabs">
                        <div className="tabbable-panel tabs-pgs">
                          <div className="tabbable-line">
                            <ul className="nav nav-tabs text-center">
                              <li className={currentTab === 0 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 0)} data-toggle="tab">
                                  {" "}
                                  Stay
                                </a>
                              </li>
                              <li className={currentTab === 1 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 1)} data-toggle="tab">
                                  {" "}
                                  Taste
                                </a>
                              </li>
                              <li className={currentTab === 2 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 2)} data-toggle="tab">
                                  {" "}
                                  Vibe
                                </a>
                              </li>
                              <li className={currentTab === 3 ? "active" : ""}>
                                <a onClick={(e) => handleChangeTab(e, 3)} data-toggle="tab">
                                  {" "}
                                  Experience
                                </a>
                              </li>
                            </ul>

                            <div className="tab-content">
                              <div className={`tab-pane active`} id="tab_default_1">
                                <div className="row">
                                  <div className="col-md-3">
                                    <h4>Services</h4>
                                    <div className="service-options">
                                      <ul className="service-options-ul">
                                       
                                        <li>
                                          <span>-</span> Wifi
                                        </li>
                                      
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="col-md-9">
                                    <h4>Description:</h4>
                                    <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                      irure dolor in reprehenderit in voluptate velit esse cillum
                                      dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                      cupidatat non proident, sunt in culpa qui officia deserunt
                                      mollit anim id est laborum.
                                    </p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="carousel-reviews broun-block">
                                      <div className="container-fuild">
                                        <div className="row">
                                          <div
                                            id="carousel-reviews"
                                            className="carousel slide"
                                            data-ride="carousel"
                                          >
                                            <div className="carousel-inner">
                                              <div className="item active">
                                                <div className="card-slid">
                                                  {data.eachDetail?.[0]?.stayImages?.map(
                                                    (image) => (
                                                      <div
                                                        key={image}
                                                        className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                                                      >
                                                        <div className="card">
                                                          <img
                                                            className="card-img-top"
                                                            src={image}
                                                            alt="Card image"
                                                            style={{
                                                              width: "100%",
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                     
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default SingleItinerary;
