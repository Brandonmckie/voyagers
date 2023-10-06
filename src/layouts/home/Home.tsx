import "./styles/carousel.css";
import play from "./img/play.png";
import plane from "./img/plane.png";
import stay from "./img/stay.png";
import Slider from "react-slick";
import profile from "./img/profile-picture.jpeg";
import taste from "./img/taste.png";
import img00 from "./img/img00.png";
import img006 from "./img/img006.jpeg";
import img123 from "./img/img123.jpg";
import img002 from "./img/img002.jpeg";
import img003 from "./img/img003.jpeg";
import backimg from "./img/banner0.png";
import card1 from "./img/card1.jpeg";
import card2 from "./img/card2.jpeg";
import card3 from "./img/card3.jpeg";
import card4 from "./img/card4.jpeg";
import card5 from "./img/card5.jpeg";
import card8 from "./img/card8.jpeg";

import vibe from "./img/vibe.png";
import rect from "./img/Rect2.png";
import heroRight from "./img/hero-right.png";
import experience from "./img/experience.png";
import Navbar from "../navbar/Navbar";
import Carousel from "react-multi-carousel";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { checkIfUserIsAuthenticated } from "../../utils/utils";
import CallToAction from "../../components/CallToAction";
import StepsSection from "./Components/stepsSection";
import LastSection from "./Components/lastSection";
import SearchInput from "./Components/searchInput";
import RatingStar from "./Components/RatingStar";

type Props = {};

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
    userInfo: any;
  };
  __v: number;
  _id: string;
};

