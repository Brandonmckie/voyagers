/* eslint-disable no-lone-blocks */
import "./styles/style.css";
import dp from "../navbar/img/dp.png";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { MultiSelect } from "react-multi-select-component";

let options = [
  {
    label: "Afghanistan",
    value: "AF",
  },
  {
    label: "Armenia",
    value: "AM",
  },
  {
    label: "Azerbaijan",
    value: "AZ",
  },
  {
    label: "Bahrain",
    value: "BH",
  },
  {
    label: "Bangladesh",
    value: "BD",
  },
  {
    label: "Bhutan",
    value: "BT",
  },
  {
    label: "Cambodia",
    value: "KH",
  },
  {
    label: "China",
    value: "CN",
  },
  {
    label: "Cyprus",
    value: "CY",
  },
  {
    label: "Georgia",
    value: "GE",
  },
  {
    label: "Hong Kong",
    value: "HK",
  },
  {
    label: "India",
    value: "IN",
  },
  {
    label: "Indonesia",
    value: "ID",
  },
  {
    label: "Iraq",
    value: "IQ",
  },
  {
    label: "Israel",
    value: "IL",
  },
  {
    label: "Japan",
    value: "JP",
  },
  {
    label: "Jordan",
    value: "JO",
  },
  {
    label: "Kazakhstan",
    value: "KZ",
  },
  {
    label: "Kuwait",
    value: "KW",
  },
  {
    label: "Kyrgyzstan",
    value: "KG",
  },
  {
    label: "Lebanon",
    value: "LB",
  },
  {
    label: "Macao",
    value: "MO",
  },
  {
    label: "Malaysia",
    value: "MY",
  },
  {
    label: "Maldives",
    value: "MV",
  },
  {
    label: "Mongolia",
    value: "MN",
  },
  {
    label: "Myanmar",
    value: "MM",
  },
  {
    label: "Nepal",
    value: "NP",
  },
  {
    label: "Oman",
    value: "OM",
  },
  {
    label: "Pakistan",
    value: "PK",
  },
  {
    label: "Philippines",
    value: "PH",
  },
  {
    label: "Qatar",
    value: "QA",
  },
  {
    label: "Saudi Arabia",
    value: "SA",
  },
  {
    label: "Singapore",
    value: "SG",
  },
  {
    label: "Sri Lanka",
    value: "LK",
  },
  {
    label: "Tajikistan",
    value: "TJ",
  },
  {
    label: "Thailand",
    value: "TH",
  },
  {
    label: "Turkey",
    value: "TR",
  },
  {
    label: "Turkmenistan",
    value: "TM",
  },
  {
    label: "United Arab Emirates",
    value: "AE",
  },
  {
    label: "Uzbekistan",
    value: "UZ",
  },
  {
    label: "Yemen",
    value: "YE",
  },

  {
    label: "Albania",
    value: "AL",
  },
  {
    label: "Andorra",
    value: "AD",
  },
  {
    label: "Austria",
    value: "AT",
  },
  {
    label: "Belarus",
    value: "BY",
  },
  {
    label: "Belgium",
    value: "BE",
  },
  {
    label: "Bosnia and Herzegovina",
    value: "BA",
  },
  {
    label: "Bulgaria",
    value: "BG",
  },
  {
    label: "Croatia",
    value: "HR",
  },
  {
    label: "Czech Republic",
    value: "CZ",
  },
  {
    label: "Denmark",
    value: "DK",
  },
  {
    label: "Estonia",
    value: "EE",
  },
  {
    label: "Faroe Islands",
    value: "FO",
  },
  {
    label: "Finland",
    value: "FI",
  },
  {
    label: "France",
    value: "FR",
  },
  {
    label: "Germany",
    value: "DE",
  },
  {
    label: "Gibraltar",
    value: "GI",
  },
  {
    label: "Greece",
    value: "GR",
  },
  {
    label: "Holy See (Vatican City State)",
    value: "VA",
  },
  {
    label: "Hungary",
    value: "HU",
  },
  {
    label: "Iceland",
    value: "IS",
  },
  {
    label: "Ireland",
    value: "IE",
  },
  {
    label: "Italy",
    value: "IT",
  },
  {
    label: "Latvia",
    value: "LV",
  },
  {
    label: "Liechtenstein",
    value: "LI",
  },
  {
    label: "Lithuania",
    value: "LT",
  },
  {
    label: "Luxembourg",
    value: "LU",
  },
  {
    label: "Malta",
    value: "MT",
  },
  {
    label: "Monaco",
    value: "MC",
  },
  {
    label: "Montenegro",
    value: "ME",
  },
  {
    label: "Netherlands",
    value: "NL",
  },
  {
    label: "Norway",
    value: "NO",
  },
  {
    label: "Poland",
    value: "PL",
  },
  {
    label: "Portugal",
    value: "PT",
  },
  {
    label: "Romania",
    value: "RO",
  },
  {
    label: "Russian Federation",
    value: "RU",
  },
  {
    label: "San Marino",
    value: "SM",
  },
  {
    label: "Serbia",
    value: "RS",
  },
  {
    label: "Slovakia",
    value: "SK",
  },
  {
    label: "Slovenia",
    value: "SI",
  },
  {
    label: "Spain",
    value: "ES",
  },
  {
    label: "Svalbard and Jan Mayen",
    value: "SJ",
  },
  {
    label: "Sweden",
    value: "SE",
  },
  {
    label: "Switzerland",
    value: "CH",
  },
  {
    label: "Ukraine",
    value: "UA",
  },
  {
    label: "United Kingdom",
    value: "GB",
  },
  {
    label: "Algeria",
    value: "DZ",
  },
  {
    label: "Angola",
    value: "AO",
  },
  {
    label: "Benin",
    value: "BJ",
  },
  {
    label: "Botswana",
    value: "BW",
  },
  {
    label: "British Indian Ocean Territory",
    value: "IO",
  },
  {
    label: "Burkina Faso",
    value: "BF",
  },
  {
    label: "Burundi",
    value: "BI",
  },
  {
    label: "Cameroon",
    value: "CM",
  },
  {
    label: "Cape Verde",
    value: "CV",
  },
  {
    label: "Central African Republic",
    value: "CF",
  },
  {
    label: "Chad",
    value: "TD",
  },
  {
    label: "Comoros",
    value: "KM",
  },
  {
    label: "Congo",
    value: "CG",
  },
  {
    label: "Djibouti",
    value: "DJ",
  },
  {
    label: "Egypt",
    value: "EG",
  },
  {
    label: "Equatorial Guinea",
    value: "GQ",
  },
  {
    label: "Eritrea",
    value: "ER",
  },
  {
    label: "Ethiopia",
    value: "ET",
  },
  {
    label: "Gabon",
    value: "GA",
  },
  {
    label: "Gambia",
    value: "GM",
  },
  {
    label: "Ghana",
    value: "GH",
  },
  {
    label: "Guinea",
    value: "GN",
  },
  {
    label: "Guinea-Bissau",
    value: "GW",
  },
  {
    label: "Kenya",
    value: "KE",
  },
  {
    label: "Lesotho",
    value: "LS",
  },
  {
    label: "Liberia",
    value: "LR",
  },
  {
    label: "Libyan Arab Jamahiriya",
    value: "LY",
  },
  {
    label: "Madagascar",
    value: "MG",
  },
  {
    label: "Malawi",
    value: "MW",
  },
  {
    label: "Mali",
    value: "ML",
  },
  {
    label: "Mauritania",
    value: "MR",
  },
  {
    label: "Mauritius",
    value: "MU",
  },
  {
    label: "Mayotte",
    value: "YT",
  },
  {
    label: "Morocco",
    value: "MA",
  },
  {
    label: "Mozambique",
    value: "MZ",
  },
  {
    label: "Namibia",
    value: "NA",
  },
  {
    label: "Niger",
    value: "NE",
  },
  {
    label: "Nigeria",
    value: "NG",
  },
  {
    label: "Reunion",
    value: "RE",
  },
  {
    label: "Rwanda",
    value: "RW",
  },
  {
    label: "Saint Helena",
    value: "SH",
  },
  {
    label: "Sao Tome and Principe",
    value: "ST",
  },
  {
    label: "Senegal",
    value: "SN",
  },
  {
    label: "Seychelles",
    value: "SC",
  },
  {
    label: "Sierra Leone",
    value: "SL",
  },
  {
    label: "Somalia",
    value: "SO",
  },
  {
    label: "South Africa",
    value: "ZA",
  },
  {
    label: "South Sudan",
    value: "SS",
  },
  {
    label: "Sudan",
    value: "SD",
  },
  {
    label: "Swaziland",
    value: "SZ",
  },
  {
    label: "Togo",
    value: "TG",
  },
  {
    label: "Tunisia",
    value: "TN",
  },
  {
    label: "Uganda",
    value: "UG",
  },
  {
    label: "Western Sahara",
    value: "EH",
  },
  {
    label: "Zambia",
    value: "ZM",
  },
  {
    label: "Zimbabwe",
    value: "ZW",
  },

  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Australia",
    value: "AU",
  },
  {
    label: "Christmas Island",
    value: "CX",
  },
  {
    label: "Cocos (Keeling) Islands",
    value: "CC",
  },
  {
    label: "Cook Islands",
    value: "CK",
  },
  {
    label: "French Polynesia",
    value: "PF",
  },
  {
    label: "Guam",
    value: "GU",
  },
  {
    label: "Kiribati",
    value: "KI",
  },
  {
    label: "Marshall Islands",
    value: "MH",
  },
  {
    label: "Micronesia, Federated States of",
    value: "FM",
  },
  {
    label: "Nauru",
    value: "NR",
  },
  {
    label: "New Caledonia",
    value: "NC",
  },
  {
    label: "New Zealand",
    value: "NZ",
  },
  {
    label: "Niue",
    value: "NU",
  },
  {
    label: "Norfolk Island",
    value: "NF",
  },
  {
    label: "Northern Mariana Islands",
    value: "MP",
  },
  {
    label: "Palau",
    value: "PW",
  },
  {
    label: "Papua New Guinea",
    value: "PG",
  },
  {
    label: "Pitcairn",
    value: "PN",
  },
  {
    label: "Samoa",
    value: "WS",
  },
  {
    label: "Solomon Islands",
    value: "SB",
  },
  {
    label: "Tokelau",
    value: "TK",
  },
  {
    label: "Tonga",
    value: "TO",
  },
  {
    label: "Tuvalu",
    value: "TV",
  },
  {
    label: "United States Minor Outlying Islands",
    value: "UM",
  },
  {
    label: "Vanuatu",
    value: "VU",
  },
  {
    label: "Wallis and Futuna",
    value: "WF",
  },
  {
    label: "Anguilla",
    value: "AI",
  },
  {
    label: "Antigua and Barbuda",
    value: "AG",
  },
  {
    label: "Aruba",
    value: "AW",
  },
  {
    label: "Bahamas",
    value: "BS",
  },
  {
    label: "Barbados",
    value: "BB",
  },
  {
    label: "Belize",
    value: "BZ",
  },
  {
    label: "Bermuda",
    value: "BM",
  },
  {
    label: "Canada",
    value: "CA",
  },
  {
    label: "Cayman Islands",
    value: "KY",
  },
  {
    label: "Costa Rica",
    value: "CR",
  },
  {
    label: "Cuba",
    value: "CU",
  },
  {
    label: "Dominica",
    value: "DM",
  },
  {
    label: "Dominican Republic",
    value: "DO",
  },
  {
    label: "El Salvador",
    value: "SV",
  },
  {
    label: "Greenland",
    value: "GL",
  },
  {
    label: "Grenada",
    value: "GD",
  },
  {
    label: "Guadeloupe",
    value: "GP",
  },
  {
    label: "Guatemala",
    value: "GT",
  },
  {
    label: "Haiti",
    value: "HT",
  },
  {
    label: "Honduras",
    value: "HN",
  },
  {
    label: "Jamaica",
    value: "JM",
  },
  {
    label: "Martinique",
    value: "MQ",
  },
  {
    label: "Mexico",
    value: "MX",
  },
  {
    label: "Montserrat",
    value: "MS",
  },
  {
    label: "Netherlands Antilles",
    value: "AN",
  },
  {
    label: "Nicaragua",
    value: "NI",
  },
  {
    label: "Panama",
    value: "PA",
  },
  {
    label: "Puerto Rico",
    value: "PR",
  },
  {
    label: "Saint Kitts and Nevis",
    value: "KN",
  },
  {
    label: "Saint Lucia",
    value: "LC",
  },
  {
    label: "Saint Pierre and Miquelon",
    value: "PM",
  },
  {
    label: "Saint Vincent and the Grenadines",
    value: "VC",
  },
  {
    label: "Trinidad and Tobago",
    value: "TT",
  },
  {
    label: "Turks and Caicos Islands",
    value: "TC",
  },
  {
    label: "United States",
    value: "US",
  },
  {
    label: "Virgin Islands, British",
    value: "VG",
  },
  {
    label: "Antarctica",
    value: "AQ",
  },
  {
    label: "Bouvet Island",
    value: "BV",
  },
  {
    label: "South Georgia and the South Sandwich Islands",
    value: "GS",
  },
  {
    label: "Argentina",
    value: "AR",
  },
  {
    label: "Bolivia",
    value: "BO",
  },
  {
    label: "Brazil",
    value: "BR",
  },
  {
    label: "Chile",
    value: "CL",
  },
  {
    label: "Colombia",
    value: "CO",
  },
  {
    label: "Ecuador",
    value: "EC",
  },
  {
    label: "French Guiana",
    value: "GF",
  },
  {
    label: "Guyana",
    value: "GY",
  },
  {
    label: "Paraguay",
    value: "PY",
  },
  {
    label: "Peru",
    value: "PE",
  },
  {
    label: "Suriname",
    value: "SR",
  },
  {
    label: "Uruguay",
    value: "UY",
  },
  {
    label: "Venezuela",
    value: "VE",
  },
];

