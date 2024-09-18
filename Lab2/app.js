const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const lab2_router = require("./route.js");  


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/lab2",lab2_router);

app.get("/", (req, res) => {
  res.send("Hello to base server"); 
});

app.get("", (req,res) => {
  res.send("PAGE NOT FOUND");
});


app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});

