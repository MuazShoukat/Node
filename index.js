const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const RealEstateData = require("./schema.js"); // Import your schema file

// Find all documents
async function saveDataToMongo(data) {
  try {
    // Create a new document based on the realEstateData model
    const newData = new RealEstateData(data);

    // Save the document to the database
    await newData.save();
    console.log("Data saved to MongoDB:", newData);
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
  }
}

async function findAndDecrementCount(condition) {
  let document;
  try {
    // Find a document that matches the provided condition
    document = await RealEstateData.findById(condition);
    if (!document) {
      console.log("Document not found");
      return;
    }

    // Decrement the countId field by one
    document.countId--;

    // Save the updated document back to the database
    await document.save();

    console.log("Document found and countId decremented:", document);
  } catch (error) {
    console.error("Error finding and decrementing countId:", error);
  }
  return document.countId;
}

const app = express();
const port = 3000;

const url =
  "mongodb+srv://admin-umair:test123@cluster0.xg387ne.mongodb.net/SampleDB";

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("DB Connection Successful");
  } catch (error) {
    console.log("Something went wrong Umair ! : ", error);
  }
};

ConnectToMongo();
app.get("/", async (req, res) => {
  const count = findAndDecrementCount("6526b8a506ac5a6dc4568c12");
  if (findAndDecrementCount("6526b8a506ac5a6dc4568c12") <= 1) res.send([]);

  console.log("count", count);
  axios.get("https://amethyst-butterfly-slip.cyclic.app/");

  // const dataToSave = {
  //     countId: 12345, // Replace with your data
  //   };

  //   saveDataToMongo(dataToSave)

  try {
    const url = "https://realestate-server-cyan.vercel.app/";
    const response = await axios
      .post(
        url,
        {
          flag: "edium",
          url: "https://www.pisos.com/",
        },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        // Handle the response data

        const responseData = response.data;

        // // Specify the file path where you want to save the data

        // console.log(responseData);
        res.send(response.data);
        setTimeout(() => {
          //   const filePath = "response.json";

          //   // Write the data to the file
          //   fs.writeFile(
          //     filePath,
          //     JSON.stringify(responseData, null, 2),
          //     (err) => {
          //       if (err) {
          //         console.error("Error writing to file:", err);
          //       } else {
          //         console.log("Data has been saved to", filePath);
          //       }
          //     }
          //   );
          console.log("Hello World after 1 minute");
        }, 60000);
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/readfile", (req, res) => {
  // Specify the file path
  const filePath = "response.json";

  // Asynchronously read the file and send its contents in the response
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // Handle any errors, such as file not found
      return res.status(500).send("Error reading the file");
    }

    // Send the file contents as the response
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
