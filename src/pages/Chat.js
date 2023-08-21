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
  const [room, setRoom] = useState("");
  const { currUser, setCurrUser } = useUserContext();
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showChatMessages, setShowChatMessages] = useState(false);
  const [sellerChatList, setSellerChatList] = useState([]);
  // const [sellerChatMessages, setSellerChatMessages] = useState([]);
  const [combinedChatList, setCombinedChatList] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const socket = useSocket();
  const drawerWidth = 240;

  useEffect(() => {
    if (!currUser) {
      const localAccess = JSON.parse(localStorage.getItem("currUser"));
      setCurrUser(localAccess);
    }
  }, [currUser, setCurrUser]);

  // to retrieve messages for 1 chat in chatList when clicked

  const retrieveMessages = (chatId, index) => {
    console.log(chatId);
    console.log("Current Index is: ", index);
    setSelectedChatIndex(chatId);
    setChatInfo(combinedChatList[index]);
    // console.log(currentChatInfo);
    if (chatId >= 0) {
      console.log("ChatId is: ", chatId);
      socket.emit("retrieve_messages", chatId);
    }
  };

  socket.on("chat_messages", (messages) => {
    // console.log("New chat messages received: ");
    if (messages !== null) {
      setChatMessages(messages);
      setShowChatMessages(true);
    }
  });

  // to retrieve chatList as seller

  socket.on("seller_chat_list", (chatList) => {
    // console.log("New seller chatlist received: ");

    if (chatList !== null) {
      setSellerChatList(chatList);
    }
  });

  useEffect(() => {
    const combined = [...sellerChatList, ...chatList];
    setCombinedChatList(combined);
  }, [chatList, sellerChatList]);

  useEffect(() => {
    console.log("Combined chat List!");
    console.log(combinedChatList);
  }, [combinedChatList]);

  useEffect(() => {
    // console.log("retrieve_checklist socket emitted");
    // console.log(currUser);
    if (currUser !== null) {
      socket.emit("retrieve_chatlist", currUser.id);
      socket.emit("getSeller_chatlist", currUser.id);
    }
  }, [currUser]);

  useEffect(() => {
    // console.log("ChatMessages state variable set!");
    if (chatMessages.length > 0) {
      setShowChatMessages(true);
    }
  }, [chatMessages]);

  // to retrieve chatList

  socket.on("user_chat_list", (newChatList) => {
    // console.log("New chatlist received: ");
    if (newChatList !== null) {
      setChatList(newChatList);
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
    console.log("ChatMessages state variable set!");
    console.log(chatMessages);
    if (chatMessages.length > 0) {
      setShowChatMessages(true);
    }
  }, [chatMessages]);

  useEffect(() => {
    console.log("ChatList state variable set!");
    console.log(chatList);
  }, [chatList]);

  const mapCheckList = combinedChatList.map((chatItem, index) => (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        key: `List${index}`,
      }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography variant="h6">
            {chatItem.sellerId === currUser.id ? "Seller" : "Buyer"}
          </Typography>
        </ListSubheader>
      }
    >
      <ListItem
        alignItems="flex-start"
        key={chatItem.id}
        disablePadding
        onClick={() => {
          setShowChatMessages(false);
          retrieveMessages(chatItem.id, index);
        }}
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt={"user"} src={chatItem.product.photos[0].url} />
          </ListItemAvatar>
          <ListItemText
            primary={chatItem.product.title}
            secondary={
              <React.Fragment>
                {`Price: $${chatItem.product.price}`}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  ));

  return (
    <Box sx={{ display: "flex", paddingTop: "60px" }} key="Box1">
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
          paddingTop: "60px",
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
          <Box sx={{ paddingTop: "40px" }}>{mapCheckList}</Box>
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
            room={selectedChatIndex} // Pass room as props
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
