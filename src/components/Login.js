import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import socket from "../utils/socket";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    socket.emit("checkUsername", { username });

    socket.on("usernameCheckResult", ({ isTaken }) => {
      if (isTaken) {
        setError("Username is already taken. Try another one.");
      } else {
        localStorage.setItem("username", username);
        navigate("/chats");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Enter a Username</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}
        <button onClick={handleLogin} className="login-button">
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
