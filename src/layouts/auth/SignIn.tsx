import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "./assets/styles/index.css";
import logo from "./assets/images/logo.png";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import jwtDecode from "jwt-decode";

type State = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [values, setValues] = useState<State>({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [forgotPassword, setforgotPassword] = useState(false);
  const [Code, setCode] = useState(false);
  const [codeValue, setcodeValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let username = "";
    let info = true;
    setIsLoading(true);
    if (!forgotPassword && !Code) {
      try {
        let data = await api.post("/users/login", values);

        let token = data?.data?.token;
        username = data?.data?.username;
        info = data?.data?.info;
        console.log(info);

        if (token) {
          localStorage.setItem("jwt", token);
          let loginval = localStorage.getItem("loginvalue");
          if (loginval) {
            localStorage.removeItem("loginvalue");
            navigate(loginval);
          } else {
            if (info) {
              navigate(`/user/${username}`);
            } else {
              navigate("/itinerary/setupProfile?login=true");
            }
            // navigate(`/user/${username}`);
          }
        }
      } catch (error: any) {
        setErrors(error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    } else if (!Code) {
      try {
        let { data } = await api.post("/users/forgotpassword", { email: values?.email });
        setCode(true);
        setforgotPassword(false);
      } catch (error: any) {
        setErrors(error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        let { data } = await api.post("/users/verifyCode", {
          code: parseInt(codeValue),
          email: values?.email,
        });
        navigate(`/auth/Reenter-Password?email=${values?.email}`);
      } catch (error: any) {
        setErrors(error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Code) {
      alert("We have sent a code to your email address");
    }
  }, [Code]);

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
                <h1>
                  {forgotPassword
                    ? "Forgot Password"
                    : Code
                    ? "Verify your Code"
                    : " Login to your MV account"}
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                {!Code && (
                  <>
                    {" "}
                    <label className="control-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={values.email}
                      type="email"
                      className="form-control"
                      id="email"
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
                )}

                {Code && (
                  <>
                    {" "}
                    <label className="control-label" htmlFor="email">
                      Code
                    </label>
                    <input
                      onChange={(e: any) => {
                        setcodeValue(e.target.value);
                      }}
                      value={codeValue}
                      type="text"
                      className="form-control"
                      id="code"
                      placeholder="000000"
                      name="code"
                    />
                    <p
                      style={{
                        textAlign: "center",
                        display: errors?.code ? "block" : "none",
                        color: errors?.code ? "red" : "black",
                        marginTop: "5px",
                      }}
                    >
                      {errors?.code}
                    </p>
                  </>
                )}

                <br />
                {!forgotPassword && !Code && (
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
                )}

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

                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (forgotPassword || Code) {
                      setforgotPassword(false);
                      setCode(false);
                    } else if (!forgotPassword || !Code) {
                      setforgotPassword(true);
                    } else {
                      navigate("/auth/login");
                    }
                  }}
                >
                  {forgotPassword || Code ? "Login?" : "Forgot Password?"}
                </p>
                <br />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-orange navbar-btn btn-block"
                >
                  {isLoading ? <CircularProgress /> : forgotPassword || Code ? "Confirm" : "Login"}
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

export default SignIn;
