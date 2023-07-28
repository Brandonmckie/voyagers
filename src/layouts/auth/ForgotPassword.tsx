import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "./assets/styles/index.css";
import logo from "./assets/images/logo.png";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

type State = {
  email: string;
  password: string;
  cpassword: string;
};

const ForgotPassword = () => {
  const [values, setValues] = useState<State>({ email: "", password: "", cpassword: "" });
  const [errors, setErrors] = useState<any>({});
  const [forgotPassword, setforgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (values.password !== values.cpassword) {
        setErrors({ ...errors, message: "Your Password not match" });
        return;
      }
      let data = await api.post("/users/reenter-password", values);
      //   let token = data?.data?.token;

      //   if (token) {
      //     localStorage.setItem("jwt", token);
      alert("Your Password Updated");
      navigate("/auth/login?check=true");
      //   }
    } catch (error: any) {
      setErrors(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email1 = params.get("email");
    if (email1) {
      setValues({ ...values, email: email1 });
    }
  }, []);

  return (
    <section className="signup">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="sigup-box">
              <div className="text-center">
                <Link to="/">
                  <img src={logo} alt="Logo" width="64px" height="64px" />
                </Link>
                <h1>Enter New Password</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <>
                  <label className="control-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.email}
                    type="email"
                    className="form-control"
                    id="email"
                    disabled
                    placeholder="Enter email"
                    name="email"
                  />
                  <p
                    style={{
                      textAlign: "center",
                      display: errors?.email ? "block" : "none",
                      color: errors?.email ? "red" : "black",
                      marginTop: "5px",
                    }}
                  >
                    {errors?.email}
                  </p>
                </>

                <br />

                <>
                  <label className="control-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    name="password"
                  />
                </>

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.password ? "block" : "none",
                    color: errors?.password ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors?.password}
                </p>
                <i className="fa fa-eye-open"></i>
                <br />
                <>
                  <label className="control-label" htmlFor="password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    onChange={handleChange}
                    value={values.cpassword}
                    className="form-control"
                    id="cpassword"
                    placeholder="Enter Confirm password"
                    name="cpassword"
                  />
                </>

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.password ? "block" : "none",
                    color: errors?.password ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors?.cpassword}
                </p>
                <br />

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.message ? "block" : "none",
                    color: errors?.message ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors?.message}
                </p>

                <br />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-orange navbar-btn btn-block"
                >
                  {isLoading ? <CircularProgress /> : "Confirm"}
                </button>
              </form>
              <div className="row">
                <div className="col-md-12">
                  <div className="sigup-boxlast ">
                    <h6 className="text-center">
                      New Here?
                      <Link to="/auth/sign-up"> Create an Account</Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
