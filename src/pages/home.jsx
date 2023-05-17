import React from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Button from "../components/Button";
import SignUpButton from "../components/SignUpButton";

// Asset
import BrandLogo from "../assets/images/icon.png";

const Home = (props) => {
  // Home component with props as argument
  return (
    <main className="bg-brand font-inter h-screen w-screen inset-0 text-white flex flex-col overflow-y-scroll overflow-x-hidden justify-center items-center">
      <div className="bg-brand font-inter py-6 px-6 2xl:px-[600px] xl:px-[400px] lg:px-[300px] flex flex-col justify-center items-center">
        <div className="flex flex-col flex-1 justify-center items-center">
          <Title innerText="FOR DEVS" />
          <div className="flex justify-center items-center">
            <img className="w-1/3 m-2 pt-8" src={BrandLogo} />
          </div>
          <div className="flex flex-col flex-1 gap-4 justify-center items-center">
            <SubTitle innerText="Thanks for viewing!" />
            <div className="text-center">
              {props.name ? (
                <p>My name is {props.name} & currently testing this app</p>
              ) : (
                <p>
                  This is an Open Source project, built using React + Vite
                  integrated with Firebase services for developers to use as a
                  boilerplate for their next project!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 pt-14">
          <Link to={`/signin`}>
            <Button innerText="Login" />
          </Link>
          <Link to={`/signup`}>
            <SignUpButton innerText="Sign Up" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
