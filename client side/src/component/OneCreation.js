import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
function OneCreation() {
    const params=useParams();
    const [oneCreation,setOneCreation]=useState([]);

  async function getCreationDetails() {
    let response = await fetch(
      `http://localhost:3001/api/allCreations/${params.creationId}`,
      { method: "get" }
    );
    let set = await response.json();
    setOneCreation(set[0]);
  }
  useEffect(() => {
    getCreationDetails();
  }, []);

  return (
    <div id="oneCreation">
      <div className="titleDetails">:שם היצירה</div>
      <div>{oneCreation.name_of_creation}</div>
      <div className="titleDetails">:תיאור</div>
      <div>{oneCreation.descript_of_creation}</div>
      <img src={`http://localhost:3001/${oneCreation.id}.jpg`} className="imgD"></img>
      <div className="titleDetails">:מחיר</div>
      <div>{oneCreation.price}</div>
    </div>
  );
}

export default OneCreation;
