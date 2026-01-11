import express from "express";
const teamRouter = express.Router();
import TeamData from "../database/addTeamSchema.js";
import ProfileData from "../database/schema.js";

teamRouter.post("/", async (req, res) => {
  try {
    const teams = req.body;

    if (!Array.isArray(teams)) {
      return res.status(400).json({ message: "Payload must be an array" });
    }

    // 1️⃣ Collect all member IDs
    const memberIds = teams.flatMap((team) =>
      team.members.map((m) => (typeof m === "string" ? m : m._id))
    );

    // 2️⃣ Fetch profile data
    const profiles = await ProfileData.find({
      _id: { $in: memberIds },
    });

    if (profiles.length !== memberIds.length) {
      return res.status(400).json({
        message: "Some profile IDs are invalid",
      });
    }

    // 3️⃣ Check availability
    const unavailable = profiles.filter((p) => !p.available);
    if (unavailable.length) {
      return res.status(400).json({
        message: "Some members already assigned to a team",
        members: unavailable.map((u) => u._id),
      });
    }

const teamDocs = teams.flatMap((team) =>
  team.members.map((member) => {
    const memberId = member._id;

    const profile = profiles.find(
      (p) => p._id.toString() === memberId.toString()
    );

    if (!profile) {
      throw new Error(`Profile not found for ID ${memberId}`);
    }

    return {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      gender: profile.gender,
      avatar: profile.avatar,
      domain: profile.domain,
      available: false,
      teamName: team.teamName,
    };
  })
);

    // 5️⃣ Insert into TeamData
    await TeamData.insertMany(teamDocs);

    // 6️⃣ Update ProfileData availability
    await ProfileData.updateMany(
      { _id: { $in: memberIds } },
      { $set: { available: false } }
    );

    res.status(200).json({
      message: "Team created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

//get added team
teamRouter.get("/", async (req, res) => {
  try {
    const teams = await TeamData.aggregate([
      {
        $group: {
          _id: "$teamName",
          members: {
            $push: {
              _id: "$_id",
              first_name: "$first_name",
              last_name: "$last_name",
              email: "$email",
              gender: "$gender",
              avatar: "$avatar",
              domain: "$domain",
              available: "$available",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          teamName: "$_id",
          members: 1,
        },
      },
    ]);

    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Get Error",
      error: error.message,
    });
  }
});

export default teamRouter;
