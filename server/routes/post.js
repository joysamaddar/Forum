const express = require("express");
const router = express.Router();
const {getPosts, createPost, getPostsByUser, updatePost, deletePost} = require("../controllers/post");
const { body } = require("express-validator");
const isAuth = require("../middleware/isAuth")

router.get("/posts", getPosts);

router.get("/posts/:userId", isAuth, getPostsByUser)

router.post("/post",
isAuth,
body("title").notEmpty().withMessage('Title must not be empty'),
body("title").trim().isLength({min: 5, max: 150}).withMessage('Title must be between 5 to 150 characters long.'), 
body("body").notEmpty().withMessage('Body must not be empty'),
body("body").isLength({min: 5, max: 2000}).withMessage('Body must be between 5 to 2000 characters long.'),
createPost);

router.put("/post/:postId", isAuth, 
body("title").notEmpty().withMessage('Title must not be empty'),
body("title").trim().isLength({min: 5, max: 150}).withMessage('Title must be between 5 to 150 characters long.'), 
body("body").notEmpty().withMessage('Body must not be empty'),
body("body").isLength({min: 5, max: 2000}).withMessage('Body must be between 5 to 2000 characters long.'),
updatePost);

router.delete("/post/:postId", isAuth, deletePost);

module.exports = router;