const express = require("express");
const router = express.Router();
const ProjectModel = require("./projects-model");

//GET /api/projects
router.get("/", (req, res) => {
  ProjectModel.get(req.params.id)
    .then((getProjects) => {
      if (getProjects) {
        res.status(200).json(getProjects);
      } else {
        res.status(404).json({ message: `can't retrieve list of Projects` });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: " 500 error: Can not get List of Projects" });
    });
});

//GET /api/projects/:id
router.get("/:id", (req, res) => {
  ProjectModel.get(req.params.id)
    .then((projectID) => {
      if (projectID) {
        res.status(200).json(projectID);
      } else {
        res
          .status(404)
          .json({ message: `can't find Project Id#${req.params.id}` });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: " 500 error: Can not get List of Projects" });
    });
});

//GET /api/projects/:id/actions
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  ProjectModel.getProjectActions(id)
    .then((projectID) => {
      if (projectID) {
        res.status(200).json(projectID);
      } else {
        res
          .status(404)
          .json({ message: `can't find Project Id#${req.params.id}` });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: " 500 error: Can not get List of Projects" });
    });
});

//POST /api/projects
router.post("/", (req, res) => {
  ProjectModel.insert(req.body)
    .then((newProject) => {
      if (newProject) {
        res.status(201).json(newProject);
      } else {
        res
          .status(400)
          .json({ message: `can't post project, error${req.body}` });
      }
    })
    .catch((error) => {
      console.log(error);
      //should be 500, but the test requires a 400 instead
      res.status(400).json({ message: " 400 error: Can not post project" });
    });
});

//UPDATE /api/projects/:id
router.put("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  ProjectModel.update(id, changes)
    .then((updateProject) => {
      if (updateProject) {
        res.status(200).json(updateProject);
      } else {
        res.status(404).json({ message: `cant update project, 404 error` });
      }
    })
    .catch((error) => {
      res.status(400).json({
        //should be a 500, but test requires a 400 instead
        message: "400 ERROR: something went wrong, Can not update project",
      });
    });
});

//DELETE /api/projects/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ProjectModel.remove(id)
    .then((removeProject) => {
      if (removeProject) {
        res.status(200).json({
          message: `Success, project #${id} deleted`,
          project_deleted: removeProject,
        });
      } else {
        res.status(404).json({ message: `cant update user, 404 error` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "500 ERROR: Cant delete project",
      });
    });
});

module.exports = router;
