import express from "express";
const pageRouter = express.Router()
import ProfileData from "../database/schema.js";

pageRouter.get('/', async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 20;

        // Fetch data from the model
        const totalDocs = await ProfileData.countDocuments(); // Get total count of documents
        
        let skip = (page - 1) * limit;
        let apiData = await ProfileData.find().skip(skip).limit(limit);

        const pageData = {
            results: apiData,
            totalPages: Math.ceil(totalDocs / limit),
            currentPage: page
        };

        res.status(200).json(pageData);
    } catch (error) {
        res.status(500).send(`Internal Server Get Errors: ${error}`);
    }
});

export default pageRouter