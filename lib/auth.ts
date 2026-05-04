import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

let db: any = null;

if (uri) {
  const client = new MongoClient(uri);
  db = client.db();
}

const databaseConfig = db ? mongodbAdapter(db) : undefined;

export const auth = betterAuth({
  ...(databaseConfig && { database: databaseConfig }),
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
