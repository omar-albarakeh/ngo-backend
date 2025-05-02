import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Only once at the top

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Send PayPal client ID to frontend
app.get("/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Send EmailJS config to frontend
app.get("/config/emailjs", (req, res) => {
  res.json({
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("PayPal Client ID:", process.env.PAYPAL_CLIENT_ID);
  console.log("EmailJS Service ID:", process.env.EMAILJS_SERVICE_ID);
});
