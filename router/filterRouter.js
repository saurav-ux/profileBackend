import express from "express";
const filterRouter = express.Router()
import ProfileData from "../database/schema.js";
//filtering

filterRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 20; // Default to 10 items per page

        const skip = (page - 1) * limit;

        // Extract filter options from the query parameters
        let filterOptions = req.query;
        
        // Remove pagination-related parameters from filter options
        delete filterOptions.page;
        delete filterOptions.limit;

        const totalItems = await ProfileData.countDocuments(filterOptions);
        const totalPages = Math.ceil(totalItems / limit);

        let data1 = await ProfileData.find(filterOptions)
            .skip(skip)
            .limit(limit);

        const currentPage = Math.min(totalPages, page);

        res.status(200).send({
            data: data1,
            totalPages,
            currentPage
        });
    } catch (error) {
        res.status(500).send(`Internal Server Get Errors: ${error}`);
    }
});


// filterRouter.get('/', async (req, res) => {
//     try {
//         const data1 = await ProfileData.find(req.query);
//         res.status(200).send(data1);
//     } catch (error) {
//         res.status(500).send(`Internal Server Get Errors: ${error}`);
//     }
// });


// filterRouter.get('/',async(req,res)=>{

//     try {
//         let page = Number(req.query.page) || 1;
//         let limit = Number(req.query.limit) || 3;
//         let skip = (page-1)*limit;
//         apiData = apiData.skip(skip).limit(limit);
//         const pageData = await apiData;
//         res.status(200).send(pageData)
//     } catch (error) {
//         res.status(500).send(`Internal Server Get Errors: ${error}`);
//     }
  
// })

// Assuming apiData is a model


// filterRouter.get('/', async (req, res) => {
//     try {
//         let page = Number(req.query.page) || 1;
//         let limit = Number(req.query.limit) || 3;

//         // Fetch data from the model
//         const totalDocs = await ProfileData.countDocuments(); // Get total count of documents
        
//         let skip = (page - 1) * limit;
//         let apiData = await ProfileData.find().skip(skip).limit(limit);

//         const pageData = {
//             results: apiData,
//             totalPages: Math.ceil(totalDocs / limit),
//             currentPage: page
//         };

//         res.status(200).json(pageData);
//     } catch (error) {
//         res.status(500).send(`Internal Server Get Errors: ${error}`);
//     }
// });


export default filterRouter