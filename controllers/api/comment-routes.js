const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
//get all the comments

//api/comment endpoint
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: ["id", "body", "user_Id", "post_Id"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"],
            },
        ],
    })
        .then((dbCommentData) => {
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get comment by id
router.get("/:id", (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "body", "user_Id", "post_Id"],
        include: [
            {
                model: User,
                as: "user",
                attributes: ["username"],
            },
        ],
    })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({ message: "Could not find a comment associated with that id" });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//add comment
router.post("/", (req, res) => {
    Comment.create({
        body: req.body.body,
        // user_id: req.session.user_id,
        post_Id: req.body.post_Id,
    })
        .then((dbCommentData) => {
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//update comment
router.put("/", (req, res) => {
    res.send(`Updated comment`);
});
//Delete comment
router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({ message: "No comment accociated with that id" });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;
