import express from "express";

import {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} from "../controller/blogController.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;