const wonderOptions = [
  { label: "Great Wall of China", value: "great-wall-of-china" },
  { label: "Petra, Jordan", value: "petra-jordan" },
  { label: "Christ the Redeemer, Brazil", value: "christ-the-redeemer-brazil" },
  { label: "Machu Picchu, Peru", value: "machu-picchu-peru" },
  { label: "Chichen Itza, Mexico ", value: "chichen-itza-mexico" },
  { label: "Roman Colosseum, Italy ", value: "roman-colosseum-italy" },
  { label: "Taj Mahal, India ", value: "taj-mahal-india" },
];

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

const EditProfile = () => {
  const [values, setValues] = useState<{
    image: File | string;
    username: string;
    email: string;
  }>({
    username: "",
    email: "",
    image: "",
  });
  const [isErrored, setIsErrored] = useState<{
    username?: string;
    image?: string;
    email?: string;
  }>({});
  const [profile, setProfile] = useState<any>({});
  const [isMainLoading, setIsMainLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [tabOption, setTabOption] = useState("profile");

  const [name, setName] = useState("");
  const [voyageStyle, setVoyageStyle] = useState([""]);
  const [country, setCountry] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [visitedWonders, setVisitedWonders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errordetial, seterrordetial] = useState("");
  const [bio, setBio] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files?.[0] && setValues({ ...values, image: e.target.files[0] });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateLoading(true);
    let replaceText = values?.username?.trim().replace(/\s+/g, "_");
    const values1 = { ...values, username: replaceText };
    try {
      if (typeof values?.image === "string") {
        let data = await api.patch("/users", values1);
        if (data?.data?.error?.message) {
          seterrordetial(data?.data?.error?.message);
        } else {
          window.location.href = process.env.PUBLIC_URL;
        }
      } else {
        const formData = new FormData();
        Object.entries(values1).forEach(([key, value]) => {
          formData.append(key, value);
        });
        let data = await api.patch("/users", formData);
        if (data?.data?.error?.message) {
          seterrordetial(data?.data?.error?.message);
        } else {
          window.location.href = process.env.PUBLIC_URL;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      {
        setIsMainLoading(true);
        try {
          let user = (await api("/users/get-profile")) as {
            data: {
              user: {
                boughtItineraries: any[];
                _id: string;
                email: string;
                username: string;
                __v: number;
                role: string;
                image: string;
                userInfo: {
                  name: string;
                  voyageStyle: [string];
                  country: string;
                  visitedCountries: [];
                  visitedWonders: [];
                  bio: string;
                };
              };
            };
          };

          let { email, username, image, userInfo } = user.data.user;

          setProfile(user.data);
          setValues({ email, username, image });

          //
          setName(userInfo?.name);
          setVoyageStyle(userInfo?.voyageStyle);
          setCountry(userInfo?.country);
          setVisitedCountries(userInfo?.visitedCountries);
          setVisitedWonders(userInfo?.visitedWonders);
          setBio(userInfo?.bio);
        } catch (error) {
          console.log(error);
        } finally {
          setIsMainLoading(false);
        }
      }
    })();
  }, []);

  // handle visited countries
  const handleVoyageStyle = (event: any) => {
    const value = event.target.value;

    if (voyageStyle.includes(value) === false) {
      setVoyageStyle((prev) => [...prev, value]);
    } else {
      setVoyageStyle(voyageStyle.filter((item) => item !== value));
    }
  };

  // setting up profile
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    const allVoyageStyles = voyageStyle.filter((item) => item !== "");

    const data = {
      name,
      voyageStyle: allVoyageStyles,
      country,
      visitedCountries,
      visitedWonders,
      bio,
    };

    try {
      await api.patch("/users", { userInfo: data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="profiletab">
        <button
          onClick={() => setTabOption("profile")}
          className={`${tabOption === "profile" ? "profiletab-active" : null}`}
          style={tabOption === "profile" ? { color: "white" } : { color: "black" }}
        >
          Profile
        </button>
        <button
          onClick={() => setTabOption("userInfo")}
          className={`${tabOption === "userInfo" ? "profiletab-active" : null}`}
          style={tabOption === "userInfo" ? { color: "white" } : { color: "black" }}
        >
          User Info
        </button>
      </div>
      {tabOption === "profile" ? (
        <div className="main-profile">
          <h3>Edit Profile</h3>

          {isMainLoading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={handleSubmit}>
              {values.image ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={
                      typeof values.image === "string"
                        ? values.image
                        : URL.createObjectURL(values.image)
                    }
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "360px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    alt="Thumbnail"
                  />
                </div>
              ) : (
                <img src={dp} alt="DP" className="dp" />
              )}

              <div>
                <input
                  id="image"
                  onChange={handleChangeImage}
                  type="file"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="image"
                  className="btn btn-orange btn-upload"
                  style={{ textDecoration: "none" }}
                >
                  Upload Image
                </label>
              </div>
              <div style={{ marginTop: "20px" }}>
                <label className="control-label" htmlFor="title">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9 _]+"
                  title="Only characters and numbers are allowed"
                  name="username"
                />

                <p
                  style={{
                    display: isErrored?.username ? "block" : "none",
                    color: isErrored?.username ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {isErrored?.username}
                </p>
              </div>
              <div style={{ marginTop: "20px" }}>
                <label className="control-label" htmlFor="title">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                />

                <p
                  style={{
                    display: isErrored?.email ? "block" : "none",
                    color: isErrored?.email ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {isErrored?.email}
                </p>
              </div>
              {errordetial && (
                <p style={{ textAlign: "center", color: "red", margin: "7px" }}>{errordetial}</p>
              )}

              <button
                disabled={isUpdateLoading}
                type="submit"
                className="btn btn-orange navbar-btn"
              >
                {isUpdateLoading ? <CircularProgress /> : "Save"}
              </button>
            </form>
          )}
        </div>
      ) : (
        tabOption === "userInfo" && (
          <div className="profilesetup">
            <h3>Tell us about yourself</h3>

            <div className="profilesetup-subheading">
              <p>
                Answer a few quick questions to help us to ensure you have a great seller experience
              </p>
            </div>

            <div className="profilesetup-form">
              <div className="profilesetup-form--name">
                <label htmlFor="">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="profilesetup-form--voyagestyle">
                <p>Voyage Style</p>

                <div className="profilesetup-options">
                  {voyageStyles.map(({ label, value }, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={value}
                        value={value}
                        checked={voyageStyle.includes(value) === true ? true : false}
                        onChange={handleVoyageStyle}
                      />
                      <label htmlFor={value}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profilesetup-form--country">
                <label htmlFor="">Home location</label>
                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option>Select country</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Aland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, Democratic Republic of the Congo</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Cote D'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curacao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and Mcdonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea, Democratic People's Republic of</option>
                  <option value="KR">Korea, Republic of</option>
                  <option value="XK">Kosovo</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libyan Arab Jamahiriya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="AN">Netherlands Antilles</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Reunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthelemy</option>
                  <option value="SH">Saint Helena</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="CS">Serbia and Montenegro</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia and the South Sandwich Islands</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.s.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
              </div>

              <div className="profilesetup-form--visited">
                <label htmlFor="">How many countries visited</label>
                <MultiSelect
                  options={options}
                  value={visitedCountries}
                  onChange={setVisitedCountries}
                  labelledBy="Select"
                />
              </div>

              <div className="profilesetup-form--wonders">
                <label htmlFor="">World wonders visited</label>
                <MultiSelect
                  options={wonderOptions}
                  value={visitedWonders}
                  onChange={setVisitedWonders}
                  labelledBy="Select"
                />
              </div>

              <div className="profilesetup-form--bio">
                <label htmlFor="">About me</label>
                <textarea
                  name=""
                  id=""
                  cols={20}
                  rows={5}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>

              <div className="profilesetup-form--submit">
                <button onClick={handleUpdateProfile}>
                  {isLoading ? <CircularProgress /> : "Save"}
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default EditProfile;
