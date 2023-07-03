import NavBar from "../NavBar";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import ErrorPage from "./ErrorPage";

const AccountPage = () => {
  const { userData } = useContext(UserContext);
  const storedToken = localStorage.getItem("token");
  const { logout } = useContext(AuthContext);
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
    <ErrorPage />
  );
};

export default AccountPage;
