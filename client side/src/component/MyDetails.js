import React, { useState, useEffect } from "react";

function MyDetails() {
  const [details, setDetails] = useState([]);
  const [newFirstName, setnewFirstName] = useState("");
  const [newLastName, setnewLastName] = useState("");
  const [newPhone, setnewPhone] = useState("");
  const [newPass, setnewPass] = useState(0);

  function setValue (e){
    let place=e.target.getAttribute('data_target');
    switch (place) {
      case '0': 
        setnewFirstName(e.target.value);
        break;
      case '1':
        setnewLastName(e.target.value);
        break;
      case '3': 
        setnewPhone(e.target.value);
        break;
      case '4': 
        setnewPass(e.target.value);
        break;
      default:
        console.log("אוףףףף");
        break;
    }
  };

  let current = localStorage.getItem("user_id");
  
  async function userDetails() {
    let response = await fetch(`http://localhost:3001/api/${current}/details`, {
      method: "get",
    });
    let set = await response.json();
    let result = Object.keys(set).map((key) => (set[key]));
    setDetails(result);
  }
  useEffect(() => {
    userDetails();
  }, []);
  
  let arr = ["first name", "last name", "mail", "phone", "pass"];

  async function updating() {
    console.log(newFirstName);
    let response = await fetch(
      `http://localhost:3001/api/${current}/myDetails/updating`,
      {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: newFirstName,
          lastName: newLastName,
          phone: newPhone,
          password: newPass,
        }),
      }
    );
  }

  return (
    <div id="details">
      {details.map((item, i) => (
        <div key={i} className="titleDetails">
          {arr[i]}:<br />
          <input className="inTitleDetails"
            data_target={i}
            defaultValue={item}
            type="text"
            onChange={setValue}
          />
        </div>
      ))}
      <input type="submit" onClick={updating} value="עדכון" className="butTitle"/>
    </div>
  );
}

export default MyDetails;
