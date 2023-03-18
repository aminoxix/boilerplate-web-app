import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import UploadImage from "./pages/gallery";
import Dashboard from "./pages/dashboard";
import Calculator from "./pages/calculator";

import { auth } from "./firebase/firebase-config";
import { useAtom } from "jotai";
import { userAtom } from "./global/state";
import Notes from "./pages/notes";
import Notification from "./pages/notification";

function App() {
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home name={user} />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="/calculator" element={<Calculator />}></Route>
          <Route path="/gallery" element={<UploadImage name={user} />}></Route>
          <Route path="/notes" element={<Notes />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
