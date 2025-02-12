// import fs from "fs";

import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

// const serviceAccountPath = "firebase-admin.json";
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

const db = getDatabase();

// console.log(db);

export { db };
