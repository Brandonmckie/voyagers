import api from "../../utils/api";
import "./style.css";

type Props = {};

const StripeConnect = (props: Props) => {
  const handleStripeAdd = async () => {
    try {
      const data = await api.post("/billing/connect-stripe");
      console.log(data);
      window.open(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="main-stripe">
      <div className="text-center">
        <h2>Stripe</h2>
        <p>Let's Connect Through Stripe and Get Paid for My Voyages</p>
        <button onClick={handleStripeAdd}>Connect Stripe</button>
      </div>
    </section>
  );
};

export default StripeConnect;
