import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AllCreations() {
  const [creation, setCreation] = useState([]);
  const [creationType, setCreationType] = useState([]);
  const [nowType, setType] = useState("");

  let navigate = useNavigate();
  let current = localStorage.getItem("user_id");

  function sortCreationsByPrice(e) {
    let sort = e.target.value;
    switch (sort) {
      case "1":
        getCreationsByPrice(0, 99);
        break;
      case "2":
        getCreationsByPrice(100, 499);
        break;
      case "3":
        getCreationsByPrice(500, 1000);
        break;
      default:
        alert("שגיאה");
        break;
    }
  }

  async function getAllCreations() {
    let response = await fetch(`http://localhost:3001/api/AllCreations`, {
      method: "get",
    });
    let set = await response.json();
    setCreation(set);
    navigate("/");
  }

  async function checkUserType() {
    if (current != null) {
      let response = await fetch(
        `http://localhost:3001/api/${current}/userType`,
        { method: "get" }
      );
      let set = await response.json();
      setType(set.type);
    }
  }
  

  async function getCreationsByPrice(start, end) {
    let response = await fetch(
      `http://localhost:3001/api/allCreations/${start}/${end}`,
      {
        method: "get",
      }
    );
    let set = await response.json();
    setCreation(set);
    navigate("/");
  }

  async function sortCreationsByType(e) {
    let response = await fetch(
      `http://localhost:3001/api/allCreations/${e.target.value}`,
      {
        method: "get",
      }
    );
    let set = await response.json();
    setCreation(set);
    navigate("/");
  }

  async function allCreationsType() {
    let response = await fetch(
      `http://localhost:3001/api/creationTypes`,
      {
        method: "get",
      }
    );
    let set = await response.json();
    setCreationType(set);
  }

  useEffect(() => {
    getAllCreations();
    checkUserType();
    allCreationsType();
  }, []);

  return (
    <div className="mainPage">
      <div className="navSorting">
        <button onClick={getAllCreations} className="inSorting">הצג הכל</button>
        <br />
        <select onChange={sortCreationsByPrice} value="הצג על פי מחיר" className="inSorting" >
          <option>הצג על פי מחיר</option>
          <option value="1">0-100</option>
          <option value="2">100-500</option>
          <option value="3">500-1000</option>
        </select>
        <br />
        
        <select onChange={sortCreationsByType} className="inSorting" > 
          <option>הצג על פי סוג</option>
          {creationType.map((item, i)=>(
            <option key={i} value={item.id}>
              {item.id==1?(
                "ציור"
              ):(
                "פיסול"
              )}
            </option>
          ))}
        </select>
        <br />
      </div>
        
      {current && nowType == "customer" ? (
        <div className="allImages">
          {creation.map((item) => (
            <div key={item.id} className="image">
              <Link to={`/OneCreation/${item.id}`}>
                <h2>{item.name_of_creation}</h2>
                <img className="imgD" src={`http://localhost:3001/${item.id}.jpg`}/>
                <br />
              </Link>
              <Link to={`/NewMessage/${item.id}`}>לפנייה למוכר</Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="allImages">
          {creation.map((item) => (
            <div key={item.id} className="image">
              <h2>{item.name_of_creation}</h2>
              <img className="imgD" src={`http://localhost:3001/${item.id}.jpg`}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default AllCreations;
