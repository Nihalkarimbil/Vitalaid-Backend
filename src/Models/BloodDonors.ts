import mongoose,{Document,Schema} from "mongoose";

interface DonorType extends Document {
    name:string,
    BloodGroup:string,
    Phone:number,
    Gender:Enumerator,
    Age:number,
    Address:string,
    isDeleted:boolean

}

const BloodDonorschema:Schema <DonorType>= new Schema({
    name:{
        type:String,
        default:"",
        required:true
    },
    BloodGroup:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Gender: {
        type:String,enum:["male","female"],
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const BloodDonor= mongoose.model<DonorType>("BloodDonor",BloodDonorschema)
export default BloodDonor