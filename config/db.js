const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
      //useUnifiedTopology: true
    })
    .then(conn => {
      console.log(
        `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
      );
    })
    .catch(err => {
      throw err;
    });
};

module.exports = connectDB;
