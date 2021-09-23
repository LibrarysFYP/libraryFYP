const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
// const User = require('../models/userModel');
// const Review = require('../models/reviewModel');
const appSettingSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, 'A appSetting must have a name'],
    },
    contactno:{
        type:Number,
        required: [true, 'A appSetting must have a contactno'],
    },
    logo:{
        type:String,
    },
    favicon:{
        type:String,
    }, 
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


const appSetting = mongoose.model('appSetting', appSettingSchema);

module.exports = appSetting;