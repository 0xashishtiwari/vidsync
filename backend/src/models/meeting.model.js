import mongoose, { Schema } from "mongoose";

const meetingSchema = new Schema({
  user_id: {
    type: String,
  },
  meetingCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export {Meeting} ;  // ye tab use krte h jab ek hi js file multipe function export krne hote h

