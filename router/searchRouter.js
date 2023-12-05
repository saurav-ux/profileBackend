import express from "express";
const searchRouter = express.Router();
import ProfileData from "../database/schema.js";

searchRouter.get("/:key?", async (req, res) => {
  try {
    const searchTerm = req.params.key || ""; // Use an empty string if no parameter is provided
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 20; // Default to 20 items per page

    const skip = (page - 1) * limit;

    const regex = new RegExp(searchTerm, "i"); // 'i' flag for case-insensitive search

    // let filterOptions = req.query; // Get filter options from query parameters
    let filterOptions = {};

    // Apply gender filter if provided
    if (req.query.gender) {
      filterOptions.gender = req.query.gender;
    }

    // Apply domain filter if provided and not empty
    if (req.query.domain !== undefined && req.query.domain !== "") {
      filterOptions.domain = req.query.domain;
    }

    if (req.query.available) {
      filterOptions.available = req.query.available;
    }

    // Remove pagination-related parameters and the search term from filter options
    delete filterOptions.page;
    delete filterOptions.limit;
    delete filterOptions.key;


    //----------------search logic---------------------------
    const baseQuery = {
      $or: [
        { first_name: { $regex: regex } },
        { last_name: { $regex: regex } },
        // You can add more fields for search if needed
      ],
    };

    let query = {}; // Initialize an empty query
    query = { ...baseQuery, ...filterOptions }; // Merge filter options with base query
    let totalItems;
    if (
      searchTerm === "" &&
      filterOptions.gender === "" &&
      filterOptions.domain === "" &&
      (filterOptions.available !== true || filterOptions.available !== false)
    ) {
      totalItems = await ProfileData.countDocuments();
    } else {
      totalItems = await ProfileData.countDocuments(query);
    }

    // const totalItems = await ProfileData.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);
    //  console.log("totalpages",totalPages)
    let data;
    if (
      searchTerm === "" &&
      filterOptions.gender === "" &&
      filterOptions.domain === "" &&
      (filterOptions.available !== true || filterOptions.available !== false)
    ) {
      data = await ProfileData.find({}).skip(skip).limit(limit);
    } else {
      data = await ProfileData.find(query).skip(skip).limit(limit);
    }

    const currentPage = Math.min(totalPages, page);

    res.status(200).send({
      data,
      totalPages,
      currentPage,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error);
  }
});





// searchRouter.get('/:key?', async (req, res) => {
//     try {
//         const searchTerm = req.params.key || ''; // Use an empty string if no parameter is provided

//         const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//         const limit = parseInt(req.query.limit) || 20; // Default to 20 items per page

//         const skip = (page - 1) * limit;

//         const regex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive search

//         let filterOptions = req.query; // Get filter options from query parameters

//         // Remove pagination-related parameters and the search term from filter options
//         delete filterOptions.page;
//         delete filterOptions.limit;
//         delete filterOptions.key;

//         const query = {
//             "$or": [
//                 { first_name: { $regex: regex } },
//                 { last_name: { $regex: regex } }
//                 // You can add more fields for search if needed
//             ],
//             ...filterOptions // Merge additional filter options
//         };

//         const totalItems = await ProfileData.countDocuments(query);
//         const totalPages = Math.ceil(totalItems / limit);

//         let data = await ProfileData.find(query)
//             .skip(skip)
//             .limit(limit);

//         const currentPage = Math.min(totalPages, page);

//         res.status(200).send({
//             data,
//             totalPages,
//             currentPage
//         });
//     } catch (error) {
//         res.status(500).send("Internal Server Error: " + error);
//     }
// });

// searchRouter.get('/:key?', async (req, res) => {
//     try {
//         const searchTerm = req.params.key || ''; // Use an empty string if no parameter is provided

//         const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//         const limit = parseInt(req.query.limit) || 20; // Default to 10 items per page

//         const skip = (page - 1) * limit;

//         const regex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive search

//         const totalItems = await ProfileData.countDocuments({
//             "$or": [
//                 { first_name: { $regex: regex } },
//                 { last_name: { $regex: regex } }
//                 // You can add more fields for search if needed
//             ]
//         });

//         const totalPages = Math.ceil(totalItems / limit);

//         let data = await ProfileData.find({
//             "$or": [
//                 { first_name: { $regex: regex } },
//                 { last_name: { $regex: regex } }
//                 // You can add more fields for search if needed
//             ]
//         })
//         .skip(skip)
//         .limit(limit);

//         const currentPage = Math.min(totalPages, page);

//         res.status(200).send({
//             data,
//             totalPages,
//             currentPage
//         });
//     } catch (error) {
//         res.status(500).send("Internal Server Error: " + error);
//     }
// });

// searchRouter.get('/:key?', async (req, res) => {
//     try {
//         const searchTerm = req.params.key || ''; // Use an empty string if no parameter is provided
//       //  console.log("searchTerm", searchTerm);

//         const regex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive search

//         let data = await ProfileData.find({
//             "$or": [
//                 { first_name: { $regex: regex } },
//                 { last_name: { $regex: regex } }
//                 // You can add more fields for search if needed
//             ]
//         });

//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send("Internal Server Error: " + error);
//     }
// });

export default searchRouter;
