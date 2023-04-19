const mongoose = require('mongoose')

const ResearchSchema = new mongoose.Schema({
    ResearchName:{
        type:String,
        required: true,
    },
    Abstract:{
        type:String,
        required: true,
    },
    Beneficiaries:{
        type:String,
        required: true,
    },
    Proponents:{
        type:String,
        required: true,
    },
    FundSource:{
        type:String,
        required: true,
    },
    NoOfPatents:{
        type:Number,
        required: true,
    },
    NoOfUtilModel:{
        type:Number,
        required: true,
    },
    Cite:{
        type:String,
        required: true,
    },
    Remarks:{
        type:String,
        required: true,
    },
},{
    timestamps:{
        currentTime: () => {
            // Get current UTC date and time
            const currentDate = new Date();
            // Convert to Philippine time
            const timezoneOffset = 8 * 60; // UTC+8 in minutes
            const philippineTime = new Date(currentDate.getTime() + timezoneOffset * 60 * 1000);
            // Return Philippine time as current time for "createdAt" and "updatedAt" fields
            return philippineTime;
        }
    }
});
const ResearchModel = mongoose.model("Research",ResearchSchema,'Research');
module.exports = ResearchModel;