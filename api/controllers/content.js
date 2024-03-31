import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getContents = (req, res) => {
  const q = req.query.cat ? "SELECT * FROM content WHERE category=?" : "SELECT * FROM content";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
  };

export const getContent =(req,res) =>{
    const q = 
    "SELECT c.id , `username`,`title`, `description` , `category`, c.img , u.img AS userImg, `date` FROM users u JOIN content c ON u.id = c.userid WHERE c.id = ? ";

    db.query(q,[req.params.id],(err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data[0]);
    });
}

export const addContent =(req,res) =>{
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token,"jwtsecretkky",(err,userInfo)=>{
    if(err) return res.status(403).json("Token is not valid!!");
  
    const q = "INSERT INTO content(`title`, `description`,`category`,`date`,`img`,`userid`) VALUES (?)";


    const values = [
      req.body.title,
      req.body.description,
      req.body.category,
      req.body.date,
      req.body.img,
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
}

export const deleteContent =(req,res) =>{
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("You are not authenticated!")
  jwt.verify(token,"jwtsecretkky",(err,userInfo)=>{
    if(err) return res.status(403).json("Token is not valid!!")
  
    const postId = req.params.id
    const q="DELETE FROM content WHERE `id`=? AND `userid` = ?"
  
    db.query(q,[postId,userInfo.id],(err,data)=>{
      if(err) return res.status(403).json("You can delete only your posts!!")
    
      return res.json("Post has been deleted succesfully!")
    })
  })

    

}

export const updateContent =(req,res) =>{
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token,"jwtsecretkky",(err,userInfo)=>{
    if(err) return res.status(403).json("Token is not valid!!");
    
    const postId = req.params.id
    
    const q = "UPDATE content SET `title`=?, `description`=?,`img`=?,`category`=? WHERE `id`= ? AND `userid` = ?";

    const values = [
      req.body.title,
      req.body.desciption,
      req.body.img,
      req.body.category,
    ];

    db.query(q,[...values,postId,userInfo.id],(err,data)=>{
      if(err) return res.status(500).json(err)

      return res.json("Post updated succesfully!")
    })
  });
}

