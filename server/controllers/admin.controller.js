import UserCertificate from "../models/certificates.user.model.js";
import GeneratedCertificates from "../models/generatedCertificates.js";
import {uploadFileToDrive} from '../utils/drive.api.js';


const handleGenerateCertificate = async (req, res) => {
    try {
        const { name, email, course, date } = req.body;

        // Get the uploaded file info from req.file
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a new certificate record in the database
        const newCertificate = await UserCertificate.create({
            fullName: name,
            email,
            course,
            certificateApprovalDate: date,
        });
        if (!newCertificate) {
            return res.status(400).json({ message: 'Failed to create certificate' });
        }

        // Upload the file to Google Drive or wherever necessary
        const uploadResponse = await uploadFileToDrive(`${email}_certificate.pdf`);
        if (!uploadResponse) {
            return res.status(400).json({ message: 'Failed to upload file to drive' });
        }

        // Create the generated certificate link record
        const newGeneratedCertLink = await GeneratedCertificates.create({
            certificateId: newCertificate._id,
            email,
            certificateLink: uploadResponse.webViewLink,
        });
        if (!newGeneratedCertLink) {
            return res.status(400).json({ message: 'Failed to create generated certificate link' });
        }

        return res.status(200).json({
            message: 'Certificate generated successfully',
            certificateLink: newGeneratedCertLink.certificateLink,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
        });
    }
};



export {handleGenerateCertificate};