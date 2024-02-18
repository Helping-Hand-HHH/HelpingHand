const { OpenAI } = require('openai')
require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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
        const result = await generate_response(text);
        res.json({ message: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});

app.get('/api/gpt/question', async (req, res) => {
    try {
        const result = await generate_question();
        res.json({ message: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: process.env.IBM_WATSON_API_KEY,
    }),
    serviceUrl: process.env.IBM_WATSON_SERVICE_KEY,
});

app.post('/api/gpt/audio', upload.single('audio'), async (req, res) => {
    try {
        const params = {
            audio: fs.createReadStream(req.file.path),
            contentType: 'audio/wav',
        };
        speechToText.recognize(params)
        .then(response => {
            try {
                res.json(response.result);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send('Error processing request');
            }
        })
        .catch(err => {
            console.error('Error:', err);
            res.status(500).send('Error processing request');
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});

async function generate_response(input) {

    let query = `You help those struggling with mental illness by guiding them carefully and empathetically through tough situations. Guide the user.`;

    const messages = [
        {"role": "system", "content": input},
        {"role": "user", "content": query}
    ];

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    return completion.choices[0].message.content;
}

async function generate_question() {
    let input = '';
    let query = `Generate one question and one question only to help lift spirit.`;

    const messages = [
        {"role": "system", "content": input},
        {"role": "user", "content": query}
    ];

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    });

    return completion.choices[0].message.content;
}