import express from "express";
const teamRouter = express.Router();
import TeamData from "../database/addTeamSchema.js";

//add team
teamRouter.post("/", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).send("Please send an array of objects");
    }

    const invalidData = req.body.some(
      (item) => !item.first_name || !item.last_name
    );
    if (invalidData) {
      return res
        .status(400)
        .send("Please provide valid first_name and last_name for each object");
    }

    const insertedData = await TeamData.insertMany(req.body);
    //console.log("inert",insertedData)
    if (insertedData.length !== 0) {
      res.status(200).send({ message: "Data Send Successfully" });
    } else {
      res
        .status(400)
        .send("Please provide valid first_name and last_name for each object");
    }
  } catch (error) {
    res.status(500).send("Internal Server Post Errors: " + error);
  }
});

//get added team
teamRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await TeamData.find({}));
  } catch (error) {
    res.status(500).send("Internal Server Get Errors: ", error);
  }
});

export default teamRouter;
