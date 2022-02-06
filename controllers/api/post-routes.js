const router = require("express").Router();
const { Post, Comment } = require("../../models");

//api/post endpoint
//get all the posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "body", "user_Id"],
        include: [
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "body", "user_Id"],
            },
        ],
    })
        .then((dbPostData) => {
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get post by id
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "title", "body", "user_Id"],
        include: [
            {
                model: Comment,
                as: "comments",
                attributes: ["id", "body", "user_Id"],
            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "There was not a post with that ID" });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//add post
router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
    })
        .then((dbPostData) => {
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//update post
router.put("/:id", (req, res) => {
    console.log("The id is ", req.params.id);
    Post.update(
        {
            title: req.body.title,
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "Unable to find post with that id!" });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});
//Delete post
router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "Could not delete that post!" });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;