import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import NavBar from "../NavBar";

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/conversation/');
  };
  //const { userData } = useContext(UserContext);

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    try {
      const response = await fetch(
        `/conversation/sendmessage/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );

      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/conversation/getmessage/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        throw new Error("Error fetching messages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Charger les messages au chargement initial
  useEffect(() => {
    fetchMessages();
  }, []);

  // Rafraîchir les messages toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
<div className="page-container flex flex-col h-screen overflow-hidden">
  <NavBar />
  <div className="flex justify-between bg-white w-full" style={{ height: "calc(100vh - 64px)" }}>
    <div className="w-2/5 bg-gray-100 p-6">
      <div className="flex items-center mb-4">
        <button className="flex items-center text-blue-500 font-bold" onClick={handleArrowClick}>
          <svg className="w-6 h-6 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour
        </button>
      </div>
      <h2 className="text-lg font-bold mb-4">Actions</h2>
      <div className="inline-block p-2 rounded-lg bg-gray-200">
        <button className="btn-secondary mb-2">Partager des documents</button>
      </div>
      <div className="inline-block p-2 rounded-lg bg-gray-200">
        <button className="btn-secondary">Remplir un formulaire</button>
      </div>
    </div>
    <div className="p-6 flex-grow overflow-hidden">
      {/* Titre du chat */}
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      {/* Conteneur pour les messages et le formulaire d'envoi */}
      <div className="h-full flex flex-col">
        {/* Liste des messages */}
        <div className="chat-messages overflow-y-auto flex-grow">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.slice().map((message) => (
              <div
                key={message.ID_message}
                className={`mb-4 ${
                  message.Sender === "Client" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.Sender === "Client" ? "bg-blue-200" : "bg-gray-200"
                  } whitespace-normal break-words max-w-md`}
                >
                  <p className="text-gray-600 text-left">{message.Content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">Aucun message</div>
          )}
        </div>
        {/* Formulaire d'envoi */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-2 w-full"
          />
          <button onClick={sendMessage} className="btn-primary ml-2">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ChatPage;
