const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const ResearchRouter = require('./routes/research');

app.use(express.json());
app.use(cors({ origin: '*' }));

mongoose.connect('mongodb+srv://jhonchristianubaldo:christiankyzen@explore-ro8.qqees76.mongodb.net/ro8-explore?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use('/research',ResearchRouter);


app.listen(3001, () => {
  console.log('Server running on port 3001');
});