import React, { useState ,useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import myImage from '../image/logo.jpg';

function SignUp() {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState();
  const [usersType, setUsersType] = useState([]);
  const [nowUsersType,setNowUsersType]= useState("");

  let navigate = useNavigate(); 

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleLastName = (e) => {
    setLastName(e.target.value);
  }
  const handleMail = (e) => {
    setMail(e.target.value);
  }
  const handlePhone = (e) => {
    setPhone(e.target.value);
  }
  const handlePass = (e) => {
    setPassword(e.target.value);
  }
  const handleType = (e) => {
    setNowUsersType(e.target.value);
  }

  async function getUserTypes() {
    let response = await fetch(`http://localhost:3001/api/userTypes`, { method: "get" });
    let set = await response.json();
    setUsersType(set);
  }
  useEffect(() => {
    getUserTypes();
  }, []);

  async function signUp(e) {
    e.preventDefault();
    let response = await fetch('http://localhost:3001/api/signUp', {
      method: "post",
      headers: {
        'Content-type': 'application/json'
        },
      body: JSON.stringify({
        mail: mail,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        userType: nowUsersType,
        password: password
      })
    });
    let set = await response.status;
    if(set){
    localStorage.setItem('user_id', set);
      navigate('/');
    };
  }

  return (
    <div className="background">
      <form className="login_signup">
        <h1 className="title">הרשמה</h1>
        <span className="infor_si"> שם מלא* </span><br />
        <input type="text" className="inIfor_si" onChange={handleName} /><br />
        <span className="infor_si"> שם משפחה*</span>
        <input type="text" className="inIfor_si" onChange={handleLastName} /><br />
        <span className="infor_si"> מייל*</span><br />
        <input type="text" className="inIfor_si" onChange={handleMail} /><br />
        <span className="infor_si"> מס טלפון</span><br />
        <input type="text" className="inIfor_si" onChange={handlePhone} /> <br />
        <span className="infor_si"> סיסמה* </span><br />
        <input type="password" className="inIfor_si" onChange={handlePass} /><br />
        <span className="infor_si">בחר סוג משתמש*</span><br />
        <select id="txtSelect" onChange={handleType}>
          {usersType.map((item,i) => ( <option key={i} value={item.type}>{item.type}</option>))}
        </select><br/>
        <input type="submit" value="sign up" id="sub_si" onClick={signUp}/><br/><br/>
        <Link to={`/LogIn`} className="noOrYesAccaunt">?כבר יש לך חשבון</Link><br/>
        <Link to={`/`}>לדף הבית</Link><br/>
        
      </form>
    </div>
  );
}

export default SignUp;
