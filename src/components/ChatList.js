// src/components/ChatList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

function ChatList({ socket, username }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRooms");
    socket.on("roomsList", (roomList) => {
      setRooms(roomList);
    });

    return () => {
      socket.off("roomsList");
    };
  }, [socket]);

  const handleJoinRoom = (room) => {
    setSelectedRoom(room);
    navigate(`/chat/${room}`);
  };

  const handleCreateRoom = (newRoomName) => {
    socket.emit("createRoom", { room: newRoomName });
    setSelectedRoom(newRoomName);
    navigate(`/chat/${newRoomName}`);
  };

  return (
    <div className="chat-list-container">
      <div className="chat-list">
        <h1>Chat Rooms</h1>
        <ul>
          {rooms.map((room) => (
            <li key={room} onClick={() => handleJoinRoom(room)}>
              {room}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Create new room"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateRoom(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      {selectedRoom && (
        <Chat socket={socket} username={username} room={selectedRoom} />
      )}
    </div>
  );
}

export default ChatList;
