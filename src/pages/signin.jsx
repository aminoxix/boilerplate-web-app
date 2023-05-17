import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuPage from "../layout/MenuPage";

import Title from "../components/Title";
import InputField from "../components/InputField";
import Button from "../components/Button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const SignIn = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    registerEmail: "",
    registerPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function to handle & validate form submission
  const handleSubmission = () => {
    if (values.registerEmail === "" || values.registerPassword === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    setErrorMessage("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(
      auth,
      values.registerEmail,
      values.registerPassword
    )
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        setSubmitButtonDisabled(false);
        setErrorMessage(error.message);
        console.log(error);
      });
  };

  return (
    <MenuPage>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col pt-14">
          <Title innerText="Sign in" />
          <p className="text-slate-400">Sign in to continue</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="flex flex-col gap-12 justify-center items-center">
            <InputField
              label="Email"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  registerEmail: event.target.value,
                }))
              }
              required
            />
            <div className="flex flex-col gap-1">
              <div className="flex relative">
                <InputField
                  label="Password"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      registerPassword: event.target.value,
                    }))
                  }
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
              <Link>
                <p className="underline text-[12px]">Forgot Password?</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-[49.74px] gap-2">
            <p className="text-[12px] text-red-500">{errorMessage}</p>
            <Button
              innerText="Login"
              handleClick={handleSubmission}
              handleDisabled={submitButtonDisabled}
            />
            <p className="text-[12px]">
              Don't have an account?{" "}
              <Link to={`/signup`} className="underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MenuPage>
  );
};

export default SignIn;
