import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from '../image/logo.jpg';

function LogIn() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const navigate=useNavigate();
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  async function logIn() {
    let response = await fetch('http://localhost:3001/api/login', {
      method: "post",
      headers: {
        'Content-type': 'application/json'
        },
      body: JSON.stringify({
        mail: mail,
        password : pass
      })
    });
    if (response.status==400){
      alert("משתמש ו/או סיסמא לא נכונים");
    }
    let set = await response.json();
    if(set){
      localStorage.setItem('user_id', set);
      navigate('/');
    }
  }
    
    return (
      <div className="background">
        <div className="login_signup">
          <h1 className="title">כניסה</h1>
          <span className="infor">:מייל</span>
          <input type="text" onChange={handleMail} name="handleUser" className="inIfor" /> <br />
          <span className="infor">:סיסמא</span>
          <input type="password" onChange={handlePass} name="handlePass" className="inIfor"/><br />
          <input type="submit" value="log in" id="sub" onClick={logIn} /><br/><br/><br/>
          <Link to={`/SignUp`} className="noOrYesAccaunt">?עדיין אין לך חשבון</Link>
        </div>
      </div>
    );
  }

export default LogIn;
