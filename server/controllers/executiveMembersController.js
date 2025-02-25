const ExecutiveMember = require("../models/executiveMembersSchema");
const mongoose = require("mongoose");

// Add a new executive member
exports.addExecutiveMember = async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const newMember = new ExecutiveMember({ name, role, phone });
    await newMember.save();
    res.status(201).json({
      success: true,
      message: "Executive member added successfully",
      newMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding executive member",
      error: error.message, // Return a user-friendly error message
    });
  }
};

// Get all executive members
exports.getExecutiveMembers = async (req, res) => {
  try {
    const members = await ExecutiveMember.find();
    res.status(200).json({
      success: true,
      message: "Executive members retrieved successfully",
      members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching executive members",
      error: error.message,
    });
  }
};

// Edit an executive member
exports.editExecutiveMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, phone } = req.body;
    const updatedMember = await ExecutiveMember.findByIdAndUpdate(
      id,
      { name, role, phone },
      { new: true, runValidators: true }
    );
    if (!updatedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Executive member not found" });
    }
    res.status(200).json({
      success: true,
      message: "Executive member updated successfully",
      updatedMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating executive member",
      error: error.message,
    });
  }
};

// Delete an executive member
exports.deleteExecutiveMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await ExecutiveMember.findByIdAndDelete(id);
    if (!deletedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Executive member not found" });
    }
    res.status(200).json({
      success: true,
      message: "Executive member deleted successfully",
      deletedMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting executive member",
      error: error.message,
    });
  }
};
