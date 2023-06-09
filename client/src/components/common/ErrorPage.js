import React from "react"
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  
  
  const returnHome = () => {
    navigate("/", { replace: true });
  };
  

  return (
    
<div id="notfound" className="h-screen flex justify-center items-center">
  <div className="text-center">
    <h1 className="font-montserrat font-bold text-7xl mb-8">Oops!</h1>
    <h2 className="font-montserrat font-bold text-3xl uppercase text-black mb-8">404 - Page not found</h2>
    <p className="font-montserrat text-base font-normal text-black mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    <button onClick={returnHome} href="#" className="font-montserrat text-base text-white font-bold uppercase bg-blue-500 inline-block py-4 px-8 rounded-3xl shadow-box">retour</button>

  </div>
</div>


  );
};

export default ErrorPage;
