import mongoose  from "mongoose";

const appSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    docId:{type:String,required:true},
    slotDate:{type:String,required:true},
    slotTime:{type:String,required:true},
    userData:{type:Object,required:true},
    docData:{type:Object,required:true},
    amount:{type:Number,required:true},
    date:{type:Number,required:true},
    canceled:{type:Boolean,required:false},
    payment:{type:Boolean,required:false},
    isCompleted:{type:Boolean,required:false}

})
const appModel=mongoose.models.appointment || mongoose.model('appointment',appSchema)
export default appModel