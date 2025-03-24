// functions/index.js

const functions = require("firebase-functions");
const {Storage} = require("@google-cloud/storage");
const express = require("express");
const multer = require("multer");

// Initialize Google Cloud Storage
const storage = new Storage();
const bucket = storage.bucket("https://console.firebase.google.com/u/0/project/poomas-backend/storage/poomas-backend.appspot.com/files"); // Replace with your bucket name

const app = express();
const upload = multer({storage: multer.memoryStorage()});

// Function to upload files to Firebase Storage
const uploadToFirebaseStorage = (file, folder) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(`${folder}/${Date.now()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => reject(err));
    blobStream.on("finish", () => {
      blob.makePublic().then(() => {
        resolve(blob.publicUrl());
      });
    });

    blobStream.end(file.buffer);
  });
};

app.post(
    "/upload",
    upload.fields([
      {name: "images", maxCount: 20},
      {name: "videos", maxCount: 20},
    ]),
    async (req, res) => {
      try {
        const imageUrls = await Promise.all(
            req.files.images.map((image) => uploadToFirebaseStorage(image, "images")),
        );
        const videoUrls = await Promise.all(
            req.files.videos.map((video) => uploadToFirebaseStorage(video, "videos")),
        );
        res.status(201).json({imageUrls, videoUrls});
      } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).json({message: "Failed to upload files"});
      }
    },
);

exports.uploadFiles = functions.https.onRequest(app);
