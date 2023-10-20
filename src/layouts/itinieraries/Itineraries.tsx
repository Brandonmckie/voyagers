import { useEffect, useRef, useState } from "react";
import api from "../../utils/api";
import "./style.css";
import "./slider.css";
import "./carousel.css";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img123 from "../home/img/img123.jpg";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { checkIfUserIsAuthenticated, getUserRole } from "../../utils/utils";
import regions from "../../utils/regions";
import { ProcessRecords } from "../../utils/processReocrds";
import { MultiSelect } from "react-multi-select-component";

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
  eachDetail: any;
  type: any;
  userId: any;
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

const voyageStyles = [
  {
    label: "Family",
    value: "Family",
  },
  {
    label: "Adventure",
    value: "Adventure",
  },
  {
    label: "Outdoors",
    value: "Outdoors",
  },
  {
    label: "Foodie",
    value: "Foodie",
  },
  {
    label: "Backpacker",
    value: "Backpacker",
  },
  {
    label: "Female Solo",
    value: "Female Solo",
  },
  {
    label: "Photography",
    value: "Photography",
  },
  {
    label: "Van Life",
    value: "Van Life",
  },
  {
    label: "Yacht Life",
    value: "Yacht Life",
  },
  {
    label: "Overlanding",
    value: "Overlanding",
  },
  {
    label: "Sustainable Eco",
    value: "Sustainable Eco",
  },
  {
    label: "Budget",
    value: "Budget",
  },
  {
    label: "Business",
    value: "Business",
  },
  {
    label: "Slow Travel",
    value: "Slow Travel",
  },
  {
    label: "LGTBQ+",
    value: "LGTBQ+",
  },
  {
    label: "Luxury",
    value: "Luxury",
  },
  {
    label: "Wellness",
    value: "Wellness",
  },
  {
    label: "Faith",
    value: "Faith",
  },
  {
    label: "Romantic",
    value: "Romantic",
  },
  {
    label: "Art",
    value: "Art",
  },
  {
    label: "Architecture",
    value: "Architecture",
  },
  {
    label: "History",
    value: "History",
  },
  {
    label: "People & Culture",
    value: "People & Culture",
  },
  {
    label: "Boutique",
    value: "Boutique",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const Itineraries = (props: Props) => {
  const multiSelectRef = useRef(null);
  const [data, setData] = useState<Itinerary[]>([]);
  const [searchdata, setsearchdata] = useState<any>([]);
  const [voyageStyle, setVoyageStyle] = useState([]);
  const [usersArray, setusersArray] = useState<any>([]);
  const [purchasedItineraries, setPurchasedItineraries] = useState<Itinerary[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setselectedTab] = useState("");
  const [User, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setuserRole] = useState("");
  const navigate = useNavigate();

  const getItineraries = async () => {
    try {
      setIsLoading(true);
      if (searchParams.get("name")) {
        let id = searchParams.get("name");
        let region = searchParams.get("region");
        let getdata = (await api(`/itinerary/userItinerary?username=${id?.toLowerCase()}`)) as {
          data: Itinerary[];
        };

        let filteredData = getdata.data.filter((item) => item.country === region);
        let array: Array<{ username: string; image: string }> = [];
        filteredData.map((item) => {
          if (!array.some((entry) => entry.username === item.userId.username)) {
            array.push({ username: item.userId.username, image: item.userId.image });
          }
        });

        setusersArray(array);
        // console.log(filteredData);
        setData(filteredData);
        setsearchdata(filteredData);
      } else {
        let getdata = (await api(
          `/itinerary${searchParams.get("region") ? "?region=" + searchParams.get("region") : ""}`
        )) as { data: Itinerary[] };
        let array: Array<{ username: string; image: string }> = [];
        getdata.data.map((item) => {
          if (!array.some((entry) => entry.username === item.userId.username)) {
            array.push({ username: item.userId.username, image: item.userId.image });
          }
        });

        setusersArray(array);

        // let activities = [];
        // activities = ProcessRecords(getdata);

        setData(getdata.data);
        setsearchdata(getdata.data);
        // setData(getdata.data);

        // let purchasedData = (await api(
        //   `/itinerary/purchased/${
        //     searchParams.get("region") ? "?region=" + searchParams.get("region") : ""
        //   }`
        // )) as { data: Itinerary[] };
        // let purchasedRecords = ProcessRecords(purchasedData);
        // setPurchasedItineraries(purchasedRecords.flat());
      }
    } catch (error) {
      console.log(error);
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
    const userRole = getUserRole();
    setuserRole(userRole);
    getItineraries();
  }, [searchParams]);

  useEffect(() => {
    verifyLogin();
  }, []);

  useEffect(() => {
    setselectedTab("");
    // console.log(voyageStyle);
    let filteredData = searchdata.filter((item: any) => {
      let available = false;
      voyageStyle?.map((style: any) => {
        if (item?.userId?.userInfo?.voyageStyle?.includes(style?.value)) {
          available = true;
        } else {
          // available = false;
        }
      });
      if (available) {
        return item;
      }
      // return voyageStyle.some((style) => {
      //   console.log(item.userId.userInfo.voyageStyle);
      //   return item.userId.userInfo.voyageStyle.includes(style);
      // });
    });
    if (voyageStyle.length === 0) {
      setData(searchdata);
    } else {
      setData(filteredData);
    }
  }, [voyageStyle]);

  return (
    <>
      <section className="itineraries style-input picback">
        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section text-center">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="left-first">
                <p className="para-first">Discover Travel Voyages</p>
                <h1 className="top-heading">
                  {
                    Object.values(regions)
                      .flat()
                      .find((region) => region.code === searchParams.get("region"))?.country
                  }
                </h1>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="tabbable-panel listingtabs">
                  <div className="tabbable-line">
                    <ul className="nav nav-tabs text-center">
                      <li className={`${selectedTab === "" ? "active" : ""}`}>
                        <a
                          href="#tab_default_1"
                          onClick={() => setselectedTab("")}
                          data-toggle="tab"
                        >
                          {" "}
                          All Voyages
                        </a>
                      </li>
                      <li className={`${selectedTab === "stay" ? "active" : ""}`}>
                        <a
                          href="#tab_default_2"
                          data-toggle="tab"
                          onClick={() => setselectedTab("stay")}
                        >
                          {" "}
                          Stay
                        </a>
                      </li>
                      <li className={`${selectedTab === "taste" ? "active" : ""}`}>
                        <a
                          href="#tab_default_3"
                          data-toggle="tab"
                          onClick={() => setselectedTab("taste")}
                        >
                          {" "}
                          Taste
                        </a>
                      </li>
                      <li className={`${selectedTab === "vibe" ? "active" : ""}`}>
                        <a
                          href="#tab_default_4"
                          data-toggle="tab"
                          onClick={() => setselectedTab("vibe")}
                        >
                          {" "}
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
                    <div>
                      <h3 className="multih3">Filter by Voyage Style</h3>
                      <div className="multivoyagers">
                        <MultiSelect
                          options={voyageStyles}
                          value={voyageStyle}
                          onChange={setVoyageStyle}
                          labelledBy="Select Voyage Style"
                        />
                      </div>
                    </div>

                    <div className="tab-content listingtabs">
                      <div className="tab-pane active" id="tab_default_1">
                        {userRole && purchasedItineraries?.length > 0 ? (
                          <>
                            {" "}
                            <div className="row">
                              <div className="col-md-7">
                                <div className="left-first">
                                  <h1 className="top-heading" style={{ paddingLeft: "14px" }}>
                                    <span className="first-textbg">My VOYAGES</span>
                                  </h1>
                                </div>
                              </div>
                            </div>
                            {/* <div className="carousel-reviews broun-block">
                              <div className="container-fuild">
                                {purchasedItineraries?.length > 0 ? (
                                  <div className="row">
                                    <div
                                      id="carousel-reviews"
                                      className="carousel slide"
                                      data-ride="carousel"
                                    >
                                      <div className="carousel-inner">
                                        <div className="item active">
                                          <div className="card-slid">
                                            <Carousel itemClass="w-full" responsive={responsive}>
                                              {purchasedItineraries
                                                .filter((each) =>
                                                  selectedTab
                                                    ? each.category.includes(selectedTab)
                                                    : true
                                                )
                                                .map((each) => (
                                                  <div key={each._id} className="list-item">
                                                    <Link
                                                      style={{ textDecoration: "none" }}
                                                      to={`/itinerary/view/${each._id}`}
                                                      className="card"
                                                    >
                                                      <img
                                                        className="card-img-top imgStyle"
                                                        src={each.image}
                                                        alt="Cardimage"
                                                        style={{
                                                          width: "100%",
                                                          height: "200px",
                                                          objectFit: "cover",
                                                          objectPosition: "center",
                                                        }}
                                                      />
                                                      <div className="badge">
                                                        <p>{each.category[0]}</p>
                                                      </div>
                                                      <div className="card-body">
                                                        <h4 className="card-title">{each.title}</h4>
                                                        <div className="subtitle">
                                                          <span className="a">Created by:</span>
                                                          <span className="b">
                                                            {each.userId.username}
                                                          </span>
                                                        </div>
                                                      </div>
                                                    </Link>
                                                  </div>
                                                ))}
                                            </Carousel>
                                           
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <h3 style={{ textAlign: "center" }}>
                                      No Itineraries purchased yet
                                    </h3>
                                  </div>
                                )}
                              </div>
                            </div> */}
                          </>
                        ) : (
                          <></>
                        )}

                        <br />
                        <section className="listing">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-7">
                                <div className="left-first">
                                  <h1 className="top-heading">
                                    <span className="first-textbg">VOYAGERS</span>
                                  </h1>
                                </div>
                              </div>
                            </div>

                            {usersArray?.length > 0 ? (
                              <div className="row">
                                <div
                                  // className="usersstyle001"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    paddingTop: "20px",

                                    gap: "11px",
                                    margin: "0px 10px",
                                  }}
                                >
                                  {/* <div
                                    id="carousel-reviews"
                                    className="carousel slide"
                                    data-ride="carousel"
                                  >
                                    <div
                                      className="carousel-inner"
                                      style={{ padding: "0px", paddingTop: "21px" }}
                                    > */}
                                  {/* <div className="item active">
                                        <div className="card-slid"> */}
                                  {/* <Carousel itemClass="w-full" res/ponsive={responsive}> */}
                                  {usersArray.map((each: any, i: any) => (
                                    <div
                                      key={i}
                                      // className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                                    >
                                      <div
                                        className="userstyle022 card"
                                        onClick={() => {
                                          navigate(`/user/${each.username}`);
                                        }}
                                        style={{
                                          textDecoration: "none",
                                          cursor: "pointer",
                                          marginBottom: "5px",
                                        }}
                                      >
                                        <div
                                          className="userstyle00"
                                          style={{
                                            display: "flex",
                                            // flexDirection: "row",
                                            alignItems: "center",
                                            gap: "6px",
                                            paddingBottom: "9px",
                                            paddingLeft: "11px",
                                            paddingTop: "9px",
                                            paddingRight: "11px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              width: "35px",
                                              height: "35px",
                                              objectFit: "cover",
                                              objectPosition: "center",
                                              borderRadius: "360px",
                                            }}
                                            src={
                                              each?.image
                                                ? each?.image
                                                : "https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                                            }
                                            alt=""
                                          />
                                          <span
                                            style={{
                                              padding: "0px",
                                              fontSize: "12px",
                                            }}
                                            className="b"
                                          >
                                            {each.username}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  {/* </Carousel> */}
                                  {/* // </div> */}
                                  {/* </div> */}
                                  {/* //{" "} */}
                                  {/* </div>
                                  </div> */}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h3 style={{ textAlign: "center" }}>No Voyagers found</h3>
                              </div>
                            )}
                          </div>
                        </section>

                        <br />

                        <section className="listing">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-7">
                                <div className="left-first">
                                  <h1 className="top-heading">
                                    <span className="first-textbg">VOYAGES Listing</span>
                                  </h1>
                                </div>
                              </div>
                            </div>

                            {data?.length > 0 ? (
                              <div className="row">
                                <div
                                  className="card-grid"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {data
                                    .filter((each) =>
                                      // selectedTab ? each?.type === selectedTab : true
                                      selectedTab ? each?.category.includes(selectedTab) : true
                                    )
                                    .map((each: any) => (
                                      <div
                                        key={each._id}
                                        className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                                        style={{ marginBottom: "20px" }}
                                      >
                                        <div
                                          onClick={() => {
                                            if (User) {
                                              navigate(`/itinerary/view/${each?._id}`);
                                            } else {
                                              localStorage.setItem(
                                                "loginvalue",
                                                `/itinerary/view/${each?._id}`
                                              );
                                              navigate("/auth/sign-up");
                                            }
                                          }}
                                          style={{ textDecoration: "none", cursor: "pointer" }}
                                          // to={`/user/${each.username}`}
                                          className="card"
                                        >
                                          <img
                                            className="card-img-top imgStyle"
                                            src={each.image}
                                            alt="Cardimage"
                                            style={{ width: "100%" }}
                                          />
                                          <div className="badge">
                                            {<p>{selectedTab ? selectedTab : each.category[0]}</p>}
                                          </div>
                                          <div
                                            className="card-body"
                                            style={{
                                              width: "100%",
                                              display: "flex",
                                              flexDirection: "column",
                                              padding: "10px",
                                              paddingBottom: "0px",
                                            }}
                                          >
                                            <h4
                                              title={each.title}
                                              className="card-title"
                                              style={{
                                                margin: "0px",

                                                paddingRight: "10px",
                                                color: "#000000d9",
                                                paddingBottom: "8px",
                                              }}
                                            >
                                              {each.title.length >= 23
                                                ? `${each.title.slice(0, 23)}...`
                                                : each.title}
                                            </h4>
                                            {/* <div
                                  className="subtitle"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                > */}
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "6px",
                                                paddingBottom: "9px",
                                              }}
                                            >
                                              <img
                                                style={{
                                                  width: "35px",
                                                  height: "35px",
                                                  objectFit: "cover",
                                                  objectPosition: "center",
                                                  borderRadius: "360px",
                                                }}
                                                src={
                                                  each?.userId?.image
                                                    ? each?.userId?.image
                                                    : "https://myvoyagemedia.s3.amazonaws.com/uploads/989b161d-df1b-4d8b-ae51-8faf95e5cc6c-img.jpeg"
                                                }
                                                alt=""
                                              />
                                              <span
                                                style={{ padding: "0px", fontSize: "15px" }}
                                                className="b"
                                              >
                                                {each.userId.username}
                                              </span>
                                            </div>

                                            {/* </div> */}

                                            {/* <span className="b">{each?.createdAt?.slice(0, 10)}</span> */}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h3 style={{ textAlign: "center" }}>No Voyages found</h3>
                              </div>
                            )}
                          </div>
                        </section>
                      </div>
                      <div className="tab-pane" id="tab_default_2"></div>
                      <div className="tab-pane" id="tab_default_3"></div>
                      <div className="tab-pane" id="tab_default_4"></div>
                      <div className="tab-pane" id="tab_default_5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Itineraries;
