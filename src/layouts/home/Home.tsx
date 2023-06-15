import "./styles/carousel.css";
import play from "./img/play.png";
import plane from "./img/plane.png";
import stay from "./img/stay.png";
import taste from "./img/taste.png";
import vibe from "./img/vibe.png";
import rect from "./img/Rect2.png";
import heroRight from "./img/hero-right.png";
import experience from "./img/experience.png";
import Navbar from "../navbar/Navbar";

type Props = {};

const Home = () => {
  return (
    <>
      <section className="hero-image">
        <div className="container">
          <Navbar />
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section">
            <div className="col-sm-12 col-md-7 col-lg-7">
              <div className="left-first">
                <p className="para-first">Best Destinations around the world</p>
                <h1 className="top-heading">
                  Travel, <span className="first-textbg">enjoy and</span> live a new and full life
                </h1>
                <p className="desc-first">
                  Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed
                  listening. Park gate sell they west hard for the.
                </p>
                <div className="row">
                  <div className="col-sm-7 col-md-4 col-lg-3">
                    <button className="btn btn-orange navbar-btn">Find out more</button>
                  </div>
                  <div className="col-sm-3 col-md-4 col-lg-3">
                    <button className="btn btn-ply navbar-btn">
                      <img src={play} alt="Play" />
                      Play Demo
                    </button>
                  </div>
                  <div className="col-sm-2 col-md-4"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5">
              <div className="img-rightone">
                <img src={plane} alt="Plane" />
              </div>
              <div className="img-righttwo">
                <img src={heroRight} />
              </div>
              <div className="img-righthre">
                <img src={plane} alt="Plane" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="second-part text-center">
        <div className="container">
          <div className="row">
            <div className="text-area">
              <h3>CATEGORY</h3>
              <h2>We Offer Best Services</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={stay} alt="Stay" />
                  <div className="title">
                    <h4>Stay</h4>
                  </div>
                  <div className="text">
                    <span>Find your next awe-inspiring getaway from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={taste} />
                  <div className="title">
                    <h4>Taste</h4>
                  </div>
                  <div className="text">
                    <span>Find your next soul satisfying meal from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={vibe} alt="vibe" />
                  <div className="title">
                    <h4>Vibe</h4>
                  </div>
                  <div className="text">
                    <span>Find your next happy place from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={experience} />
                  <div className="title">
                    <h4>Experience</h4>
                  </div>
                  <div className="text">
                    <span>Embark on an unforgettable journey from browsing voyage blogs by</span>
                  </div>
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
                <p className="para-first">Top Selling</p>
                <h1 className="top-heading">
                  Top <span className="first-textbg">ITINERARIES</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-reviews broun-block">
          <div className="container-fuild">
            <div className="row">
              <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="card-slid">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="card">
                          <img className="card-img-top" src={rect} alt="Card image" style={{ width: "100%" }} />
                          <div className="badge">
                            <p>Stay</p>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                            <div className="subtitle">
                              <span className="a">Created by:</span>
                              <span className="b">Tichelle Richards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="card">
                          <img className="card-img-top" src={rect} alt="Card image" style={{ width: "100%" }} />
                          <div className="badge">
                            <p>Stay</p>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                            <div className="subtitle">
                              <span className="a">Created by:</span>
                              <span className="b">Tichelle Richards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="card">
                          <img className="card-img-top" src={rect} alt="Card image" style={{ width: "100%" }} />
                          <div className="badge">
                            <p>Stay</p>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                            <div className="subtitle">
                              <span className="a">Created by:</span>
                              <span className="b">Tichelle Richards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="card">
                          <img className="card-img-top" src={rect} alt="Card image" style={{ width: "100%" }} />
                          <div className="badge">
                            <p>Stay</p>
                          </div>
                          <div className="card-body">
                            <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                            <div className="subtitle">
                              <span className="a">Created by:</span>
                              <span className="b">Tichelle Richards</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a className="left carousel-control" href="#carousel-reviews" role="button" data-slide="prev">
                  <i id="right" className="fa fa-angle-left">
                    {" "}
                  </i>
                </a>
                <a className="right carousel-control" href="#carousel-reviews" role="button" data-slide="next">
                  <i id="right" className="fa fa-angle-right">
                    {" "}
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="client-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
              <div className="text-area">
                <h3>CATEGORY</h3>
                <h2>What OUR CLIENT say about Us.</h2>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12"></div>
          </div>
        </div>
      </section>

      <section className="faq-part">
        <div className="container">
          <div className="row">
            <div className="text-area text-center">
              <h3>FAQ’s</h3>
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel-group" id="accordion">
                <div
                  className="panel panel-default collapsed"
                  data-target="#collapseOne"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      HOW TO USE MY VOYAGES? <i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapseOne"
                    className="panel-collapse collapse"
                    aria-expanded="false"
                    style={{ height: "0px" }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-group" id="accordion">
                <div
                  className="panel panel-default collapsed"
                  data-target="#collapsetwo"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      WHAT DO VOYAGERS DO? <i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapsetwo"
                    className="panel-collapse collapse"
                    aria-expanded="false"
                    style={{ height: "0px" }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-group" id="accordion">
                <div
                  className="panel panel-default collapsed"
                  data-target="#collapsethr"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      OPPORTUNITIES FOR VOYAGERS?<i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapsethr"
                    className="panel-collapse collapse"
                    aria-expanded="false"
                    style={{ height: "0px" }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="btn org-faq">
                  Show more <i className="fa fa-angle-down"></i>
                </button>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;