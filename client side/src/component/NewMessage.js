import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
function NewMessage(){
    const params=useParams();
    let current = localStorage.getItem("user_id");

    const [oneCreation,setOneCreation]=useState([]);
    const [creationBid, setCreationBid] = useState("");

    const handleBid = (e) => {
      setCreationBid(e.target.value);
    };
  
    let navigate = useNavigate();

    async function getCreationDetails() {
        let response = await fetch(`http://localhost:3001/api/allCreations/${params.creationId}`, { method: "get" });
          let set = await response.json();
          setOneCreation(set[0]);
      }
      useEffect(() => {
        getCreationDetails();
      }, []);
      
    async function setNewMessage() {
        let response = await fetch(`http://localhost:3001/api/${current}/allCreations/${params.creationId}/sendMessage`, {
          method: "post",
          headers: {
            'Content-type': 'application/json'
            },
          body: JSON.stringify({
            seller_id: oneCreation.seller_id,
            creationBid: creationBid
          })
        });
        navigate("/")
      }

    return(
        <div id="newMessage">   
            <h2>:שם היצירה</h2>
            <div>{oneCreation.name_of_creation}</div>
            <h2>:מחיר</h2>
            <div>{oneCreation.price}</div>
            <h2>:הכנס הצעת מחיר</h2>
            <input type="text" onChange={handleBid} className="inTitleDetails"></input><br/>
           <input type="submit" value="שלח את הבקשה למוכר" onClick={setNewMessage} className="links"></input>
        </div>
    )
}

export default NewMessage;