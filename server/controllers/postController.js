const Post = require("../models/Post");
const CoverImage = require("../models/CoverImage");
const path = require("path");
const fs = require("fs");
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// Create a new post with a cover image
const createPost = async (req, res) => {
  try {
    const { title, tags, bodyText } = req.body; // Get post data from request body
    console.log("Received data for new post:", { title, tags, bodyText });

    const coverImageFile = req.file; // Assuming you're using `upload.single` for cover image uploads

    const newPost = new Post({ title, tags, bodyText });
    const savedPost = await newPost.save();
    console.log("New post created with ID:", savedPost._id);

    if (coverImageFile) {
      const coverImage = new CoverImage({
        filename: coverImageFile.filename,
        path: coverImageFile.path,
        post: savedPost._id,
      });

      await coverImage.save();
      console.log("Cover image saved with ID:", coverImage._id);

      savedPost.coverImage = coverImage._id;
      await savedPost.save();
      console.log("Cover image associated with post ID:", savedPost._id);
    }

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Update an existing post and its cover image
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, tags, bodyText } = req.body;
  const newCoverImageFile = req.file;

  try {
    console.log("Updating post with ID:", id);
    const post = await Post.findById(id).populate("coverImage");

    if (!post) {
      console.warn("Post not found with ID:", id);
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title || post.title;
    post.tags = tags || post.tags;
    post.bodyText = bodyText || post.bodyText;
    console.log("Updated post fields:", {
      title: post.title,
      tags: post.tags,
      bodyText: post.bodyText,
    });

    if (newCoverImageFile && post.coverImage) {
      const oldImagePath = path.resolve(
        __dirname,
        "..",
        post.coverImage.path.replace(`${SERVER_URL}/`, "")
      );
    
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old cover image deleted:", oldImagePath);
      }
    

      const coverImagePath = `uploads/cover_images/${newCoverImageFile.filename}`;
      post.coverImage.filename = newCoverImageFile.originalname;
      post.coverImage.path = coverImagePath;
      await post.coverImage.save();
      console.log("Cover image updated for post ID:", post._id);
    }

    const updatedPost = await post.save();
    console.log("Post updated successfully:", updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a post and its cover image
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Deleting post with ID:", id);
    const post = await Post.findById(id).populate("coverImage");

    if (!post) {
      console.warn("Post not found with ID:", id);
      return res.status(404).json({ message: "Post not found" });
    }

    const imagePath = path.resolve(
      __dirname,
      "..",
      post.coverImage.path.replace(`${SERVER_URL}/`, "")
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log("Cover image deleted from filesystem:", imagePath);
    }

    await CoverImage.findByIdAndDelete(post.coverImage._id);
    await Post.findByIdAndDelete(id);
    console.log(
      "Post and associated cover image deleted successfully for ID:",
      id
    );

    res
      .status(200)
      .json({ message: "Post and cover image deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all posts with cover images populated
const getPosts = async (req, res) => {
  try {
    console.log("Fetching all posts with cover images.");
    const posts = await Post.find().populate("coverImage");
    console.log("Posts retrieved successfully:", posts.length);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by ID with cover image populated
const getPostById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameter
  try {
    const post = await Post.findById(id).populate("coverImage"); // Find the post by its ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post); // Return the found post as a JSON response
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post", error }); // Handle any errors
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
};
