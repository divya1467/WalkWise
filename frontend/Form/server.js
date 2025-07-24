const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/api/save-feedback", (req, res) => {
  const { source, destination, rating, reason } = req.body;

  if (!source || !destination || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const entry = {
    source,
    destination,
    rating,
    reason,
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(__dirname, "userFeedback.json");
  const existingData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  existingData.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  res.status(200).json({ message: "Feedback saved" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
