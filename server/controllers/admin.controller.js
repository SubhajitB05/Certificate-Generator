import UserCertificate from "../models/certificates.user.model.js";
import User from "../models/user.model.js";
import GeneratedCertificates from "../models/generatedCertificates.js";

import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import htmlToPdfmake from 'html-to-pdfmake';
import jsdom from 'jsdom';
import fs from 'fs';
const { JSDOM } = jsdom;


const handleGenerateCertificate = (req, res)=>{
    //
    
}

const handleSaveCertificate = (req, res)=>{

}



export {handleGenerateCertificate, handleSaveCertificate};