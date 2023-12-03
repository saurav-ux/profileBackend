import express from "express";
const profileRouter = express.Router();
import ProfileData from "../database/schema.js";


//add data
profileRouter.post("/", async (req, res) => {
  try {
    const addData = new ProfileData(req.body);
    if (req.body.first_name == "" || req.last_name == "") {
      res.status(500).send("Please fill input");
    } else {
      await addData.save();
      res.status(200).send(true);
    }
  } catch (error) {
    res.status(500).send("Internal Server Post Errors: ", error);
  }
});


//get domain
profileRouter.get("/domain", async (req, res) => {
  try {
    const uniqueDomains = await ProfileData.distinct('domain');
    const uniqueDomainArray = uniqueDomains.map((domain, index) => ({ id: index + 1, domain }));

    res.status(200).send(uniqueDomainArray);
  } catch (error) {
    res.status(500).send("Internal Server Get Errors: ", error);
  }
});


//get gender
profileRouter.get("/gender", async (req, res) => {
  try {
    const uniqueDomains = await ProfileData.distinct('gender');
    const uniqueDomainArray = uniqueDomains.map((gender, index) => ({ id: index + 1, gender }));

    res.status(200).send(uniqueDomainArray);
  } catch (error) {
    res.status(500).send("Internal Server Get Errors: ", error);
  }
});



//grt data
profileRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await ProfileData.find({}));
  } catch (error) {
    res.status(500).send("Internal Server Get Errors: ", error);
  }
});


//delete
profileRouter.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await ProfileData.findByIdAndDelete(_id);
    res.status(200).send({ status: "Data Deleted" });
  } catch (error) {
    res.status(500).send("Internal Server Errors: ", error);
  }
});


//update
profileRouter.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const newData = req.body; // Assuming the new data is sent in the request body

    // Using findByIdAndUpdate to update the profile data
    const updatedProfile = await ProfileData.findByIdAndUpdate(_id, newData, {
      new: true,
    });

    if (!updatedProfile) {
      return res.status(404).send({ error: "Profile not found" });
    }

    res.status(200).send({ status: "Data Updated", updatedProfile });
  } catch (error) {
    res.status(500).send("Internal Server Error: ", error);
  }
});

//get data by id
profileRouter.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    // Using findById to find the profile data by ID
    const profile = await ProfileData.findById(_id);

    if (!profile) {
      return res.status(404).send({ error: "Profile not found" });
    }

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send("Internal Server Error: ", error);
  }
});



export default profileRouter;
