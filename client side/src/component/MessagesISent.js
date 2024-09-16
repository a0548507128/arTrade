import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MessagesISent() {
  const [message, setMessage] = useState([]);
  let navigate = useNavigate();
  let current = localStorage.getItem("user_id");

  async function messageISent() {
    let response = await fetch(
      `http://localhost:3001/api/${current}/showMessagesISent`,
      { method: "get" }
    );
    let set = await response.json();
    setMessage(set);
  }

  async function deleteMessage(e) {
    let response = await fetch(`http://localhost:3001/api/deleteMessage/${e.target.value}`, { method: "delete" });
 }

  useEffect(() => {
    messageISent();
  }, []);
  
  return (
    <div className="allmessages">
      {message.map((item, i) => (
        <div key={i} className="messageD">
          <div className="fontMessage">שם היצירה</div>
          <div>{item.name_of_creation}</div>
          <div className="fontMessage"> הצעת המחיר שלי</div>
          <div>{item.customer_bid}</div>
          <div className="fontMessage">סטטוט תהליך הקניה</div>
          <div>{item.stutus}</div>
          <br/>
          <button value={item.message_id} onClick={deleteMessage}>הסרת הצעת מחיר</button>
          <br/>
        </div>
      ))}
    </div>
  );
}

export default MessagesISent;
