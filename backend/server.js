import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Why {{name}} is {{location}}'s Sweetest Spot in 2025",
  "Top 5 Reasons {{name}} Dominates {{location}} This Year",
  "{{name}}: The Hidden Gem Every {{location}} Local Loves",
  "{{location}} Can't Get Enough of {{name}}—Here’s Why",
  "{{name}} Sets the Standard for Excellence in {{location}}"
];

function genHeadline(name, location) {
  return headlines[Math.floor(Math.random() * headlines.length)]
    .replace(/{{name}}/g, name)
    .replace(/{{location}}/g, location);
}

function genBusinessData(name, location) {
  return {
    rating: +(Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 300) + 20,
    headline: genHeadline(name, location)
  };
}

app.post('/business-data', (req, res) => {
  const { name = 'Business', location = 'City' } = req.body || {};
  res.json(genBusinessData(name, location));
});

app.get('/regenerate-headline', (req, res) => {
  const { name = 'Business', location = 'City' } = req.query;
  res.json({ headline: genHeadline(name, location) });
});

app.listen(PORT, () =>
  console.log(`GrowthProAI backend running at http://localhost:${PORT}`)
);
