import React,{useState,useEffect} from "react";
function AllMyCreations(){
    let current = localStorage.getItem("user_id");
    const [myCreations ,setMyCreations]=useState([]);
   
    async function MyCreation() {
        let response = await fetch(`http://localhost:3001/api/${current}/myCreations`, { method: "get" });
        let set = await response.json();
        setMyCreations(set);
      }

      async function deleteCreation(e) {
        let response = await fetch(`http://localhost:3001/api/${current}/deleteCreation/${e.target.value}`, { method: "delete" });
     }

      useEffect(() => {
        MyCreation();
      }, []);
      
    return(
        <div className="allImages">
            {myCreations.map((item) => (
              <div key={item.id} className="image">
                <h2>{item.name_of_creation}</h2>
                <img className="imgD" src={`http://localhost:3001/${item.id}.jpg`}></img> 
                <button value={item.id}  onClick={deleteCreation} >הסרת יצירה</button>
              </div>))
            }
        </div>
      );
}

export default AllMyCreations;