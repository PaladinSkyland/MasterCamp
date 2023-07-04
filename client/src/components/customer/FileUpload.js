import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';

const FileUploadForm = () => {
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [allFiles, setAllFiles] = useState([]);
  const [refresh,setRefresh] = useState(false)
  const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
  const allowedExtensions = ['pdf', 'png', 'jpeg']; //allowed extensions

  const storedToken = localStorage.getItem("token");
  

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
  }, [refresh]);


  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectedOption(e.target.value);
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.log('File size exceeds the limit.');
        return;
      }

      const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);

      // Check the file extension
      if (!allowedExtensions.includes(fileExtension)) {
        console.log('Invalid file extension.');
        return;
      }

      //creating a FormData to send the data to the server
      const formData = new FormData();
      formData.append('fileType', selectedOption);
      formData.append('fileName', file.name);
      formData.append('file', file);

      //sending the data to the server
      try {
        const response = await fetch('/customer/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
          body: formData,
        });
        setRefresh(!refresh)
      } 
      catch (error) {
        console.error(error);
      }
    }
  };

  const getFileLabel = (fileType) => {
    switch(fileType) {
      case 'avisImpot1':
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

  const handleClick = async (event) => {
    //get an identifier to know which file have been clicked
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
      //get the file name from the response headers
      const dispositionHeader = response.headers.get('Content-Disposition');
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const [, fileName] = fileNameRegex.exec(dispositionHeader);
  
      //create a blob from the response data
      const blob = await response.blob();
  
      //create a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
  
      //trigger the download by programmatically clicking the link
      downloadLink.click();
  
      //clean up the temporary download link
      URL.revokeObjectURL(downloadLink.href);
      downloadLink.remove();
    } else {
      //handle error response
      console.error('Failed to download the file');
    }
  }

  return (
    <div>
      <NavBar/>
      <form 
        onSubmit={handleUpload}
      >
        <div className='flex flex-col justify-center gap-2 w-2/3 m-auto my-12 shadow-md p-5 bg-white'>
        <label className='font-medium'>Choisissez un type de fichier : </label>
        
        <select className="p-2 bg-blue-100" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Aucun type de fichier</option>
          <option value="avisImpot1">1er avis d'imposition</option>
          <option value="avisImpot2">2ème avis d'imposition</option>
          <option value="justifIdentite">Justificatif d'identité</option>
          <option value="bulletinsalaire1">1er bulletin de salaire (ou bilan comptable)</option>
          <option value="bulletinsalaire2">2ème bulletin de salaire (ou bilan comptable)</option>
          <option value="bulletinsalaire3">3ème bulletin de salaire (ou bilan comptable)</option>
          <option value="releveBancaire1">1er relevé de compte en banque</option>
          <option value="releveBancaire2">2ème relevé de compte en banque</option>
          <option value="releveBancaire3">3ème relevé de compte en banque</option>
          <option value="justifDomicile">Justificatif de domicile</option>
          <option value="justifApportPersonnel">Justificatif d'apport personnel</option>
          <option value="compromisVente">Compromis de vente</option>
          <option value="titreRetraite">titre de retraite ou de pension pour les 3 derniers mois</option>
          <option value="attestationCAF">Attestation de la CAF</option>
          <option value="attestationRevenusFonciers">Attestation de revenus fonciers</option>
          <option value="justifSituationFamiliale">Justificatif de situation familiale</option>
          <option value="contratTravail">Contrat de travail</option>
          <option value="contratPret">Contrat de prêt</option>
          <option value="avenantPret">Avenant de prêt</option>
          <option value="tableauAmortissement">Tableau d'amortissement</option>
        </select>
        
        <label className='font-medium'>Insérez un fichier : </label>
        
        
        <input  
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
        />
        
        <button className="btn-primary" type="submit">Submit</button>
        </div>
        
        <div className='flex justify-center m-auto'>
          <p className='text-4xl font-medium text-blue-400 my-12'>Mes fichiers</p>
        </div>

        <div className='flex flex-col m-auto w-2/3'>
          {allFiles.map((file, index) => (
            <div key={index} className='flex flex-row gap-4 justify-between bg-white my-2 p-4'>
              <button className='font-medium' value={file.File_type} onClick={handleClick}>
                {getFileLabel(file.File_type)}
              </button>
              <p>{file.Title}</p>
            </div>
          ))}
      </div>
      </form>
    </div>
  );
};


export default FileUploadForm;
