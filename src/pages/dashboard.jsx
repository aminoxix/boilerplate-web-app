import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../global/state";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";
import { auth } from "../firebase/firebase-config";
import MenuPage from "../layout/MenuPage";


const Dashboard = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser("");
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
        <SubTitle innerText={`Hey ${user}!`} />
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
