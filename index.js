const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const ResearchRouter = require('./routes/research');
const CategoryRouter = require('./routes/category');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://jhonchristianubaldo:christiankyzen@explore-ro8.qqees76.mongodb.net/ro8-explore?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use('/research',ResearchRouter);
app.use('/category',CategoryRouter);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);


app.listen(3001, () => {
  console.log('Server running on port 3001');
});