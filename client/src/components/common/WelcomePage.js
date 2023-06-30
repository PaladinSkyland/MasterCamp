import React from 'react';
import { useNavigate } from 'react-router-dom';

import ComponentLogo from '../Logo';

const features = [
  {
    name: 'Easy to use',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: 'tes',
  },
  {
    name: 'Discuss with profesional',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: 'test',
  },
  {
    name: 'Easy form',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: 'test',
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: 'test',
  },
];

const SocialMediaLinks = [
  {
    name: 'LinkedIn',
    url: '#',
    icon: <p></p>,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/PaladinSkyland/MasterCamp',
    icon: <p></p>,
  },
  {
    name: 'Twitter',
    url: '#',
    icon: <p></p>,
  },
  {
    name: 'Facebook',
    url: '',
    icon: <p></p>,
  },
  {
    name: 'Instagram',
    url: '',
    icon: <p></p>,
  },
];

export const FeatureComponent = () => {
  return (
    <div className="py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-500">
            Obtain the best credit
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you want to obtain faster your credit
          </p>
          <p className="mt-6 text-lg leading-8">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className="mt-16 max-w-2xl mx-auto sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
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
  );
};

export const FooterComponent = () => {
  return (
    <footer className="bg-blue-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
          <div className="text-gray-500">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Accessibility</li>
              <li>Partners</li>
            </ul>
          </div>
          <div className="text-gray-500">
            <h3 className="text-lg font-semibold mb-2">Social Media</h3>
            <ul className="space-y-1">
              {SocialMediaLinks.map((link) => (
                <li>
                  <a key={link.name} href={link.url}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Credit Express, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

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
        <div className="flex flex-col items-center gap-3 rounded-md shadow-md bg-white m-20 p-10">
          <h1 className="text-6xl font-mono text-center text-black">
            Bienvenue sur Credit Express
          </h1>
          <button
            className="btn-primary"
            onClick={() => navigate('/authentification/login')}
          >
            Get Started
          </button>
        </div>
      </div>
      <FeatureComponent />
      <FooterComponent />
    </div>
  );
};

export default WelcomePage;
