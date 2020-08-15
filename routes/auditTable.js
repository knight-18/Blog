const express = require("express")
const Table = require("../models/Table")
const CatchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const authMiddleware = require("../middleware/auth")
const {Parser} = require("json2csv")
const router = express.Router()

const formatTime = (createdAt)=>{
    const time = new Date(createdAt)
    return time.toString().substr(0,24)
  }

const auditTable = CatchAsync(async(req, res, next)=>{
    const events = await Table.find({})
    if(!events){
        return next(new AppError("No able to find events", 400))
    }
    const arr = [];
    events.forEach(eve =>{
        var newEvent = {
            _id: eve._id,
            Event: eve.event,
            eventTime: formatTime(eve.createdAt)
        }
        arr.push(newEvent)
    }) 
 
    const fields = [
        {
            label: "Event Id",
            value: "_id"
        },{
            label: "Event",
            value: "Event"
        },
        {
            label: "Event Time",
            value: "eventTime"
        }
    ]
    const json2csvParser = new Parser({fields})
    const eventsCsv = json2csvParser.parse(arr)
    return res.status(200).send(eventsCsv)
})

module.exports = auditTable