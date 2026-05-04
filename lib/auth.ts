import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/book-borrowing";
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
const baseURL = process.env.BETTER_AUTH_URL || vercelUrl || "http://localhost:3000";
const secret = process.env.BETTER_AUTH_SECRET || "super-secret-key-change-in-production";

const client = new MongoClient(uri);

const getTrustedOrigins = () => {
  const origins = ["http://localhost:3000"];
  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`);
  }
  return origins;
};

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  baseURL: baseURL,
  secret: secret,
  trustedOrigins: getTrustedOrigins(),
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
