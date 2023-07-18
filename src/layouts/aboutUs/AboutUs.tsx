import "./assets/styles/style.css";

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <div className="container">
      <div className="aboutus">
        <h3 style={{ color: "#f1a501" }}>About Us</h3>
        <p className="text-bg aboutus0">
          My Voyages is the answer to simple travel planning through social interaction. With over
          57 years of travel industry experience on our team, we know that the number one problem in
          travel is the amount of time it takes to plan travel and the wasted money on unsatisfying
          trips due to reviews that shouldn't have been trusted. Between paid and biased reviews,
          reviews from people you have nothing in common with, and the number of websites/apps you
          browse through to plan a trip, it is all frustrating. We set out to make that process not
          only simple, fun, and fast for the modern traveler, but trusted because all reviews are
          coming from actual likeminded users around the world.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
