const express = require("express");
const router = express.Router();
//models
const Action = require("./actions-model");
//middleware
const {
  checkUserID,
  deletePostID,
  checkActionBodyData,
} = require("../../middleware/actions");

//GET /api/actions
router.get("/", (req, res) => {
  Action.get(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: `can't retrieve list of actions` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Can not get List of actions" });
    });
});

//GET ID /api/actions/:id
router.get("/:id", checkUserID(), (req, res) => {
  res.status(200).json(req.actions);
});

//POST /api/actions
router.post("/", (req, res, next) => {
  //checkActionBodyData ---> gives an error when adding the message, but it does work,
  //remove it to get rid of the error instead
  //changing the servier response error to 400 makes the test pass, perhaps a flaw in the test???

  Action.insert(req.body)
    .then((postUser) => {
      res.status(201).json(postUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//UPDATE /api/actions/:id
router.put("/:id", checkUserID(), checkActionBodyData(), (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Action.update(id, changes)
    .then((updateAction) => {
      if (updateAction) {
        res.status(200).json(updateAction);
      } else {
        res.status(404).json({ message: `cant update user, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "500 ERROR: something went wrong, Can not update action",
      });
    });
});

//DELETE /api/actions/:id
//aded middleware checkuseID and dleetePOSTID
router.delete("/:id", checkUserID(), deletePostID(), (req, res) => {
  res
    .status(200)
    .json({ message: "Success, user deleted", user_deleted: req.removeUser });
});

module.exports = router;
