import mongoose from "mongoose";

const generatedCertificateSchema = new mongoose.Schema({
    certificateId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email:{
        type:String,
        required:true
    },
    certificateLink:{
        type:String,
        required: true,
    }
});

const GeneratedCertificates = mongoose.model('GeneratedCertificates', generatedCertificateSchema);
export default GeneratedCertificates;