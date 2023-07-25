import api from "../../utils/api";
import "./style.css";

const Boarding = () => {
  const handleStripeAdd = async () => {
    const stripe_data = await api("/billing/get-account-links");
    window.location.href = stripe_data.data;
  };

  return (
    <section className="main-stripe">
      <div className="text-center">
        <h2>Stripe</h2>
        <p>
          Since your information is incomplete, you are required to finish the onboarding process
        </p>
        <button onClick={handleStripeAdd}>Complete OnBoarding</button>
      </div>
    </section>
  );
};

export default Boarding;
