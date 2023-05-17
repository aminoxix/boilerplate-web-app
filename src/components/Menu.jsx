import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const Menu = () => {
  // Get the current location using the useLocation hook from react-router-dom
  const location = useLocation();

  const MenuArray = [
    {
      id: v4(), // Generate a unique id for each menu item
      image: "calculate",
      title: "Calculator",
    },
    {
      id: v4(),
      image: "notifications",
      title: "Notification",
    },
    {
      id: v4(),
      image: "image",
      title: "Gallery",
    },
    {
      id: v4(),
      image: "description",
      title: "Notes",
    },
  ];

  return (
    <div className="flex flex-1">
      <div className="flex gap-14 bg-black w-full inset-0 h-16 justify-center 2xl:opacity-0 xl:opacity-0 lg:opacity-0 md:justify-around items-center">
        {/* Render each menu item */}
        {MenuArray.map((menu) => {
          return (
            <Link
              to={`/${menu.title.toLowerCase()}`}
              className="flex flex-col gap-[2px] justify-center items-center"
              key={menu.id}
            >
              <div
                className={`material-symbols-outlined text-3xl text-white ${
                  // Highlight the menu item if the current location matches its title
                  menu.title.toLowerCase() ==
                    location.pathname.slice(1).toLowerCase() &&
                  `material-symbols-filled-outlined`
                }`}
              >
                {menu.image}
              </div>
              <div className="text-[10px]">{menu.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
