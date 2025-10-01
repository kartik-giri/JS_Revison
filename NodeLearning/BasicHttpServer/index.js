const express = require('express');
const app = express();

app.use(express.json()); // <-- JSON parser middleware

app.post('/user', (req, res) => {
  console.log(req.body);  // parsed JSON object
  res.json({
    success: true,
    receivedData: req.body
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
