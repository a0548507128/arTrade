import "./App.css";
import Main from "./component/Main";
import SignUp from "./component/SignUp";
import NewCreation from "./component/NewCreation";
import LogIn from "./component/LogIn";
import Messages from "./component/Messages";
import AllCreations from "./component/AllCreations";
import UserPage from "./component/UserPage";
import MyDetails from "./component/MyDetails";
import AllMyCreations from "./component/AllMyCreations";
import OneCreation from "./component/OneCreation";
import NewMessage from "./component/NewMessage";
import MessagesISent from "./component/MessagesISent";
import React from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path="SignUp" element={<SignUp />} />
          <Route path="LogIn" element={<LogIn />} />
          <Route
            element={
              <>
                <Main/>
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<AllCreations />} />
            <Route path="UserPage" element={<UserPage />} />    
            <Route path="NewCreation" element={<NewCreation />} />
            <Route path="Messages" element={<Messages />} />
            <Route path="MyDetails" element={<MyDetails/>}/>
            <Route path="AllMyCreations" element={<AllMyCreations/>}/>
            <Route path="OneCreation/:creationId" element={<OneCreation/>}/>
            <Route path="NewMessage/:creationId" element={<NewMessage/>}/>
            <Route path="MyMessages" element={<MessagesISent/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
