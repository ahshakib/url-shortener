import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Mongoose connected")
})
.catch(() => {
  console.log("Mongoose not connected")
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

app.use(cors({
  origin: 'https://url-shortener-one-bice.vercel.app/' // Adjust this based on your frontend's address
}));

app.use(express.json());

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const url = await Url.findOne({ originalUrl })
  if(url) {
    const shortUrl = url.shortUrl
    return res.json({ originalUrl, shortUrl });
  }
  const shortUrl = nanoid(8); // Generate a short URL with 8 characters
  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();
  res.json({ originalUrl, shorturl });
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
