import NavBar from "../NavBar";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import ErrorPage from "./ErrorPage";

const AccountPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { logout } = useContext(AuthContext);

  const UserInfomation = (props) => {
    return (
      <section className="h-screen bg-gray-100/50 m-4">
        <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 border-t-2 border-blue-400 rounded-lg bg-gray-100/5 ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-blue-500 text-4xl">My account</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">
                Account: <span className="text-xl">{userData.UserType}</span>
              </h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className="relative ">
                  <input
                    type="text"
                    id="user-info-email"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder={userData.Email}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className=" relative ">
                    <input
                      type="text"
                      id="user-info-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={userData.LastName}
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <input
                      type="text"
                      id="user-info-first-name"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder={userData.FirstName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-4/12">Change password</h2>
              <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-password"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="text-center md:w-3/12 md:pl-6">
                <button
                  type="button"
                  className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Change
                </button>
              </div>
            </div>
            <hr />
            <div className="w-full flex md:flex-col px-4 pb-4 ml-auto text-gray-500 md:w-1/2">
              <button
                type="submit"
                className="py-2 px-4  btn-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Save
              </button>
              {props.children}
            </div>
          </div>
        </form>
      </section>
    );
  };

  const storedToken = localStorage.getItem("token");
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    async function fetchAllFiles() {
      await fetch('/customer/files', 
      {
        method: "GET", 
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setAllFiles(data);
      })
    }
    fetchAllFiles();
  }, []);

  const handleClick = async (event) => {
    //get an identifier to know which file have been clicked
    console.log(event.target.value);
    const fileType = event.target.value;
    
    //get the corresponding file on the server
    const response = await fetch(`/customer/download/${fileType}`, 
    {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    });

    if (response.ok) {
      // Get the file name from the response headers
      const dispositionHeader = response.headers.get('Content-Disposition');
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const [, fileName] = fileNameRegex.exec(dispositionHeader);
  
      // Create a blob from the response data
      const blob = await response.blob();
  
      // Create a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
  
      // Trigger the download by programmatically clicking the link
      downloadLink.click();
  
      // Clean up the temporary download link
      URL.revokeObjectURL(downloadLink.href);
      downloadLink.remove();
    } else {
      // Handle error response
      console.error('Failed to download the file');
    }
  }

  const getFileLabel = (fileType) => {
    switch(fileType) {
      case 'avisImpots1':
        return "Avis d'imposition 1";
      case 'avisImpot2':
        return "Avis d'imposition 2";
      case 'justifIdentite': 
        return "Justificatif d'identité";
      case 'bulletinSalaire1':
        return "Bulletin de salaire 1";
      case 'bulletinSalaire2':
        return "Bulletin de salaire 2";
      case 'bulletinSalaire3':
        return "Bulletin de salaire 3";
      case 'releveBancaire1':
        return "Relevé de compte en banque 1";
      case 'releveBancaire2':
        return "Relevé de compte en banque 2";
      case 'releveBancaire3':
        return "relevé de compte en banque 3";
      case 'justifDomicile':
        return "Justificatif de domicile";
      case 'justifApportPersonnel':
        return "Justificatif de l'apport personnel";
      case 'compromisVente':
        return "Compromis de vente";
      case 'titreRetraite':
        return "Titre de retraite ou de pension";
      case 'attestationCAF':
        return "Attestation de la CAF";
      case 'attestationRevenusFonciers':
        return "Attestation de revenus fonciers";
      case 'justifSituationFamiliale':
        return "Justificatif de situation familiale";
      case 'contratTravail':
        return "Contrat de travail";
      case 'contratPret':
        return "Contrat de prêt";
      case 'avenantPret':
        return "Avenant de prêt";
      case 'tableauAmortissement':
        return "Tableau d'amortissement";
    }
  }

  return userData.UserType === "customer" ? (
    <div>
      <NavBar />
      <UserInfomation>
        <button
          onClick={logout}
          className="py-2 px-4 btn-primary hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Logout
        </button>
      </UserInfomation>
      <h3>My Account</h3>
          {allFiles.map((file, index) => (
            <div>
              <p>{file.Title}</p>
              <button key={index} value={file.File_type} onClick={handleClick}>
                {getFileLabel(file.File_type)}
              </button>
            </div>
          ))}
          <br/>
      <button className="btn-primary" onClick={logout}>deco</button>
    </div>
  ) : (
    /* Sinon */
    null
  );
};

export default AccountPage;
