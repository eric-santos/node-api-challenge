const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router();

//get, READ
router.get("/:id", (req, res) => {
  db.get(req.params.project_id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

//insert, CREATE
router.post("/", (req, res) => {
  db.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding action" });
    });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;

  db.update(id, action)
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

//remove, DELETE
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

module.exports = router;
