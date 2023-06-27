import React, { useState } from 'react';

const FileUploadForm = () => {
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelectedOption(e.target.value);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("file : ", file);
    console.log("option : ", selectedOption);

    const formData = new FormData();
    formData.append('fileType', selectedOption);
    formData.append('file', file);

    fetch("/customer/upload", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: 
        formData 
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <div>
      <form 
        onSubmit={handleUpload}
      >
        <label>Choisissez un type de fichier : </label>
        <br />
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Choisissez un type de fichier</option>
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
        <br />
        <label>Insérez un fichier ici : </label>
        <br />
        <input
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FileUploadForm;