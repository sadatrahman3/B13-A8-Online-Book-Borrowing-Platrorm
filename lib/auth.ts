import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  console.error("MONGODB_URI is not set!");
} else {
  console.log("MONGODB_URI is set, connecting to database...");
}

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
const baseURL = process.env.BETTER_AUTH_URL || vercelUrl || "http://localhost:3000";
const secret = process.env.BETTER_AUTH_SECRET || "super-secret-key-change-in-production";

const client = new MongoClient(uri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
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
