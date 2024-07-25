const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/translations/:lang", (req, res) => {
  const lang = req.params.lang;
  const filePath = path.join(
    __dirname,
    "translations",
    `${lang.split("-")[0]}.json`
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Translation not found" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.set("Cache-Control", "public, max-age=3600");
      res.json(jsonData);
    } catch (parseError) {
      return res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
