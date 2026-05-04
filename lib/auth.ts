import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI || "";

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
const baseURL = process.env.BETTER_AUTH_URL || vercelUrl || "http://localhost:3000";
const secret = process.env.BETTER_AUTH_SECRET || "super-secret-key-change-in-production";

let db: any;
let client: MongoClient | undefined;

if (uri) {
  try {
    client = new MongoClient(uri);
    db = client.db();
  } catch (e) {
    console.error("MongoDB connection failed:", e);
  }
}

export const auth = betterAuth({
  database: db ? mongodbAdapter(db, { client }) : undefined,
  baseURL: baseURL,
  secret: secret,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
