const mongoose = require('mongoose');

const searchSchema =new mongoose.Schema({
Word :{type: String, required:true}
});

const search =mongoose.model('automatic', searchSchema);

module.exports = { searchSchema, search};

