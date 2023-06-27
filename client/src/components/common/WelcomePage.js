import React from "react";
import { useNavigate } from "react-router-dom";

import ComponentLogo from "../Logo";

const features = [
  {
    name: "Push to deploy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: "test",
  },
  {
    name: "SSL certificates",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: "test",
  },
  {
    name: "Simple queues",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: "test",
  },
  {
    name: "Advanced security",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: "test",
  },
];

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-x-4">
          <ComponentLogo />
        </div>
      </div>
      <div
        className="flex-grow flex items-center justify-center bg-cover bg-center h-1/2"
        style={{ backgroundImage: "url('../wallpaper.png')" }}
      >
        <div className="flex flex-col items-center gap-10 p-20 rounded-md shadow-md bg-white m-20">
          <h1 className="text-6xl font-mono text-center text-black">
            Bienvenue sur Credit Express
          </h1>
          <button
            className="btn-primary"
            onClick={() => navigate("/authentification/login")}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-500">
              Deploy faster
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to deploy your app
            </p>
            <p className="mt-6 text-lg leading-8">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          </div>
          <div className="mt-16 max-w-2xl mx-auto sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500"></div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
