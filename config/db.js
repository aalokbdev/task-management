const mongoose = require('mongoose');
module.exports = {
    connectDB: async () => {
      try {
        await mongoose.connect("mongodb+srv://dekalme:ELkDBx0q4lzorHPW@cluster0.gxj7w.mongodb.net/taskManager?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected');
      } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
      }
    },
  };