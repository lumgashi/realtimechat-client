import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiPhone,
  FiVideo,
  FiPaperclip,
  FiSmile,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";
import "./ChatRoom.css";
import socket from "../utils/socket";


const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const username = localStorage.getItem("username");
  const messagesEndRef = useRef(null);
  let typingTimeout = useRef(null);

  useEffect(() => {
    if (!username) return;

    socket.emit("joinRoom", { username, room: roomId });
    socket.emit("getMessages", { roomId });


    socket.on("roomDetails", ({ roomName }) => {
      setRoomName(roomName || "Chat App");
    });

    socket.on("messagesList", (messagesList) => {
      setMessages(messagesList);
      scrollToBottom();
    });

    socket.on("message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      scrollToBottom();
    });

    socket.on("displayTyping", ({ username: typingUsername }) => {
      if (typingUsername !== username) {
        setTypingUser(typingUsername);
      }
    });

    socket.on("hideTyping", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("roomDetails");
      socket.off("messagesList");
      socket.off("message");
      socket.off("displayTyping");
      socket.off("hideTyping");
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", { text: message });
    setMessage("");
    socket.emit("userStoppedTyping", { room: roomId });
  };

  const handleTyping = () => {
    socket.emit("userTyping", { room: roomId, username });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("userStoppedTyping", { room: roomId });
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="chat-room">
      {/* Chat Header */}
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate("/chats")}>
          <FiArrowLeft className="icon" /> Back
        </button>
        <div className="chat-info">
          <div className="chat-avatar">📌</div>
          <div>
            <h2 className="chat-name">{roomName}</h2>
            <p className="chat-status">Active now</p>
          </div>
        </div>
        <div className="chat-icons">
          <FiPhone className="icon" />
          <FiVideo className="icon" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-box ${
              msg.username === username ? "sent" : "received"
            }`}
          >
            <p className="message-text">{msg.text}</p>
            <span className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
        {typingUser && (
          <div className="typing-indicator">{typingUser} is typing...</div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input */}
      <div className="chat-input">
        <FiPaperclip className="icon" />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={handleKeyDown} // Send on Enter
        />
        <FiSmile className="icon" />
        <button className="send-btn" onClick={sendMessage}>
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;