import mongoose from "mongoose";

const userCertificateDetailsSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    course:{
        type:String,
        required:true
    },
    certificateApprovalDate:{
        type:Date,
        required: true
    }
});

const UserCertificate = mongoose.model('UserCertificate', userCertificateDetailsSchema);
export default UserCertificate;
