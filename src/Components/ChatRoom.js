import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from "react-router";
import { useUserContext } from "./UserContext";
import { useSocket } from "./SocketContextProvider";

function ChatRoom() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [chatDate, setChatDate] = useState("");
  const [time, setTime] = useState("");
  const location = useLocation();
  const { room } = location.state || {};
  const { currUser, setCurrUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    console.log(room);
    if (room !== "") {
      console.log(`Joining Room: ${room}`);
      getDateTime();
      socket.emit("join_room", room.id);
    }
    setShowChat(true);
  }, [room]);

  useEffect(() => {
    console.log(currUser);
    if (currUser === null) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      console.log(localAccess);
      setCurrUser(localAccess);
    }
  }, [currUser]);

  const getDateTime = () => {
    const dateString = room.createdAt;
    const date = dateString.slice(0, 10);
    setChatDate(date);
    const time = dateString.slice(11, 16);
    setTime(time);
  };

  useEffect(() => {
    console.log(chatDate);
  }, [chatDate]);

  useEffect(() => {
    console.log(time);
  });

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room.id,
        author: currUser.userName,
        content: currentMessage,
        prodId: room.productId,
        userId: room.userId,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const day = String(currentDate.getDate()).padStart(2, "0");
  //   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   const year = currentDate.getFullYear();
  //   const formattedDate = `${day}/${month}/${year}`;
  //   setChatDate(formattedDate);
  // }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    console.log(messageList);
  }, [socket, messageList]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {chatDate}
          {messageList.map((messageContent, index) => {
            console.log(messageContent, index);
            return (
              <div
                className="message"
                key={index}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default ChatRoom;
