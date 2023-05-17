import React, { useState } from "react";
import Title from "../components/Title";
import { v4 } from "uuid"; // Importing UUID generator
import MenuPage from "../layout/MenuPage";

const Notification = () => {
  const [toasts, setToasts] = useState([]); // State for storing multiple toasts

  const [count, setCount] = useState(0);

  const handleShowToast = () => {
    const newToast = {
      show: true,
      message: `Notification ${count + 1}`,
      id: v4(),
    };
    // Adding the new toast to the array
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setCount((prevCount) => prevCount + 1);
  };

  const handleCloseToast = (id) => {
    setToasts(
      // Removing the toast with the specified ID from the array
      (prevToasts) => prevToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <MenuPage className="relative flex flex-1 flex-col">
      <div className="flex flex-col pt-14">
        <Title innerText="Notification" />
        <p className="text-slate-400">
          Click on the button and it'll show a notification
        </p>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <button
          className="flex justify-center items-center m-5 w-60 h-20 rounded-lg bg-accent font-bold text-white text-4xl cursor-pointer"
          onClick={handleShowToast}
        >
          Notify Me!
        </button>
      </div>
      <div className="flex flex-wrap gap-1 justify-center items-center">
        {toasts.map((toast) => (
          <div
            className="flex justify-center items-center h-16 w-80 rounded-xl bg-accent backdrop-blur-sm text-white"
            key={toast.id}
          >
            <button
              className="absolute top-0 right-2 pointer-events-auto"
              onClick={() => handleCloseToast(toast.id)}
            >
              ✖
            </button>
            <div className="flex flex-col justify-center items-center">
              <b>{toast.message}</b>
              <span className="text-[10px]">{toast.id}</span>
            </div>
          </div>
        ))}
      </div>
    </MenuPage>
  );
};

export default Notification;
