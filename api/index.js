import express from "express"
import contentRouter from "./routes/contents.js"
import autRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import multer from "multer"


const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({ storage })


app.post('/api/upload', upload.single('file'), function (req, res) {
const file = req.file 
res.status(200).json(file.filename);
})


app.use(express.json());
app.use(cookieParser());
app.use("/api/contents",contentRouter)
app.use("/api/users",userRoutes)
app.use("/api/auth",autRoutes)




app.listen(8800,()=>{
    console.log("Listening server")
})