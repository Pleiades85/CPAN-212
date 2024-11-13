const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const recipeRouter = require('./recipes_router');
const app = express();
const PORT = 8001;

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb+srv://Cluster0:z6pOYjdN6LeCOxex@cluster0.64dmp.mongodb.net/Assignment2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


app.use('/recipe', recipeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});