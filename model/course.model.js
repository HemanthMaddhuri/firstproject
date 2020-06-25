const mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
Student:{
    type : String,
    required : "Required"
},
studentId :{
    type: String
},
Marks : {
    type: String
}

});

mongoose.model("Course", CourseSchema)

