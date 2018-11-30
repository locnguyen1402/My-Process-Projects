const mongoose = require('mongoose');


// make connection to cloud
mongoose.connect('mongodb://Idol:a123456@ds123783.mlab.com:23783/idol-management', {
    useNewUrlParser: true
});


// create Schema
const IdolSchema = mongoose.Schema({
    name: String,
    phone: String,
    description: String,
    img: String
});

// create and export Idol Model
module.exports = mongoose.model('Idol', IdolSchema);