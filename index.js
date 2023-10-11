const axios = require("axios");
const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
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

        console.log(responseData);
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
        // }, 60000);
          console.log("Hello World after 1 minute");
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
