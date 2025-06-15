import React from "react";
import { useState } from "react";

export default function Dropdown() {
  let [selected, isSelected] = useState(false);

  return (
    <main className="lg:flex gap-[40px] lg:p-[10px]">
      <div className="w-full">
        <label
          htmlFor="category"
          className="bg-gray-400 flex items-center cursor-pointer p-[8px] border rounded-[4px] w-full"
          onClick={() => isSelected((prev) => !prev)}
        >
          <input
            type="radio"
            name="dropdown-category"
            style={{ marginRight: "8px" }}
            checked={selected}
            readOnly
          />
          <span className="flex-1">category</span>
          <img
            className="w-[16px] h-[16px] ml-[8px]"
            src="/chevron-down.svg"
            alt="Chevron Down"
          />
        </label>
        {selected && (
          <div>
            <label
              htmlFor="selection"
              className="cursor-pointer w-full bg-gray-700 p-[8px] flex"
            >
              <input className="mr-[8px]" type="radio" name="select-one" />
              <span className="flex-1">Public</span>
            </label>

            <label className="cursor-pointer w-full bg-gray-700 p-[8px] flex">
              <input className="mr-[8px]" type="radio" name="select-one" />
              <span className="flex-1">Private</span>
            </label>

            <label className="cursor-pointer w-full bg-gray-700 p-[8px] flex">
              <input className="mr-[8px]" type="radio" name="select-one" />
              <span className="flex-1">International</span>
            </label>
          </div>
        )}
      </div>
      <div className="w-full">
        <label
          htmlFor="system"
          className="bg-gray-400 flex items-center cursor-pointer p-[8px] border rounded-[4px] w-full"
          onClick={() => isSelected((prev) => !prev)}
        >
          <input
            type="radio"
            name="dropdown-category"
            style={{ marginRight: "8px" }}
            checked={selected}
            readOnly
          />
          <span className="flex-1">System</span>
          <img
            className="w-[16px] h-[16px] ml-[8px]"
            src="/chevron-down.svg"
            alt="Chevron Down"
          />
        </label>
        {selected && (
          <div>
            <label className="cursor-pointer w-full bg-gray-700 p-[8px] flex">
              <input className="mr-[8px]" type="radio" name="only-one" />
              <span className="flex-1">8-4-4</span>
            </label>

            <label className="cursor-pointer w-full bg-gray-700 p-[8px] flex">
              <input className="mr-[8px]" type="radio" name="only-one" />
              <span className="flex-1">2-6-3-3-3</span>
            </label>

            <label className="cursor-pointer w-full bg-gray-700 p-[8px] flex">
              <input className="mr-[8px]" type="radio" name="only-one" />
              <span className="flex-1">IGCSE</span>
            </label>
          </div>
        )}
      </div>
    </main>
  );
}
