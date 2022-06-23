const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 3002;
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/", async (req, res) => {
  try {
    const response = await axios(process.env.STEPZEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Apikey ${process.env.STEPZEN_AUTH}`
      },
      data: req.body,
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.log("error", error.response);
  }
});

app.listen(PORT, () => {
  console.log(`App is running on *${PORT}`);
});
