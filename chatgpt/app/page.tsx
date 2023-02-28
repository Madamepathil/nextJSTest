import React from "react";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

export default function page() {
  return (
    <div className=" flex flex-col items-center justify-center text-white h-screen px-2">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className=" flex space-x-2 ">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <SunIcon className="h-6 w-6 text-blue-400 hover:animate-pulse" />
            <h2 className="">examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <BoltIcon className="h-6 w-6 text-blue-400 hover:animate-pulse" />
            <h2 className="">Capabilites</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <ExclamationTriangleIcon className="h-6 w-6 text-blue-400 hover:animate-pulse" />
            <h2 className="">Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
            <p className="infoText">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempora?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
