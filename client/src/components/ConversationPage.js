import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fonction pour envoyer un message
  const sendMessage = async () => {
    try {
      const response = await fetch(`/conversation/sendmessage/${conversationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        setNewMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    fetch(`/conversation/getmessage/${conversationId}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
          console.log(data);
        })
        .catch((error) =>{
          console.error(error);
        }) ;
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
    
<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h1 class="text-2xl font-bold mb-4">Chat</h1>
  <div class="chat-messages mb-4">
    {Array.isArray(messages) && messages.length > 0 ? (
      messages.map((message) => (
        <div
          key={message.ID_message}
          class={`mb-4 ${
            message.Sender === "Client" ? "text-right" : "text-left"
          }`}
        >
          <div
            class={`inline-block p-2 rounded-lg ${
              message.Sender === "Client" ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            <p class="text-gray-600">{message.Description}</p>
          </div>
        </div>
      ))
    ) : (
      <div class="text-gray-400">Aucun message</div>
    )}
  </div>
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    class="border border-gray-300 rounded-lg px-3 py-2 mb-2 w-full"
  />
  <button
    onClick={sendMessage}
    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
  >
    Envoyer
  </button>
</div>




  );
};

export default ChatPage;
