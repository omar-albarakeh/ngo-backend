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

// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "https://ngo-v3-omars-projects-52eaefc2.vercel.app",
//   })
// );

// app.use(express.json());

// // Simple endpoint to provide PayPal client ID
// app.get("/config/paypal", (req, res) => {
//   res.json({
//     clientId: process.env.PAYPAL_CLIENT_ID,
//   });
// });

// // Handle PayPal webhook events
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

// // Basic health check
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
///////////workde code ////////
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 10000;

// app.use(cors({ origin: "https://ngo-v3-omars-projects-52eaefc2.vercel.app" }));
// app.use(express.json());

// // Send PayPal client ID to frontend
// app.get("/config/paypal", (req, res) => {
//   res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
// });

// // Send EmailJS config to frontend
// app.get("/config/emailjs", (req, res) => {
//   res.json({
//     serviceId: process.env.EMAILJS_SERVICE_ID,
//     templateId: process.env.EMAILJS_TEMPLATE_ID,
//     publicKey: process.env.EMAILJS_PUBLIC_KEY,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
// });
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import fetch from "node-fetch";
import paypal from "@paypal/paypal-server-sdk";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cron from "node-cron";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use Helmet to secure HTTP headers
app.use(helmet());

// Use express-rate-limit to avoid abuse (limits to 100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);

const allowedOrigins = [
  "https://ngo-v3-omars-projects-52eaefc2.vercel.app",
  "http://localhost:5173",
  "https://ngo-backend-p0rc.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Parse incoming requests
app.use(express.json({ type: "application/json" }));

// Middleware to capture raw body for signature verification
app.use((req, res, next) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    req.rawBody = data;
    next();
  });
});

// Metal prices logic
let goldPricePerGram = null;
let silverPricePerGram = null;

const fetchPrices = async () => {
  const API_URL =
    "https://gold.g.apised.com/v1/latest?metals=XAU,XAG&base_currency=EUR&currencies=EUR&weight_unit=gram";
  const API_KEY = process.env.GOLD_API_KEY;

  try {
    const response = await fetch(API_URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const { XAU, XAG } = data?.data?.metal_prices || {};

    if (!XAU?.price || !XAG?.price) {
      throw new Error("Missing metal prices in API response");
    }

    goldPricePerGram = XAU.price;
    silverPricePerGram = XAG.price;

    console.log("Updated metal prices:", {
      goldPricePerGram,
      silverPricePerGram,
    });
  } catch (err) {
    console.error("Error fetching metal prices:", err.message);
  }
};

// Initial fetch and schedule every 12 hours
fetchPrices();
cron.schedule("0 */12 * * *", fetchPrices);

// Webhook route
app.post("/paypal-webhook", async (req, res) => {
  try {
    const headers = req.headers;
    const transmissionId = headers["paypal-transmission-id"];
    const transmissionTime = headers["paypal-transmission-time"];
    const certUrl = headers["paypal-cert-url"];
    const authAlgo = headers["paypal-auth-algo"];
    const transmissionSig = headers["paypal-transmission-sig"];
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    const webhookEventBody = req.rawBody;

    // Verify signature
    const verifyResponse = await fetch(
      "https://api-m.paypal.com/v1/notifications/verify-webhook-signature",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          auth_algo: authAlgo,
          cert_url: certUrl,
          transmission_id: transmissionId,
          transmission_sig: transmissionSig,
          transmission_time: transmissionTime,
          webhook_id: webhookId,
          webhook_event: JSON.parse(webhookEventBody),
        }),
      }
    );

    const verification = await verifyResponse.json();

    if (verification.verification_status === "SUCCESS") {
      const event = JSON.parse(webhookEventBody);
      if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        console.log("✅ Payment completed:", {
          transactionId: event.resource.id,
          amount: event.resource.amount.value,
          currency: event.resource.amount.currency_code,
          payerEmail: event.resource.payer.email_address,
        });
      }
      res.status(200).send("Webhook verified.");
    } else {
      console.warn("❌ Webhook verification failed.");
      res.status(400).send("Invalid signature.");
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).send("Server error.");
  }
});

// Metal Prices Endpoint
app.get("/api/metal-prices", async (req, res) => {
  if (goldPricePerGram === null || silverPricePerGram === null) {
    await fetchPrices();
  }

  if (goldPricePerGram !== null && silverPricePerGram !== null) {
    res.json({ goldPricePerGram, silverPricePerGram });
  } else {
    res.status(503).json({ error: "Prices not available yet" });
  }
});

// PayPal Config Endpoint
app.get("/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `✅ Secure PayPal webhook server with metal prices running on port ${PORT}`
  );
});
