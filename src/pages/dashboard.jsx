import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../global/state";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import { auth } from "../firebase/firebase-config";
import MenuPage from "../layout/MenuPage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userDisplayName, setUserDisplayName] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and update the user state accordingly
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDisplayName(user.displayName);
      } else {
        // If not authenticated, navigate to signin page
        navigate("/signin");
        setUserDisplayName("");
      }
    });
  }, []);

  return (
    <MenuPage>
      <div className="flex flex-col">
        <div className="flex flex-col pt-14">
          <Title innerText="Dashboard" />
          <p className="text-slate-400">This is your dashboard</p>
        </div>
      </div>
      <div className="flex flex-col gap-9 text-center flex-1 justify-center items-center">
        <SubTitle innerText={`Hey ${userDisplayName}!`} />
        <div>Welcome to the dashboard!</div>
        <div className="text-slate-400">
          Now you can click on the hamburger menu on the top right corner for
          more features..
        </div>
      </div>
    </MenuPage>
  );
};

export default Dashboard;
