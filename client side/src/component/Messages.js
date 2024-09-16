import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function Messages() {
  const [message, setMessage] = useState([]);
  const [statusOfMessage, setStatusOfMessage] = useState([]);
  const [nowStatusOfMessage, setNowStatusOfMessage] = useState("");

  // const params=useParams();
  let current = localStorage.getItem("user_id");
  
  async function statusUpdate() {
      //  let response = await fetch(`http://localhost:3001/api/${current}/deleteCreation/:creationId`, { method: "delete" });
      //let set = await response.json();
     // setTracking(set);
  }

  async function statusMessages() {
      let response = await fetch(`http://localhost:3001/api/allStatus`, { method: "get" });
      let set = await response.json();
      setStatusOfMessage(set);
      console.log(set);
  }

  async function myMessages() {
    let response = await fetch(
      `http://localhost:3001/api/${current}/showMessages`,
      { method: "get" }
    );
    let set = await response.json();
    setMessage(set);
  }
  useEffect(() => {
    myMessages();
    statusMessages();
  }, []);

  return (
    <div className="allmessages">
      {message.map((item, i) => (
        <div>
          <div key={i} className="messageD">
            <div className="fontMessage">שם היצירה</div>
            <div>{item.name_of_creation}</div>
            <div className="fontMessage">שם הקונה</div>
            <div>{item.first_name} {item.last_name}</div>
            <div className="fontMessage">הצעת המחיר</div>
            <div>{item.customer_bid}</div>
            <div className="fontMessage">פרטים ליצירת קשר</div>
            <div> mail: {item.mail}</div>
            <div className="fontMessage">סטטוס נוכחי</div>
            <div>{item.stutus}</div>
            <div className="fontMessage">:עדכון סטטוס</div>
            <select onChange={statusUpdate} defaultValue={item.stutus}> 
                {statusOfMessage.map((item, i)=>(
                  <option key={i} value={item.id}>{item.stutus}</option>
                ))}
            </select>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Messages;
