// routes/members.js
const express = require("express");
const router = express.Router();
const membersController = require("../controllers/executiveMembersController");

// GET all members
router.get("/", membersController.getExecutiveMembers);

// POST a new member
router.post("/", membersController.addExecutiveMember);

// PUT (update) a member by ID
router.put("/:id", membersController.editExecutiveMember);

// DELETE a member by ID
router.delete("/:id", membersController.deleteExecutiveMember);

module.exports = router;