const Home = () => {
  const [data, setData] = useState<Itinerary[]>([]);
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [user, setUser] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getItineraries = async () => {
    try {
      let getdata = (await api(`/itinerary?limit=40`)) as { data: Itinerary[] };

      setData(getdata.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyLogin = async () => {
    let isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) setUser(true);
    else setUser(false);
  };

  useEffect(() => {
    verifyLogin();

    getItineraries();
  }, []);

  return (
    <>
      <section className="hero-image">
        <Navbar />

        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section1">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="left-first">
                {/* <p className='para-first'>Best Destinations around the world</p> */}
                <div style={{ position: "relative" }}>
                  <h1
                    className="top-heading heading11"
                    style={{ zIndex: "1000", position: "inherit" }}
                  >
                    EXPERIENCE <span style={{ color: "#ef7a03" }}>SIMPLE</span> TRAVEL{" "}
                    <span style={{ color: "#ef7a03" }}>PLANNING</span> THROUGH{" "}
                    <span style={{ color: "#ef7a03" }}>SOCIAL INTERACTION</span>{" "}
                  </h1>
                  <div style={{}} className="banner0011">
                    <img src={img00} alt="" />
                  </div>
                </div>
                <div
                  className="destinations-search destinationinput"
                  style={{ justifyContent: "space-between", marginBottom: "11px" }}
                  onClick={() => setSearchOpen(true)}
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
                </div>
                <div className="row">
                  <div className="col-sm-7 col-md-6 col-lg-6 signup-btn" style={{}}>
                    {!user && (
                      <>
                        {" "}
                        <button
                          className="btn btn-orange navbar-btn signupbtn"
                          onClick={() => {
                            navigate("/auth/sign-up");
                          }}
                        >
                          SIGN UP
                        </button>
                      </>
                    )}

                    <h4
                      onClick={() => {
                        navigate("/contact-us");
                      }}
                      className="contact-button"
                    >
                      CONTACT US
                    </h4>
                  </div>

                  <div className="col-sm-2 col-md-4"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 imgdiv" style={{ position: "relative" }}>
              <div className="img-rightone" style={{ zIndex: 1 }}>
                <img src={backimg} alt="map" />
              </div>
              {/* <div className="img-rightone">
                <img src={plane} alt="Plane" />
              </div> */}
              <div className="img-righttwo" style={{ display: "none" }}>
                <img src={heroRight} />
              </div>
              {/* <div className="img-righthre">
                <img src={plane} alt="Plane" />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* <div style={{}} className="banner0001">
        <img src={backimg} alt="" />
      </div> */}
      <StepsSection />

      <section className="second-part text-center">
        <div className="container">
          <div className="row">
            <div className="text-area">
              <h3>CATEGORY</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={card4} alt="Stay" style={{ position: "relative" }} />
                  <div
                    style={{
                      position: "absolute",
                      width: "90%",
                      height: "279px",
                      top: "30px",
                      background: "#0000004d",
                      borderRadius: "17px",
                    }}
                  ></div>
                  <div className="title" style={{ top: "50%", left: "40%", position: "absolute" }}>
                    <h4
                      style={{
                        color: "white",
                        margin: "0px",
                        textTransform: "uppercase",
                        fontSize: "28px",
                      }}
                    >
                      Stay
                    </h4>
                  </div>
                  {/* <div className="text">
                    <span>Find your next awe-inspiring getaway from browsing voyage blogs by</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={card3} alt="taste" style={{ position: "relative" }} />
                  <div
                    style={{
                      position: "absolute",
                      width: "90%",
                      height: "279px",
                      top: "30px",
                      background: "#0000004d",
                      borderRadius: "17px",
                    }}
                  ></div>
                  <div className="title" style={{ top: "50%", left: "36%", position: "absolute" }}>
                    <h4
                      style={{
                        color: "white",
                        margin: "0px",
                        textTransform: "uppercase",
                        fontSize: "28px",
                      }}
                    >
                      Taste
                    </h4>
                  </div>
                  {/* <div className="text">
                    <span>Find your next soul satisfying meal from browsing voyage blogs by</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={card1} alt="vibe" style={{ position: "relative" }} />
                  <div
                    style={{
                      position: "absolute",
                      width: "90%",
                      height: "279px",
                      top: "30px",
                      background: "#0000004d",
                      borderRadius: "17px",
                    }}
                  ></div>
                  <div className="title" style={{ top: "50%", left: "40%", position: "absolute" }}>
                    <h4
                      style={{
                        color: "white",
                        margin: "0px",
                        textTransform: "uppercase",
                        fontSize: "28px",
                      }}
                    >
                      Vibe
                    </h4>
                  </div>
                  {/* <div className="text" style={{ height: "74px" }}>
                    <span>Find your next happy place from browsing voyage blogs by</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={card2} alt="experience" style={{ position: "relative" }} />
                  <div
                    style={{
                      position: "absolute",
                      width: "90%",
                      height: "279px",
                      top: "30px",
                      background: "#0000004d",
                      borderRadius: "17px",
                    }}
                  ></div>
                  <div className="title" style={{ top: "50%", left: "23%", position: "absolute" }}>
                    <h4
                      style={{
                        color: "white",
                        margin: "0px",
                        textTransform: "uppercase",
                        fontSize: "28px",
                        width: "100%",
                      }}
                    >
                      Experience
                    </h4>
                  </div>
                  {/* <div className="text">
                    <span>Embark on an unforgettable journey from browsing voyage blogs by</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="topsaling">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="left-first">
                <h1 className="top-heading">
                  Top <span className="first-textbg topsingle">ITINERARIES</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-reviews broun-block">
          <div className="container-fuild screenwidth">
            <div className="row">
              <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="card-slid">
                      <Carousel itemClass="w-full" responsive={responsive}>
                        {data?.map((each) => (
                          <div key={each._id} className="list-item">
                            <div
                              onClick={() => {
                                if (user) {
                                  navigate(`/itinerary/view/${each._id}`);
                                } else {
                                  navigate("/auth/login");
                                }
                              }}
                              style={{ textDecoration: "none", cursor: "pointer" }}
                              className="card"
                            >
                              <img
                                className="card-img-top"
                                src={each?.image}
                                alt="Cardimage"
                                style={{
                                  width: "100%",
                                  minHeight: "234px",
                                  maxHeight: "234px",
                                  objectFit: "cover",
                                  objectPosition: "center",
                                }}
                              />
                              <div className="badge">
                                <p>{each?.category[0]}</p>
                              </div>
                              <div className="card-body">
                                <h4 className="card-title">{each.title}</h4>
                                <div className="subtitle">
                                  <span className="a">Created by:</span>
                                  <span className="b">{each?.userId?.userInfo?.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <StepsSection /> */}

      {/* <CallToAction /> */}

      <section className="faq-part">
        <div className="container" style={{ paddingBottom: "45px" }}>
          <div className="row">
            <div
              style={{ display: "flex", flexDirection: "row", gap: "86px" }}
              className="divstyle10"
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="text-area">
                  <h3>FAQ’s</h3>
                  <h2 style={{}}>
                    Frequently Asked <h2 style={{ color: "#EF7A03", margin: "0px" }}>Questions</h2>{" "}
                  </h2>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="panel-group" id="accordion">
                      <div
                        className={`panel panel-default ${currentTab === 0 ? "" : "collapsed"}`}
                        data-target="#collapseOne"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        onClick={() => (currentTab === 0 ? setCurrentTab(null) : setCurrentTab(0))}
                        aria-expanded="false"
                      >
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            What is My Voyages? <i className="fa fa-angle-down"></i>
                          </h4>
                        </div>
                        <div
                          id="collapseOne"
                          className={`panel-collapse collapse ${currentTab === 0 ? "in" : ""}`}
                          aria-expanded="false"
                          style={{
                            height: currentTab === 0 ? "auto" : "0px",
                            transition: "2s all",
                          }}
                        >
                          <div className="panel-body">
                            <p className="text-bg">
                              My Voyages simplifies travel planning through social interaction. We
                              get it! Between time-consuming planning and wasted money on unreliable
                              reviews, you could easily browse between 8-10 different websites and
                              apps. Welcome to travel planning made simple, enjoyable, and efficient
                              for the modern traveler. You can trust our authentic reviews because
                              they’re from like-minded users like you worldwide.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="panel-group" id="accordion">
                      <div
                        className={`panel panel-default ${currentTab === 1 ? "" : "collapsed"}`}
                        data-target="#collapsetwo"
                        onClick={() => (currentTab === 1 ? setCurrentTab(null) : setCurrentTab(1))}
                        data-toggle="collapse"
                        data-parent="#accordion"
                        aria-expanded="false"
                      >
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            What do Voyagers do? <i className="fa fa-angle-down"></i>
                          </h4>
                        </div>
                        <div
                          id="collapsetwo"
                          className={`panel-collapse collapse ${currentTab === 1 ? "in" : ""}`}
                          aria-expanded="false"
                          style={{
                            height: currentTab === 1 ? "auto" : "0px",
                            transition: "2s all",
                          }}
                        >
                          <div className="panel-body">
                            <p className="text-bg">
                              Voyagers can now browse vetted itineraries around the world from some
                              of your favorite travel personalities. If you like what you see, then
                              buy the itinerary, and save yourself hours of research and app
                              browsing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="panel-group" id="accordion">
                      <div
                        className={`panel panel-default ${currentTab === 3 ? "" : "collapsed"}`}
                        onClick={() => (currentTab === 3 ? setCurrentTab(null) : setCurrentTab(3))}
                        data-target="#collapsethr"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        aria-expanded="false"
                      >
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            I want to become a trusted My Voyages Seller?
                            <i className="fa fa-angle-down"></i>
                          </h4>
                        </div>
                        <div
                          id="collapsethr"
                          className={`panel-collapse collapse ${currentTab === 3 ? "in" : ""}`}
                          aria-expanded="false"
                          style={{
                            height: currentTab === 3 ? "auto" : "0px",
                            transition: "2s all",
                          }}
                        >
                          <div className="panel-body">
                            <p className="text-bg">
                              Does everyone come to you for travel ideas, or restaurant ideas, or
                              just for the vibes in general? Do you want to finally make money for
                              putting together those fantastic experiences together for other
                              people. If this sounds like you, send us an email at:
                              info@myvoyages.com and we will reach out to you with next steps.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="text-center">
                <button className="btn org-faq">
                  Show more <i className="fa fa-angle-down"></i>
                </button>
              </div> */}
                  </div>
                </div>
              </div>
              <div>
                <img src={card8} alt="" className="cardimg88" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="client-part"
        style={{
          position: "relative",
          height: "621px",
          top: "-105px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <img className="image000" src={card5} alt="" />
        <div className="container">
          <div className="row sliderSection">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div
                className="text-area"
                style={{ display: "flex", justifyContent: "center", marginTop: "167px" }}
              >
                <h2 style={{ color: "white", borderBottom: "5px solid #EF7A03" }}>
                  What Voyagers are saying.
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <div
                  className="div0001"
                  style={{
                    border: "1px solid #00000014",
                    zIndex: 2,
                    background: "#ffffff",
                    height: "204px",
                    borderRadius: "20px",
                  }}
                >
                  <Slider {...settings}>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        className="testimonial-div"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          height: "202px",
                          gap: "20px",
                        }}
                      >
                        {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    > */}
                        <img
                          className="imgsize00"
                          src={img006}
                          alt=""
                          style={{
                            width: "177px",
                            height: "100%",

                            objectFit: "cover",
                            borderTopLeftRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            zIndex: 3,
                            objectPosition: "center",
                          }}
                        />
                        {/* </div> */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
                          {" "}
                          <p className="text-bg">
                            “Planning any trip takes way too long, being able to connect and plan
                            out the entire trip in one stop is a major win!”
                          </p>
                          <RatingStar />
                          <h4
                            style={{
                              margin: "0px",
                              fontSize: "26px",
                              color: "#000000ad",
                              fontFamily: "Work Sans",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            Zamar
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div style={{ border: "1px solid #00000054" }}>
                      <div
                        className="testimonial-div"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          height: "202px",
                          gap: "20px",
                        }}
                      >
                        <img
                          className="imgsize00"
                          src={img002}
                          alt=""
                          style={{
                            width: "177px",
                            height: "100%",
                            borderTopLeftRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            objectFit: "cover",

                            zIndex: 3,
                            objectPosition: "center",
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
                          <p className="text-bg">
                            “Once I realized I liked traveling a certain way and doing things I
                            like, I had to use My Voyages to find my vibe.”
                          </p>
                          <RatingStar />
                          <h4
                            style={{
                              margin: "0px",
                              fontSize: "26px",
                              color: "#000000ad",
                              fontFamily: "Work Sans",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            Angie
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div style={{ border: "1px solid #00000054" }}>
                      <div
                        className="testimonial-div"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          height: "202px",
                          gap: "20px",
                        }}
                      >
                        <img
                          className="imgsize00"
                          src={img003}
                          alt=""
                          style={{
                            width: "177px",
                            height: "100%",
                            borderTopLeftRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            objectFit: "cover",

                            zIndex: 3,
                            objectPosition: "center",
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                            // height: "125px",
                          }}
                        >
                          <p className="text-bg" style={{ paddingBottom: "5px" }}>
                            “After several lackluster trips based off random reviews, experiencing a
                            trip from tailored reviews and insight was game changing from My
                            Voyages!”
                          </p>
                          <RatingStar />
                          <h4
                            style={{
                              margin: "0px",
                              fontSize: "26px",
                              color: "#000000ad",
                              fontFamily: "Work Sans",
                              fontWeight: 600,
                              textAlign: "center",
                            }}
                          >
                            Samson
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LastSection user={user} />
      {!!searchOpen && <SearchInput setSearchOpen={setSearchOpen} />}
    </>
  );
};

export default Home;
