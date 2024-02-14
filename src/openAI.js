const { OpenAI } = require('openai')
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/api/gpt/text', async (req, res) => {
    try {
        const text = req.body.text;
        const result = await analyzeText(text);
        res.json({ message: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});


async function analyzeText(abstract) {

    let query = `You help those struggling with mental illness by guiding them carefully and empathetically through tough situations.`;

    const messages = [
        {"role": "system", "content": abstract},
        {"role": "user", "content": query}
    ];

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    return completion.choices[0].message.content;
}