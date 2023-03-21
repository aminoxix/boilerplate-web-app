import React, { useState, useEffect } from "react";

import { useAtom } from "jotai";

import { Link } from "react-router-dom";

import { userAtom } from "../global/state";

import { auth } from "../firebase/firebase-config";

import Menu from "../components/Menu";

const MenuPage = (props) => {
  const [user, setUser] = useAtom(userAtom);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser("");
      }
    });
  }, []);

  function logoutUser() {
    auth
      .signOut()
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleNavbar() {
    setOpenNav((prevNavbar) => !prevNavbar);
  }

  // toggle navbar on pressing escape key
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setOpenNav(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="bg-brand font-inter h-screen w-screen inset-0 text-white flex flex-col ">
      <div className="bg-brand font-inter h-screen w-screen inset-0 py-6 px-6 2xl:px-[600px] xl:px-[400px] lg:px-[300px] text-white flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center">
          <Link to={`/`}>
            <p className="font-bold">For Developers</p>
          </Link>
          <div>
            {user ? (
              <p className="text-[12px] font-bold border p-1 m-1 rounded-md">
                {user} signed in successfully!
              </p>
            ) : null}
          </div>
          <div>
            <button className="text-4xl" onClick={toggleNavbar}>
              {openNav ? "×" : "="}
            </button>
          </div>
        </div>
        <div className="flex flex-1">
          {openNav ? (
            <div className="flex flex-1 justify-center">
              <div className="flex flex-col gap-10 justify-center items-center text-2xl font-bold">
                <Link to={`/notification`}>Notification</Link>
                <Link to={`/calculator`}>Calculator</Link>
                <Link to={`/gallery`}>Add Image</Link>
                <Link to={`/notes`}>Add Text</Link>
                {user ? (
                  <Link to="/" className="cursor-pointer" onClick={logoutUser}>
                    Logout
                  </Link>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col">{props.children}</div>
          )}
        </div>
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
};

export default MenuPage;
