const router = require("express").Router();
const userdb = require("./userDb");

router.post("/", (req, res) => {
  userdb.insert(req.body).then(db => {
    res
      .status(200)
      .json(db)
      .catch(err => {
        res.status(500).json({ message: "unable to add user" });
      });
  });
});

router.post("/:id/posts", (req, res) => {
  userdb.insert(req.body).then(db => {
    res
      .status(200)
      .json(db)
      .catch(err => {
        res.status(500).json({ message: "unable to add post" });
      });
  });
});

router.get("/", (req, res) => {
  userdb
    .get()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to get users" });
    });
});

router.get("/:id", (req, res) => {
  userdb
    .getById(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "unable to find user with specified ID" });
    });
});

router.get("/:id/posts", (req, res) => {
  userdb
    .getUserPosts(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "unable to find user with specified ID" });
    });
});

router.delete("/:id", (req, res) => {
  userdb
    .remove(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "user was not deleted" });
    });
});

router.put("/:id", (req, res) => {
  userdb
    .update(req.params.id, req.body)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to edit user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userdb
    .getById(req.body.user_id)
    .then((req.user = req.body.user_id), next())
    .catch(err => {
      res.status(400).json({ message: "invalid user ID" });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  }
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  }
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

router.use("/:id/posts", validatePost);
router.use("/:id", validateUserId);
router.use("/", validateUser);

module.exports = router;
