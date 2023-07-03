import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SelectConversationPage = () => {
  const [conversations, setConversations] = useState([]);
  const storedToken = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const application = urlParams.get('application');

  useEffect(() => {
    // Effectuer une requête pour récupérer la liste des conversations depuis le serveur
    
    fetch('/conversation/getconversations',
    {     
          method: "POST",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loanID : application,
          }),
        })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setConversations(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return conversations ? (
<div className="h-screen flex flex-col justify-center items-center bg-blue-100">
  <h1 className="text-2xl font-bold mb-4">Liste des Conversations</h1>
  <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
    <ul className="space-y-4">
      {conversations.map(conversation => (
        <li key={conversation.ID_conversation} className="border-b border-gray-300 py-2">
          <Link
            to={`/conversation/${conversation.ID_conversation}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Conversation #{conversation.Title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>


  ) : (null);
};

export default SelectConversationPage;
