const Table = require("../models/Table")

const event = async(title, author)=>{
    try {
        const newEvent = new Table({
            event: title,
            user: author._id
        })
        await newEvent.save()
    } catch (error) {
      throw new Error(error)
    }

}

module.exports = event