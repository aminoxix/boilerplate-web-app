import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuPage from "../layout/MenuPage";

import Title from "../components/Title";
import InputField from "../components/InputField";
import Button from "../components/Button";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    registerEmail: "",
    registerPassword: "",
    rawPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const updateValue = (key, value) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleEmailChange = (email) => {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(pattern)) {
      setEmailFlag(true);
      setValues((prev) => ({
        ...prev,
        registerEmail: email,
      }));
    } else {
      setEmailFlag(false);
    }
  };

  const handleSubmission = () => {
    if (
      !values.fullName ||
      !values.registerEmail ||
      !emailFlag ||
      !/[A-Za-z0-9!@#$%^&*()_+]/.test(values.rawPassword) ||
      values.rawPassword.length <= 8
    ) {
      setErrorMessage("Please fill the details carefully");
    } else {
      setErrorMessage("");
      createUserWithEmailAndPassword(
        auth,
        values.registerEmail,
        values.rawPassword || values.registerPassword
      )
        .then(async (response) => {
          const user = response.user;
          await updateProfile(user, {
            displayName: values.fullName,
          });
          navigate("/dashboard");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.log(error);
        });
    }
  };

  return (
    <MenuPage>
      <div className="flex flex-1 flex-col">
        <div className="pt-14 flex flex-col">
          <Title innerText="Sign Up" />
          <p className="text-slate-400">Sign up to continue</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="flex flex-col gap-12 justify-center items-center">
            <InputField
              label="Full Name"
              type="text"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  fullName: event.target.value,
                }))
              }
              required
            />
            <div className="flex flex-col gap-2">
              <InputField
                label="Email"
                onChange={(event) => {
                  handleEmailChange(event.target.value);
                }}
                required
              />
              <p className="text-[12px] text-accent">
                {emailFlag ? "" : "* Please enter a valid email address"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex relative">
                <InputField
                  label="Password"
                  onChange={(event) => {
                    updateValue("rawPassword", event.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  required
                />
                <span
                  className="absolute top-10 right-3 material-symbols-outlined -ml-6 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? `visibility` : `visibility_off`}
                </span>
              </div>
              <div>
                <p
                  className={`text-[12px] ${
                    /[A-Z]/.test(values.rawPassword)
                      ? "text-lime-500"
                      : "text-accent"
                  }`}
                >
                  * Password must have a UpperCase Character
                </p>
                <p
                  className={`text-[12px] ${
                    /[a-z]/.test(values.rawPassword)
                      ? "text-lime-500"
                      : "text-accent"
                  }`}
                >
                  * Password must have a LowerCase Character
                </p>
                <p
                  className={`text-[12px] ${
                    /[0-9]/.test(values.rawPassword)
                      ? "text-lime-500"
                      : "text-accent"
                  }`}
                >
                  * Password must have a Numeric Character
                </p>
                <p
                  className={`text-[12px] ${
                    /[!@#$%^&*()_+]/.test(values.rawPassword)
                      ? "text-lime-500"
                      : "text-accent"
                  }`}
                >
                  * Password must have a Special Character
                </p>
                <p
                  className={`text-[12px] ${
                    values.rawPassword.length > 8
                      ? "text-lime-500"
                      : "text-accent"
                  }`}
                >
                  * Password length must be more than 8 Characters
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-6 gap-2">
            <p className="text-[12px] text-white">{errorMessage}</p>
            <Button innerText="Sign Up" handleClick={handleSubmission} />
            <p className="text-[12px]">
              Already have an account?{" "}
              <Link to={`/signin`} className="underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MenuPage>
  );
};

export default SignUp;
