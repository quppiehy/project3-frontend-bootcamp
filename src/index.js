import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"; // Import useAuth0 hook
import { UserProvider } from "./Components/UserContext";
import { SocketContextProvider } from "./Components/SocketContextProvider";
// import Product from "./Product";
import { theme } from "./theme";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_CHAT_SERVER);

const AppWithAuth = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // After authentication, get the token and store it in local storage
  getAccessTokenSilently().then((token) => {
    localStorage.setItem("Token", token);
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTHO_DOMAIN}
    clientId={process.env.REACT_APP_AUTHO_CLIENT_ID}
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      audience: process.env.REACT_APP_AUDIENCE,
      scope: process.env.REACT_APP_SCOPE,
    }}
  >
    <SocketContextProvider socket={socket}>
      <UserProvider>
        <AppWithAuth />
      </UserProvider>
    </SocketContextProvider>
  </Auth0Provider>
);
