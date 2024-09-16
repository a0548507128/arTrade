import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function NewCreation() {
  let navigate=useNavigate();

  const [image, setImage] = useState({});
  const [creationName, setCreationName] = useState("");
  const [creationDescription, setCreationDescription] = useState("");
  const [creationPrice, setCreationPrice] = useState("");
  const [creationType, setCreationType] = useState([]);
  const [nowCreationType, setNowCreationType] = useState("");

  const handleName = (e) => {
    setCreationName(e.target.value);
  };
  const handlePicture = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };
  const handleDescription = (e) => {
    setCreationDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setCreationPrice(e.target.value);
  };
  const handleType = (e) => {
    setNowCreationType(e.target.value);
  };

  async function savePicture(id) {
    let formData = new FormData();
    formData.append("file", image.data, `${id}.jpg`);
    let response2 = await fetch(
      "http://localhost:3001/api/uploadImage/InsertToFolder",
      {
        method: "post",
        body: formData,
      }
    );
  }

  async function AddCreation(e) {
    if(!image){
      alert("אנא הכנס תמונה");
    }
    else if(creationName==""){
      alert("אנא הכנס שם יצירה");
    }
    else if(creationDescription==""){
      alert("אנא הכנס תיאור ליצירה");
    }
    else if(creationPrice==""){
      alert("יש להכניס מחיר");
    }
    else if(nowCreationType==""){
      alert("יש לבחור קטגוריה ליצירה שהעלת");
    }
    else{
      e.preventDefault();
      let response1 = await fetch(
        `http://localhost:3001/api/${localStorage.getItem("user_id")}/NewCreation`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            creationName: creationName,
            creationDescription: creationDescription,
            creationPrice: creationPrice,
            creationType: nowCreationType,
          }),
        }
      );
      let insertId = await response1.json();
      console.log(insertId.id, "asdfghjk");
  
      savePicture(insertId.id);
      navigate(`/AllMyCreations`)
    }
  }

  async function allCreationsType1() {
    let response = await fetch(
      `http://localhost:3001/api/creationTypes`,
      {
        method: "get",
      }
    );
    let set = await response.json();
    setCreationType(set);
    console.log(set);
  }

  useEffect(() => {
    allCreationsType1();
  }, []);

  return (
    <form id="newCreation" onSubmit={AddCreation}>
      <span className="CreationInfo">שם היצירה</span>
      <br />
      <input type="text" onChange={handleName} className="inTitleDetails"/>
      <br />
      <span className="CreationInfo">צרף תמונה</span>
      <br />
      <input type="file" onChange={handlePicture} name="file" className="inTitleDetails"/>
      <br />
      <span className="CreationInfo">תיאור היצירה</span>
      <br />
      <textarea onChange={handleDescription} className="inTitleDetails"></textarea>
      <br />
      <span className="CreationInfo">מחיר (התחלתי)</span>
      <br />
      <input type="text" onChange={handlePrice} className="inTitleDetails"/>
      <br />
      <span className="CreationInfo">סוג היצירה </span><br/>
      <select className="inTitleDetails" onChange={handleType}> 
        <option>בחר קטגוריה</option>
          {creationType.map((item, i)=>(
            <option key={i} value={i+1}>
              {item.id==1?(
                "ציור"
              ):(
                "פיסול"
              )}
            </option>
          ))}
        </select>
        <br/>
      <input type="submit" value="הוספה" className="butTitle"/>
    </form>
  );
}

export default NewCreation;
