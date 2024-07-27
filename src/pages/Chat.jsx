import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import '../styles/Chat.css'; // CSS dosyanızı ekleyin

// Güncellenmiş URL
const socket = io('https://defi-chat-backend.onrender.com');

const Chat = () => {
  const { userId } = useSelector(state => state.auth); // Kullanıcı kimliğini Redux'tan al
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // Çevrimiçi kullanıcıları saklamak için

  useEffect(() => {
    // Kullanıcıya özel odaya katıl
    socket.emit('joinRoom', userId);

    // Mesajları getirme
    axios.get(`https://defi-chat-backend.onrender.com/api/messages/${userId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    // Mesajları dinleme
    socket.on('message', (newMessage) => {
      if (newMessage.receiverId === userId || newMessage.senderId === userId) {
        setMessages(prevMessages => [newMessage, ...prevMessages]);
      }
    });

    // Çevrimiçi durumları dinleme
    socket.on('updateOnlineStatus', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('message');
      socket.off('updateOnlineStatus'); // Çevrimiçi durum güncellemelerini temizle
    };
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('senderId', userId);
    formData.append('receiverId', '669d7ae0f76cc629bd7c6204'); // Örnek alıcı ID'si
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }

    await axios.post('https://defi-chat-backend.onrender.com/api/messages', formData);
    setMessage('');
    setImage(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Application</h1>
        <div className="online-status">
          <h3>Online Users:</h3>
          <ul>
            {onlineUsers.map((id, index) => (
              <li key={index}>{id}</li> // Kullanıcı ID'si veya adını burada gösterebilirsiniz
            ))}
          </ul>
        </div>
      </div>
      <div className="chat-body">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}>
              <p>{msg.message}</p>
              {msg.image && <img src={`https://defi-chat-backend.onrender.com/uploads/${msg.image}`} alt="Uploaded" />}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
