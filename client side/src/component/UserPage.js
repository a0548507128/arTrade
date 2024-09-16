import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserPage() {
    let current = localStorage.getItem("user_id");
    const [nowType, setType] = useState("");
    async function checkUserType() {
        if (current != null) {
          let response = await fetch(
            `http://localhost:3001/api/${current}/userType`,
            { method: "get" }
          );
          let set = await response.json();
          setType(set.type);
          console.log(nowType);
        }
      }
      useEffect(() => {
        checkUserType();
      }, []);
  return (
    <div id="userPage">
      <Link to={"/MyDetails"} className="links">לצפייה ועדכון הפרטים שלך</Link><br/>
        {nowType=="customer"?<div>
          <Link to={`/MyMessages`} className="links">להודעות ששלחת </Link>
         </div>:
         <div>
           <Link to={"/AllMyCreations"} className="links">לכל היצירות שלך</Link><br/>
            <Link to={`/Messages`} className="links">לכל ההודעות</Link><br/>
            <Link to={`/NewCreation`} className="links">העלאת יצירה חדשה</Link><br/>
          </div>}
    </div>
  );
}

export default UserPage;
