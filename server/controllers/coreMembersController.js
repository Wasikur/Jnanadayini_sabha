// controllers/membersController.js
const CoreMember = require("../models/coreMemberSchema");
const mongoose = require("mongoose");

// Add a new core member
exports.addCoreMember = async (req, res) => {
  try {
    const { name, year, role } = req.body;
    const newMember = new CoreMember({ name, year, role });
    await newMember.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Core member added successfully",
        newMember,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding core member", error });
  }
};

// Get all core members
exports.getCoreMembers = async (req, res) => {
  try {
    const members = await CoreMember.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Core members retrieved successfully",
        members,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching core members", error });
  }
};

// Edit a core member
exports.editCoreMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, role } = req.body;
    const updatedMember = await CoreMember.findByIdAndUpdate(
      id,
      { name, year, role },
      { new: true, runValidators: true }
    );
    if (!updatedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Core member not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Core member updated successfully",
        updatedMember,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating core member", error });
  }
};

// Delete a core member
exports.deleteCoreMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await CoreMember.findByIdAndDelete(id);
    if (!deletedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Core member not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Core member deleted successfully",
        deletedMember,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting core member", error });
  }
};
