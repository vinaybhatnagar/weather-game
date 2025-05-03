let rounds = {};

export default function handler(req, res) {
  const { wallet } = req.query;
  const cities = [
    { name: "London", lat: 51.50853, lng: -0.12574 },
    { name: "Chengdu", lat: 30.66667, lng: 104.06667 },
    { name: "Cairo", lat: 30.04442, lng: 31.23571 }
  ];
  const city = cities[Math.floor(Math.random() * cities.length)];
  rounds[wallet] = city;
  res.status(200).json({ city });
}