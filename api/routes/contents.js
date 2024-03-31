import express from "express"
import { 
    getContents, 
    getContent, 
    addContent, 
    deleteContent, 
    updateContent } 
    from "../controllers/content.js";

const router = express.Router();


router.get("/",getContents)
router.get("/:id",getContent)
router.post("/",addContent)
router.delete("/:id",deleteContent)
router.put("/:id",updateContent)


export default router