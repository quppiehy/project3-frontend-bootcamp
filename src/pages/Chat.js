import io from "socket.io-client";
import { useState } from "react";
import ChatRoom from "../Components/ChatRoom";
import "../styles/chat.css";

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      console.log(`Joining Room: ${room}`);
      // socket.emit("join_room", room);
    }
    setShowChat(true);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        ""
        // <ChatRoom socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat;
