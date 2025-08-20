import dbConnect from "./lib/dbConnect.js";
import EventType from "./models/EventType.js";

async function main() {
  await dbConnect();

  const seeds = [
    {
      key: "AUTH_LOGIN_ATTEMPT",
      name: "Auth Login Attempt",
      category: "system",
      description: "User attempted to login",
    },
    {
      key: "AUTH_LOGIN_FAILED",
      name: "Auth Login Failed",
      category: "system",
      description: "Login failed (e.g., 404 user not found)",
    },
    {
      key: "AUTH_LOGIN_SUCCESS",
      name: "Auth Login Success",
      category: "system",
      description: "User logged in",
    },
    { key: "USER_REGISTERED", name: "User Registered", category: "system" },
    { key: "DOWNLOAD_SUCCESS", name: "Download Success", category: "system" },
    { key: "DOWNLOAD_FAILED", name: "Download Failed", category: "system" },
    { key: "API_ERROR", name: "API Error", category: "system" },
    { key: "PAYMENT_SUCCESS", name: "Payment Success", category: "system" },
    { key: "PAYMENT_FAILED", name: "Payment Failed", category: "system" },
  ];

  for (const s of seeds) {
    await EventType.updateOne(
      { key: s.key },
      { $setOnInsert: s },
      { upsert: true }
    );
  }
  console.log("Seeded event types");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
