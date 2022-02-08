const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        default: "",
        trim: true,
      },
      lastName: {
        type: String,
        default: "",
        trim: true,
      },
      age: {
        type: Number,
        required: true,
        trim: true,
      },
      phone: {
        type: Number,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        default: "",
        trim: true,
      },
      city: {
        type: String,
        default: "",
        trim: true,
      },
      password: {
        type: String,
        default: "",
        trim: true,
      },
      confrimpassword: {
        type: String,
        default: "",
        trim: true,
      }, 
      roles: {
        type: Array,
        default: ["admin"],
        trim: true

      }
    },
    {
      timestamps: true,
    }
  );

  var studnetData = mongoose.model("studnetData", StudentSchema);
  module.exports = studnetData;