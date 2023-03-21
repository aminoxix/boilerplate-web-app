import React, { useState } from "react";
import Title from "../components/Title";
import { v4 } from "uuid";
import MenuPage from "../layout/MenuPage";


const Notification = () => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    id: v4,
  });

  const [count, setCount] = useState(0);

  return (
    <MenuPage className="relative flex flex-1 flex-col">
      <div className="flex flex-col pt-14">
        <Title innerText="Notification" />
        <p className="text-slate-400">
          Click on the button and it’ll show a notification
        </p>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <button
          className="flex justify-center items-center w-60 h-20 rounded-lg bg-accent font-bold text-white text-4xl cursor-pointer"
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
            setToast({
              show: true,
              message: `Notification ${count + 1}`,
              id: v4(),
            });
          }}
        >
          Notify Me!
        </button>
      </div>
      <div className="flex justify-center items-center">
        {toast.show &&
          (setTimeout(() => {
            setToast({
              show: false,
              message: "",
              id: v4(),
            });
          }, 6000),
          (
            <div
              className="flex justify-center items-center h-16 w-80 rounded-xl bg-accent backdrop-blur-sm text-white"
              key={toast.id}
            >
              <button
                className="absolute top-0 right-2 pointer-events-auto"
                onClick={() => {
                  setToast((prevToastState) => ({
                    ...prevToastState,
                    show: false,
                  }));
                }}
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
