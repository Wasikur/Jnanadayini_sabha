// routes/members.js
const express = require("express");
const router = express.Router();
const membersController = require("../controllers/coreMembersController");

// GET all members
router.get("/", membersController.getCoreMembers);

// POST a new member
router.post("/", membersController.addCoreMember);

// PUT (update) a member by ID
router.put("/:id", membersController.editCoreMember);

// DELETE a member by ID
router.delete("/:id", membersController.deleteCoreMember);

module.exports = router;
