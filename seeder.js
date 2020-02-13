const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Symbol = require('./models/Symbol');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
  //useUnifiedTopology: true
});

//Read JSON files
const symbols = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/symbols.json`, 'utf-8')
);

//Import into DB
const importData = async () => {
  try {
    await Symbol.create(symbols);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Symbol.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '-i') {
  importData();
} else if (process.argv[2] == '-d') {
  deleteData();
}
