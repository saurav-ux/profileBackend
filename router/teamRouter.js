import express from "express";
const addteamRouter = express.Router()
import ProfileData from "../database/schema.js";
import TeamData from "../database/addTeamSchema.js";

addteamRouter.get("/:key?", async (req, res) => {
    try {
      const searchTerm = req.params.key || "";
      const regex = new RegExp(searchTerm, "i");
  
      let filterOptions = {};
      if (req.query.gender) {
        filterOptions.gender = req.query.gender;
      }
      if (req.query.domain !== undefined && req.query.domain !== "") {
        filterOptions.domain = req.query.domain;
      }
      if (req.query.available) {
        filterOptions.available = req.query.available;
      }
  
      const baseQuery = {
        $or: [
          { first_name: { $regex: regex } },
          { last_name: { $regex: regex } },
          // Add more fields for search if needed
        ],
        ...filterOptions,
      };
  
      let totalItems;
      if (
        searchTerm === "" &&
        filterOptions.gender === undefined &&
        filterOptions.domain === undefined &&
        filterOptions.available === undefined
      ) {
        totalItems = await ProfileData.countDocuments();
      } else {
        totalItems = await ProfileData.countDocuments(baseQuery);
      }
  
      const data = await ProfileData.find(baseQuery);
  
      res.status(200).send({
        data,
      });
    } catch (error) {
      res.status(500).send("Internal Server Error: " + error);
    }
  });


//add team
 addteamRouter.post("/all", async (req, res) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).send("Please send an array of objects");
      }
  
      const invalidData = req.body.some(item => !item.first_name || !item.last_name);
      if (invalidData) {
        return res.status(400).send("Please provide valid first_name and last_name for each object");
      }
  
      const insertedData = await TeamData.insertMany(req.body);
      res.status(200).send({message:"Data Send Successfully"});
    } catch (error) {
      res.status(500).send("Internal Server Post Errors: " + error);
    }
  });
  
//get added team
addteamRouter.get("/all", async (req, res) => {
    try {
      res.status(200).send(await TeamData.find({}));
    } catch (error) {
      res.status(500).send("Internal Server Get Errors: ", error);
    }
  });

export default addteamRouter

