// Google drive api
import { google } from "googleapis";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const uploadFileToDrive = async (name) => {
  try {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const oauth2client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });
    google.options({ auth: oauth2client });

    const drive = google.drive({ version: "v3" });
    const filepath = join(__dirname, "..", "public", "temp", `${name}`);
    const response = await drive.files.create({
      requestBody: {
        name: name,
        mimeType: "application/pdf",
      },
      media: {
        body: fs.createReadStream(filepath),
      },
      fields: "id,webViewLink,webContentLink,name",
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return { success: false, error: error.message };
  }
};
export { uploadFileToDrive };
