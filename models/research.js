const mongoose = require('mongoose');


const getPhilippineTime = () => {
    const currentDate = new Date();
    const timezoneOffset = 8 * 60; // UTC+8 in minutes
    return new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
  };
  
const ResearchDetailsSchema = new mongoose.Schema({
    published: String,
    yearStarted: Number,
    yearCompleted: Number,
    acceptanceDate:Date,
    agency: String,
    region: String,
    createdAt:{
        type:Date,
        default: getPhilippineTime
    },
    updatedAt:{
        type:Date,
        default:getPhilippineTime
    }
});


const ResearchSchema = new mongoose.Schema({
    ResearchName:String,
    Abstract:String,
    Beneficiaries:String,
    Proponents:String,
    FundSource:String,
    NoOfPatents:Number,
    NoOfUtilModel:Number,
    Cite:String,
    Remarks:String,
    Details: ResearchDetailsSchema,
    createdAt:{
        type:Date,
        default: getPhilippineTime
    },
    updatedAt:{
        type:Date,
        default:getPhilippineTime
    }
});

ResearchSchema.pre('save',function(next){
    this.updatedAt = getPhilippineTime();
    next();
});
const ResearchModel = mongoose.model("Research",ResearchSchema,'Research');
module.exports = ResearchModel;