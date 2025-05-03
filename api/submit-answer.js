import fetch from 'node-fetch';

const xpStore = {};
const rounds = {};

export default async function handler(req, res) {
  const { wallet, answer } = req.query;
  const city = rounds[wallet];
  if (!city) return res.status(400).json({ error: "No round started." });

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;
  const response = await fetch(url);
  const data = await response.json();
  const code = data.current_weather.weathercode;

  const actual = mapCode(code);
  const correct = actual === answer;

  if (!xpStore[wallet]) xpStore[wallet] = 0;
  if (correct) xpStore[wallet] += 10;

  res.status(200).json({ correct, actual, xp: xpStore[wallet] });
}

function mapCode(code) {
  if ([0, 1].includes(code)) return "Sunny";
  if ([2, 3].includes(code)) return "Cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
  return "Unknown";
}