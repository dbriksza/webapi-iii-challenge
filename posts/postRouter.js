const router = require("express").Router();
const postdb = require("./postDb");

router.get("/", (req, res) => {
  postdb
    .get()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to get posts" });
    });
});

router.get("/:id", (req, res) => {
  postdb
    .getById(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "unable to fins post with specified ID" });
    });
});

router.delete("/:id", (req, res) => {
  postdb
    .remove(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "post was not deleted" });
    });
});

router.put("/:id", (req, res) => {
  postdb
    .update(req.params.id, req.body)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to edit post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  postdb
    .getById(req.params.id)
    .then(next())
    .catch(err => {
      res.status(400).json({ message: "invalid post ID" });
    });
}

router.use("/:id", validatePostId);

module.exports = router;
