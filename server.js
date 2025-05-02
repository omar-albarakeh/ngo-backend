// // server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import fetch from "node-fetch";
// import cron from "node-cron";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // --- METAL PRICES LOGIC START ---
// let goldPricePerGram = null;
// let silverPricePerGram = null;

// const fetchPrices = async () => {
//   const API_URL =
//     "https://gold.g.apised.com/v1/latest?metals=XAU,XAG&base_currency=EUR&currencies=EUR&weight_unit=gram";
//   const API_KEY = process.env.GOLD_API_KEY;

//   try {
//     const response = await fetch(API_URL, {
//       headers: {
//         "x-api-key": API_KEY,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     const { XAU, XAG } = data?.data?.metal_prices || {};

//     if (!XAU?.price || !XAG?.price) {
//       throw new Error("Missing metal prices in API response");
//     }

//     goldPricePerGram = XAU.price;
//     silverPricePerGram = XAG.price;

//     console.log("Updated metal prices:", {
//       goldPricePerGram,
//       silverPricePerGram,
//     });
//   } catch (err) {
//     console.error("Error fetching metal prices:", err.message);
//   }
// };

// // Initial fetch
// fetchPrices();

// // Schedule fetch every 12 hours
// cron.schedule("0 */12 * * *", fetchPrices);

// // Endpoint to serve metal prices
// app.get("/api/metal-prices", async (req, res) => {
//   if (goldPricePerGram === null || silverPricePerGram === null) {
//     await fetchPrices();
//   }

//   if (goldPricePerGram !== null && silverPricePerGram !== null) {
//     res.json({ goldPricePerGram, silverPricePerGram });
//   } else {
//     res.status(503).json({ error: "Prices not available yet" });
//   }
// });
// // --- METAL PRICES LOGIC END ---

// // PayPal Config Endpoint
// app.get("/config/paypal", (req, res) => {
//   res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
// });

// // EmailJS Config Endpoint
// app.get("/config/emailjs", (req, res) => {
//   res.json({
//     serviceId: process.env.EMAILJS_SERVICE_ID,
//     templateId: process.env.EMAILJS_TEMPLATE_ID,
//     publicKey: process.env.EMAILJS_PUBLIC_KEY,
//   });
// });

// app.get("/", (req, res) => {
//   res.send("NGO backend is running.");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js

//server.js tb3 gaby
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import fetch from "node-fetch";
// import cron from "node-cron";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // --- METAL PRICES LOGIC START ---
// let goldPricePerGram = null;
// let silverPricePerGram = null;

// const fetchPrices = async () => {
//   const API_URL =
//     "https://gold.g.apised.com/v1/latest?metals=XAU,XAG&base_currency=EUR&currencies=EUR&weight_unit=gram";
//   const API_KEY = process.env.GOLD_API_KEY;

//   try {
//     const response = await fetch(API_URL, {
//       headers: {
//         "x-api-key": API_KEY,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     const { XAU, XAG } = data?.data?.metal_prices || {};

//     if (!XAU?.price || !XAG?.price) {
//       throw new Error("Missing metal prices in API response");
//     }

//     goldPricePerGram = XAU.price;
//     silverPricePerGram = XAG.price;

//     console.log("Updated metal prices:", {
//       goldPricePerGram,
//       silverPricePerGram,
//     });
//   } catch (err) {
//     console.error("Error fetching metal prices:", err.message);
//   }
// };

// // Initial fetch and schedule every 12 hours
// fetchPrices();
// cron.schedule("0 */12 * * *", fetchPrices);

// // Endpoint to serve metal prices
// app.get("/api/metal-prices", async (req, res) => {
//   if (goldPricePerGram === null || silverPricePerGram === null) {
//     await fetchPrices();
//   }

//   if (goldPricePerGram !== null && silverPricePerGram !== null) {
//     res.json({ goldPricePerGram, silverPricePerGram });
//   } else {
//     res.status(503).json({ error: "Prices not available yet" });
//   }
// });
// // --- METAL PRICES LOGIC END ---

// // PayPal config endpoint
// app.get("/config/paypal", (req, res) => {
//   res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
// });

// app.post("/paypal-webhook", express.json(), (req, res) => {
//   console.log("Received PayPal webhook:", req.body);

//   const eventType = req.body.event_type;
//   const resource = req.body.resource;

//   if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
//     console.log("Payment completed:", {
//       transactionId: resource.id,
//       amount: resource.amount.value,
//       currency: resource.amount.currency_code,
//       payerEmail: resource.payer.email_address,
//     });
//   }

//   res.status(200).send("OK");
// });

// app.get("/config/emailjs", (req, res) => {
//   res.json({
//     serviceId: process.env.EMAILJS_SERVICE_ID,
//     templateId: process.env.EMAILJS_TEMPLATE_ID,
//     publicKey: process.env.EMAILJS_PUBLIC_KEY,
//   });
// });

// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK" });
// });

// app.get("/", (req, res) => {
//   res.send("NGO backend is running.");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://ngo-backend-p0rc.onrender.com",
  })
);

app.use(express.json());

// Simple endpoint to provide PayPal client ID
app.get("/config/paypal", (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

// Handle PayPal webhook events
app.post("/paypal-webhook", express.json(), (req, res) => {
  console.log("Received PayPal webhook:", req.body);

  const eventType = req.body.event_type;
  const resource = req.body.resource;

  if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
    console.log("Payment completed:", {
      transactionId: resource.id,
      amount: resource.amount.value,
      currency: resource.amount.currency_code,
      payerEmail: resource.payer.email_address,
    });
  }

  res.status(200).send("OK");
});

// Basic health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
