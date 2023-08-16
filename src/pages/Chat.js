import { useState, useEffect } from "react";
import ChatRoom from "../Components/ChatRoom";
import "../styles/chat.css";
import axios from "axios";
import { useUserContext } from "../Components/UserContext";
import { useSocket } from "../Components/SocketContextProvider";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  // ListItemIcon,
  Avatar,
  Typography,
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  ListSubheader,
} from "@mui/material";

function Chat() {
  //const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  //const [showChat, setShowChat] = useState(false);
  const { currUser, setCurrUser } = useUserContext();
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showChatMessages, setShowChatMessages] = useState(false);
  const [chatInfo, setChatInfo] = useState({});
  const socket = useSocket();
  const drawerWidth = 240;

  useEffect(() => {
    if (!currUser) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      setCurrUser(localAccess);
    }
  }, [currUser, setCurrUser]);

  // const joinRoom = () => {
  //   if (username !== "" && room !== "") {
  //     console.log(`Joining Room: ${room}`);
  //     // socket.emit("join_room", room);
  //   }
  //   setShowChat(true);
  // };

  // to retrieve messages for 1 chat in chatList

  const retrieveMessages = (chatId, index) => {
    console.log(chatId);
    console.log("Current Index is: ", index);
    const currentChatInfo = chatList[index];
    setChatInfo(currentChatInfo);
    console.log(currentChatInfo);
    if (chatId !== null) {
      socket.emit("retrieve_messages", chatId);
    }
  };

  socket.on("chat_messages", (messages) => {
    console.log("New chat messages received: ");
    console.log(messages);
    if (messages !== null) {
      setChatMessages(messages);
      setShowChatMessages(true);
    }
  });

  // to retrieve chatList

  socket.on("user_chat_list", (chatList) => {
    console.log("New chatlist received: ");
    console.log(chatList);
    if (chatList !== null) {
      setChatList(chatList);
    }
  });

  useEffect(() => {
    console.log("retrieve_checklist socket emitted");
    console.log(currUser);
    if (currUser !== null) {
      socket.emit("retrieve_chatlist", currUser.id);
    }
  }, [currUser]);

  useEffect(() => {
    console.log("ChatList state variable set!");
    console.log(chatList);
  }, [chatList]);

  useEffect(() => {
    console.log("ChatMessages state variable set!");
    console.log(chatMessages);
    if (chatMessages.length > 0) {
      setShowChatMessages(true);
    }
  }, [chatMessages]);

  useEffect(() => {
    console.log("Selected Index!");
    console.log(selectedChatIndex);
  }, [selectedChatIndex]);

  const mapCheckList = chatList.map((chatItem, index) => (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        key: `List${index}`,
      }}
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     <Typography variant="h5"> Current Chat</Typography>
      //   </ListSubheader>
      // }
    >
      <ListItem
        alignItems="flex-start"
        key={chatItem.id}
        disablePadding
        onClick={() => {
          setShowChatMessages(false);
          retrieveMessages(chatItem.id, index);
          setSelectedChatIndex(chatItem.id);
        }}
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              alt={chatItem.product.seller.userName}
              src={chatItem.product.photos[0].url}
            />
          </ListItemAvatar>
          <ListItemText
            primary={chatItem.product.title}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Seller: {chatItem.product.seller.userName}
                </Typography>
                <br />
                {`Price: $${chatItem.product.price}`}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  ));

  // const mapMessages = chatMessages.map((messageItem, index) => (
  //   <List
  //     sx={{
  //       width: "100%",
  //       maxWidth: 500,
  //       bgcolor: "background.paper",
  //       key: "messageListKey",
  //     }}
  //   >
  /* <ListItem alignItems="flex-start" key={messageItem.id}>
        <ListItemText
          primary={chatItem.product.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Seller: {chatItem.product.seller.userName}
              </Typography>
              <br />
              {`Price: $${chatItem.product.price}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" /> */
  //   </List>
  // ));

  return (
    <Box sx={{ display: "flex" }} key="Box1">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar
          sx={{
            minHeight: 50,
            height: 50,
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Current Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          ".css-1m15afg-MuiDrawer-docked .MuiDrawer-paper": {
            marginTop: "15px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        {chatList.length > 0 ? (
          mapCheckList
        ) : (
          <Box sx={{ paddingLeft: `16px`, paddingTop: `23px` }}>
            <Typography variant="h5">No current chats available.</Typography>
          </Box>
        )}
      </Drawer>
      <Box
        component="main"
        key="Box2"
        sx={{ flexGrow: 1, bgcolor: `Background.default`, p: 3 }}
      >
        <Toolbar />
        {showChatMessages ? (
          <ChatRoom
            oldMessages={chatMessages} // Pass chatMessages as props
            room={selectedChatIndex} // Pass username as props
            chatInfo={chatInfo}
          />
        ) : (
          <Typography variant="h5">
            Select a chat from current chats to view the messages.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Chat;
