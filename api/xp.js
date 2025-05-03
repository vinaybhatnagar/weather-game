const xpStore = {};

export default function handler(req, res) {
  const { wallet } = req.query;
  res.status(200).json({ xp: xpStore[wallet] || 0 });
}