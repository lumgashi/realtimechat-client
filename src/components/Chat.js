import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { IoFileTrayFullOutline } from "react-icons/io5";
import "./Chats.css";

const socket = io("http://localhost:3000");

const ChatsPage = () => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRooms");

    socket.on("roomsList", (roomsList) => {
      setRooms(roomsList);
    });

    socket.on("newRoom", (newRoom) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    });

    socket.on("roomExists", ({ error }) => {
      setError(error);
      setTimeout(() => setError(""), 3000);
    });

    return () => {
      socket.off("roomsList");
      socket.off("newRoom");
      socket.off("roomExists");
    };
  }, []);

  const createRoom = () => {
    if (!roomName.trim()) return;

    socket.emit("createRoom", { username, roomName });
    setRoomName("");
  };

  const joinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-header">
          <h2>Chats ({rooms.length})</h2>
        </div>
        <div className="room-input">
          <input
            type="text"
            placeholder="Create a room..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={createRoom}>+</button>
        </div>
        {error && <p className="room-error">{error}</p>}
        <ul className="rooms-list">
          {rooms.map((room, index) => (
            <li
              key={room.roomId}
              onClick={() => joinRoom(room.roomId)}
              className="room-item"
            >
              <div
                className="avatar"
                style={{ backgroundColor: getAvatarColor(index) }}
              >
                <IoFileTrayFullOutline />
              </div>
              <div className="room-details">
                <p className="room-status">{room.roomName || "Unnamed Room"}</p>{" "}
                {/* ✅ Ensure it displays */}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-main">Select a chat room to start messaging</div>
    </div>
  );
};

const getAvatarColor = (index) => {
  const colors = ["#FF5733", "#FF33A8", "#FFD700", "#00C957", "#00AEEF"];
  return colors[index % colors.length];
};

export default ChatsPage;
