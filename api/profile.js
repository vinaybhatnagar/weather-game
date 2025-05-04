const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  const { wallet } = req.query;
  if (!wallet) return res.status(400).json({ error: "Wallet is required" });

  const userRef = db.collection("users").doc(wallet);

  if (req.method === "GET") {
    const snap = await userRef.get();
    if (!snap.exists) return res.json({ name: "" });
    return res.json({ name: snap.data().name || "" });
  }

  if (req.method === "POST") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    await userRef.set({ name }, { merge: true });
    return res.json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
