import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);

  // Fonction pour ajouter un nouveau message
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Exemple d'utilisation d'un effet pour simuler l'arrivée de nouveaux messages
  useEffect(() => {
    const timer = setInterval(() => {
      const newMessage = { id: Date.now(), content: `Message ${messages.length + 1}` };
      addMessage(newMessage);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
    </div>
  );
};

export default ConversationPage;
