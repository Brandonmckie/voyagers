import "./assets/styles/style.css";

type Props = {};

const ContactUs = (props: Props) => {
  return (
    <div className="container">
      <div className="contactus">
        <h3 style={{ color: "#f1a501" }}>Contact Us</h3>
        <p className="text-bg contactus0">
          For customized itineraries or to inquire about anything My Voyages, send us an email at{" "}
          <span style={{}}>info@myvoyages.com</span>
        </p>
      </div>
      {/* // <section id="AboutUs">
    //   <ul>
    //     <li>
    //       <label htmlFor="email">Email</label>
    //       <input type="text" placeholder="Email" id="email" name="email" />
    //     </li>

    //     <li>
    //       <label htmlFor="subject">Subject</label>
    //       <input type="text" placeholder="Subject" id="subject" name="subject" />
    //     </li>

    //     <li>
    //       <label htmlFor="description">Description</label>
    //       <input type="text" placeholder="Description" id="description" name="description" />
    //     </li>
    //   </ul>
    // </section> */}
    </div>
  );
};

export default ContactUs;
