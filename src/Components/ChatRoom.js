import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useUserContext } from "./UserContext";
import { useSocket } from "./SocketContextProvider";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  // Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatRoom(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  const [time, setTime] = useState("");
  const { currUser, setCurrUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState("");
  const [currentProduct, setCurrentProduct] = useState({});
  const [product, setProduct] = useState({});
  const socket = useSocket();
  const { oldMessages, room, chatInfo } = props;

  const date = new Date();

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Singapore",
  });

  console.log(formattedDate);

  useEffect(() => {
    console.log(room);
    console.log(chatInfo.product);
    if (room !== "") {
      setProduct(chatInfo.product);
      setMessageList(oldMessages);
      setUsername(currUser.userName);
      console.log(`Joining Room: ${room}`);
      getDateTime();
      socket.emit("join_room", room.id);
    }
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
    const dateString = new Date().toJSON();
    const date = dateString.slice(0, 10);
    setTodayDate(date);
  };

  useEffect(() => {
    console.log(todayDate);
  }, [todayDate]);

  useEffect(() => {
    console.log(time);
  }, [time]);

  useEffect(() => {
    console.log(messageList);
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: { userName: currUser.userName },
        content: currentMessage,
        prodId: chatInfo.product.productId,
        userId: currUser.id,
        createdAt: formattedDate,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    console.log(messageList);
  }, [socket, messageList]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box className="chat-window" key="Box1">
        <Box
          className="chat-header"
          key="Box2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#263238",
            height: "45px",
            borderTopRightRadius: "6px",
            borderTopLeftRadius: "6px",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: `white` }}
          >
            Live Chat
          </Typography>
        </Box>
        <Box className="chat-body" key="Box3">
          <ScrollToBottom className="message-container">
            <Box
              key="Box4"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {todayDate}
            </Box>
            <Box className="product-info" key="Box5">
              {product.id !== null &&
                product.photos &&
                product.photos.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 2,
                      border: "1px solid #ccc",
                      borderRadius: 5,
                      backgroundColor: "#f4f4f4",
                      marginBottom: 10,
                    }}
                  >
                    <Avatar src={product.photos[0].url} alt={product.title} />
                    <Box sx={{ marginLeft: 2 }} key="Box6">
                      <Typography variant="body2">{`${product.title}`}</Typography>
                      <Typography variant="body2">{`Price: $${product.price}`}</Typography>
                    </Box>
                  </Box>
                )}
            </Box>
            {messageList.map((messageContent, index) => (
              <Box
                className="message"
                key={index}
                id={
                  username === messageContent.author.userName ? "you" : "other"
                }
              >
                <Box key="Box7">
                  <Box
                    className="message-content"
                    key="Box8"
                    sx={{
                      backgroundColor:
                        username === messageContent.author.userName
                          ? "#43a047"
                          : "cornflowerblue",
                      borderRadius: 5,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      marginRight: 1,
                      marginLeft: 1,
                      paddingX: 1,
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    <Typography>{messageContent.content}</Typography>
                  </Box>
                  <Box
                    className="message-meta"
                    key="Box9"
                    sx={{
                      display: "flex",
                      fontSize: 12,
                      justifyContent:
                        username === messageContent.author.userName
                          ? "flex-start"
                          : "flex-end",
                      marginLeft: 1,
                      marginRight: 1,
                    }}
                  >
                    <Typography id="time">
                      {messageContent.createdAt.slice(11, 16)}
                    </Typography>
                    <Typography id="author">
                      {messageContent.author.userName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </ScrollToBottom>
        </Box>
        <Box className="chat-footer" key="Box10">
          <TextField
            variant="outlined"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            sx={{
              flex: 1,
              marginRight: 1,
              "& .css-1j3vnfe-MuiInputBase-root-MuiOutlinedInput-root": {
                height: 36,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<SendIcon />}
            onClick={sendMessage}
          ></Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatRoom;
