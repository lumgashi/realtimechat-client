
<body>
  <h1>Chat Application - Frontend</h1>
  <p>
    This is the frontend/client for the real-time chat application. It includes a login page, chat list, and chat groups interface. The frontend communicates with the backend server using Socket.IO and REST APIs.
  </p>

  <div class="section">
    <h2>Getting Started</h2>
    <p>Follow these steps to set up and run the frontend application:</p>
    <h3>Prerequisites</h3>
    <ul>
      <li>Node.js and npm installed on your machine.</li>
      <li>Backend server running (see the backend README for setup instructions).</li>
    </ul>
    <h3>Steps</h3>
    <ol>
      <li>
        <strong>Clone the repository (if not already done):</strong>
        <pre><code>https://github.com/lumgashi/realtimechat-client.git</code></pre>
      </li>
      <li>
        <strong>Navigate to the frontend directory:</strong>
        <pre><code>cd realtimechat-client</code></pre>
      </li>
      <li>
        <strong>Create a <code>.env</code> file:</strong>
        <p>Create a <code>.env</code> file in the root of the frontend directory and add the following:</p>
        <pre><code>PORT=3001</code></pre>
      </li>
      <li>
        <strong>Install dependencies:</strong>
        <pre><code>npm install</code></pre>
      </li>
      <li>
        <strong>Start the development server:</strong>
        <pre><code>npm run start</code></pre>
      </li>
      <li>
        <strong>Access the application:</strong>
        <p>Open your browser and navigate to <code>http://localhost:3001</code>.</p>
      </li>
    </ol>
  </div>

  <div class="section">
    <h2>Application Features</h2>
    <p>The frontend application consists of the following pages:</p>
    <h3>1. Login Page</h3>
    <ul>
      <li>Users can enter a username to join the chat application.</li>
      <li>Username availability is checked in real-time using Socket.IO.</li>
    </ul>
    <h3>2. Chat List Page</h3>
    <ul>
      <li>Displays a list of available chat rooms.</li>
      <li>Users can create new rooms or join existing ones.</li>
    </ul>
    <h3>3. Chat Group Page</h3>
    <ul>
      <li>Users can send and receive messages in real-time.</li>
      <li>Displays a list of participants in the room.</li>
      <li>Shows typing indicators when other users are typing.</li>
    </ul>
  </div>

  <div class="section">
    <h2>Environment Variables</h2>
    <p>The following environment variables are required for the frontend application:</p>
    <ul>
      <li>
        <code>PORT</code>: The port on which the frontend application will run. Default is <code>3001</code>.
        <pre><code>PORT=3001</code></pre>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>Socket.IO Events</h2>
    <p>The frontend communicates with the backend using the following Socket.IO events:</p>
    <h3>Client-to-Server Events</h3>
    <ul>
      <li>
        <code>checkUsername</code>: Checks if a username is already taken.
        <pre><code>socket.emit("checkUsername", { username: "exampleUser" });</code></pre>
      </li>
      <li>
        <code>joinRoom</code>: Joins a user to a specific room.
        <pre><code>socket.emit("joinRoom", { username: "exampleUser", room: "room_123" });</code></pre>
      </li>
      <li>
        <code>sendMessage</code>: Sends a message to the current room.
        <pre><code>socket.emit("sendMessage", { text: "Hello, world!" });</code></pre>
      </li>
      <li>
        <code>createRoom</code>: Creates a new chat room.
        <pre><code>socket.emit("createRoom", { username: "exampleUser", roomName: "New Room" });</code></pre>
      </li>
      <li>
        <code>userTyping</code>: Notifies the room that a user is typing.
        <pre><code>socket.emit("userTyping", { room: "room_123", username: "exampleUser" });</code></pre>
      </li>
      <li>
        <code>userStoppedTyping</code>: Notifies the room that a user has stopped typing.
        <pre><code>socket.emit("userStoppedTyping", { room: "room_123" });</code></pre>
      </li>
    </ul>
    <h3>Server-to-Client Events</h3>
    <ul>
      <li>
        <code>usernameCheckResult</code>: Returns the result of the username check.
        <pre><code>socket.on("usernameCheckResult", (data) => {
  console.log(data.isTaken); // true or false
});</code></pre>
      </li>
      <li>
        <code>roomDetails</code>: Sends details about the room to the client.
        <pre><code>socket.on("roomDetails", (data) => {
  console.log(data.roomName); // Name of the room
});</code></pre>
      </li>
      <li>
        <code>messageHistory</code>: Sends the last 10 messages in the room.
        <pre><code>socket.on("messageHistory", (messages) => {
  console.log(messages); // Array of messages
});</code></pre>
      </li>
      <li>
        <code>message</code>: Sends a new message to all users in the room.
        <pre><code>socket.on("message", (message) => {
  console.log(message); // { username, text, timestamp }
});</code></pre>
      </li>
      <li>
        <code>newRoom</code>: Notifies clients about a newly created room.
        <pre><code>socket.on("newRoom", (newRoom) => {
  console.log(newRoom); // { roomId, roomName, creator }
});</code></pre>
      </li>
      <li>
        <code>displayTyping</code>: Notifies clients that a user is typing.
        <pre><code>socket.on("displayTyping", (data) => {
  console.log(data.username); // Username of the typing user
});</code></pre>
      </li>
      <li>
        <code>hideTyping</code>: Notifies clients that a user has stopped typing.
        <pre><code>socket.on("hideTyping", () => {
  console.log("User stopped typing");
});</code></pre>
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>Project Structure</h2>
    <ul>
      <li><code>public/</code>: Contains static assets like images and the HTML template.</li>
      <li><code>src/</code>: Contains the React application code.</li>
      <li><code>src/components/</code>: Reusable React components.</li>
      <li><code>src/pages/</code>: Pages for the application (e.g., Login, ChatList, ChatGroup).</li>
      <li><code>src/utils/</code>: Utility functions and Socket.IO setup.</li>
      <li><code>.env</code>: Environment variables configuration.</li>
      <li><code>package.json</code>: Lists project dependencies and scripts.</li>
    </ul>
  </div>

</body>
</html>
