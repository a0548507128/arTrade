const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("upload-single");
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({ storage: storage });
const service = require('./db/service');
const router = express.Router();
app.post("/api/uploadImage/InsertToFolder", upload.single('file'), (req, res)=>{
  req.statusCode='ok';
}); 

app.use( express.static('.//images'));

app.post("/api/:userId/NewCreation",(req, res) => {//הוספת יצירה חדשה
  service.addNewCreation(req, result=>{
    res.send({id:result.insertId});
  });
});

app.get("/api/userTypes", (req, res) => {//מביא את סוגי המשתמשים
  service.getUserTypes(result=>{
       res.send(result);
  });
});

app.get("/api/AllCreations", (req, res) => {//מביא את כל היצירות
  service.getAllCreations(result=>{
      res.send(result);
  });
});

app.post("/api/login", (req, res) => {//לוג אין
  service.logIn(req, result=>{
    if(result[0]==undefined){
      res.send(400);
    }
    else{
      res.send(JSON.stringify(result[0].id));
    }
  });
});

app.get("/api/allCreations/:creationId", (req, res) => {//מציג יצירה אחת
  service.getCreationDetails(req, result=>{
    res.send(result);
  });
});

app.post("/api/signUp",(req, res) => {//משתמש חדש
    service.signUp(req,result=>{
    res.send(result.insertId);
  });
});

app.get("/api/:userId/userType", (req, res)=>{//מחזיר את סוג המשתמש הנוכחי
  service.getUserType(req, result=>{
    res.send(JSON.stringify(result[0]));
  })
})

// app.get("/api/:user_id/message", (req, res) => {
//   service.getOneMessage(req, result=>{
//     res.send(result);
//   });
// });

app.get("/api/:userId/showMessages", (req,res)=>{//מציג את כל ההודעות שנשלחו אלי
  service.getAllMyMessages(req, result=>{
    res.send(result);
  })
});

app.get("/api/:userId/showMessagesISent", (req,res)=>{//מציג את כל ההודעות שאני שלחתי
  service.getAllMyMessagesISent(req, result=>{
    res.send(result);
  })
});

app.delete("/api/deleteMessage/:messageId", (req,res)=>{//מחיקת הצעה
  service.deleteMessage(req,result=>{
    res.send(result);
  })
});

app.get("/api/:userId/details", (req, res)=>{//מביא את פרטי המשתמש הנוכחי
  service.getDetails(req, result=>{
    res.send((result[0]));
  })
});

app.post("/api/:userId/allCreations/:creationId/sendMessage",(req, res)=>{//שליחת הודעה למוכר
  service.sendMessage(req, result=>{
    res.send(result);
  })
});

app.put("/api/:userId/myDetails/updating", (req, res)=>{//מעדכן פרטי משתמש
  service.updatingDetails(req,result=>{
    res.send(result);
  })
});

app.get("/api/:userId/myCreations",(req, res)=>{//מציג את כל היצירות של המשתמש מוכר הנוכחי
  service.allMyCreations(req, result=>{
    res.send(result);
  })
});

app.delete("/api/:userId/deleteCreation/:creationId", (req,res)=>{//מחיקת יצירה
  service.deleteCreation(req,result=>{
    res.send(result);
  })
});

// app.get("/api/:userId/messege/:messageId", (req,res)=>{
//   service.getStutusMessage(req,result=>{
//     res.send(result);
//   });
// });

app.get("/api/allCreations/:StartByPrice/:endByPrice", (req,res)=>{//מביא את היצירות לפי המחיר
  service.getCreationsByPrice(req,result=>{
    res.send(result);
  });
});

app.get("/api/allCreations/:ntype", (req,res)=>{//מביא את היצירות לפי הסוג
  service.getCreationsByType(req,result=>{
    res.send(result);
  });
});

app.get("/api/creationTypes", (req,res)=>{//מביא את כל סוגי היצירות
  service.getCreationTypes(req,result=>{
    res.send(result);
  });
});

app.get("/api/allStatus", (req,res)=>{//מביא את רשימת הסטטוסים האפשריים
  service.getAllStatus(req,result=>{
    res.send(result);
  });
});

//----------------------------------------------------------------------------------------

const post = process.env.POST || 3001;
app.listen(post, () => {
  console.log(`listening on port ${post}...`);
});
