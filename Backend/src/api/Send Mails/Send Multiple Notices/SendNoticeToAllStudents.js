import express from "express";
import dotenv from "dotenv";
import SendNotice from "../../../mails/Student/SendNotice.js"; // Assuming this sends emails

dotenv.config();

const SendNoticeToAllStudents = express.Router();
SendNoticeToAllStudents.use(express.json());

SendNoticeToAllStudents.put("/api/notice/multiple", async (req, res) => {
  const { EmailList, regarding, ByName, ByPosition, content } = req.body;
  if (!EmailList || EmailList.length === 0) {
    return res.status(400).json({ error: "EmailList is required" });
  }
  const io = req.io; // Access Socket.IO instance from the request
  const totalEmails = EmailList.length;
  try {
    let successCount = 0;
    await Promise.all(
      EmailList.map(async (email, index) => {
        try {
          // Call your email sending function
          await SendNotice(email, regarding, ByName, ByPosition, content);
          successCount++;
          // Emit progress to clients
          io.emit("emailProgress", {
            email,
            progress: Math.round(((index + 1) / totalEmails) * 100), // Progress percentage
          });
        } catch (error) {
          console.error(`Failed to send email to ${email}:`, error);
        }
      })
    );
    // Emit completion event
    io.emit("emailComplete", {
      message: `${successCount} out of ${totalEmails} emails sent successfully.`,
    });

    return res.status(200).json({
      message: `${successCount} emails sent successfully.`,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    io.emit("emailError", { message: "An error occurred while sending emails." });
    return res.status(500).json({ error: "Failed to send notices." });
  }
});

export default SendNoticeToAllStudents;
