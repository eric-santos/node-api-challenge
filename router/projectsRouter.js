const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/:id", (req, res) => {
  db.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding post" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const projects = req.body;

  db.update(id, projects)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

router.get("/:id/actions", (req, res) => {
  db.getProjectActions(req.params.id)
    .then(projectActions => {
      if (projectActions > 0) {
        res.status(200).json(projectActions);
      } else {
        res.status(404).json({ messages: "No actions for that project" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

module.exports = router;
