import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuPage from "../layout/MenuPage";

import Title from "../components/Title";
import InputField from "../components/InputField";
import Button from "../components/Button";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    registerEmail: "",
    rawPassword: "",
    hasSignedTC: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
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

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        values.rawPassword
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex flex-1 justify-center items-center p-2"
      >
        <Box className="flex flex-col w-auto backdrop-blur-sm bg-transparent border-2 border-white p-7 rounded-md text-white">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Our Privacy Policy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="pb-5">
              <li>Introduction to Business</li>
              <li>Business Contract Details</li>
              <li>Effective Date</li>
              <li>Governing Law</li>
              <li>Limitation of Liability and Warranty Disclaimers</li>
              <li>Rules of Conduct</li>
              <li>Intellectual Property Rights</li>
              <li>User Restrictions</li>
              <li>Right to Termination</li>
            </div>
            I've read the company's terms and conditions and am prepared to sign
            up.
          </Typography>
        </Box>
      </Modal>
      <div className="flex flex-1 flex-col">
        <div className="pt-14 flex flex-col">
          <Title innerText="Sign Up" />
          <p className="text-slate-400">Sign up to continue</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center pt-12">
          <div className="flex flex-col gap-12 justify-center items-center">
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              onChange={handleChange}
              required
            />
            <div className="flex flex-col gap-2">
              <InputField
                label="Email"
                name="email"
                onChange={handleEmailChange}
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
                  name="rawPassword"
                  onChange={handleChange}
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
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={values.hasSignedTC}
                name="hasSignedTC"
                onChange={handleChange}
              />
              <label className="flex gap-1 flex-wrap text-[12px] 2xl:text-[16px] xl:text-[16px]">
                By signing in, you agree to the{" "}
                <div
                  className="underline cursor-pointer"
                  onClick={handleOpenModal}
                >
                  Terms & Conditions
                </div>
                .
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-6 gap-2">
            <p className="text-[12px] text-white">{errorMessage}</p>
            <Button
              innerText="Sign Up"
              handleClick={handleSubmission}
              handleDisabled={!values.hasSignedTC}
            />
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
