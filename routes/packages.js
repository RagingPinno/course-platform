const express = require("express");
const router = express.Router();
const Package = require("../models/Package");
const User = require("../models/User");

// Skapa paket
router.post("/", async (req, res) => {
  const { title, purpose, courses, plannedActivities } = req.body;
  const newPackage = await Package.create({ title, purpose, courses, plannedActivities });
  await User.findByIdAndUpdate(req.user.uid, { $push: { createdPackages: newPackage._id } });
  res.send(newPackage);
});

// Uppdatera aktivitetsstatus
router.put("/:id/activities/:activityId/status", async (req, res) => {
  const { userId, status } = req.body;
  await Package.updateOne(
    { _id: req.params.id, "plannedActivities._id": req.params.activityId },
    { $set: { "plannedActivities.$.participants.$[participant].status": status } },
    { arrayFilters: [{ "participant.userId": mongoose.Types.ObjectId(userId) }] }
  );
  res.send("Status uppdaterad");
});

module.exports = router;