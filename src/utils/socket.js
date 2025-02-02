import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your backend URL

// Retrieve the username from local storage
const username = localStorage.getItem("username");
if (username) {
  socket.username = username;
}

export default socket;
