import React from "react";
import { Link } from "react-router";

export default function NavLarge() {
  const navBarData = [
    {
      title: "Home",
      path: "/",
      icon: "house.svg",
    },
  ];
  return (
    <main className="hidden lg:block">
      <div className="float-right">
        <ul>
          {navBarData.map((item, index) => (
            <li className="flex" key={index}>
              <Link className="flex gap-[20px]" to={item.path}>
                <img src={item.icon} alt="" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
