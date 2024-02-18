const { OpenAI } = require('openai')
require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const speech = require('@google-cloud/speech');
const fs = require('fs');
const { resolve } = require('path');

process.env.GOOGLE_APPLICATION_CREDENTIALS='./application_default_credentials.json';

async function transcribeAudio(audiofile){
    try{
        const speechClient = new speech.SpeechClient();
        
        const file =fs.readFileSync(audiofile);
        const audioBytes = file.toString('base64');

        const audio = {
            content: audioBytes
        };

        const config = {
            //encoding:'LINEAR16',
            //sampleRateHertz:44100,
            languageCode:'en-US'

        }
        return new Promise((resolve,reject)=>{
            speechClient.recognize({audio,config})
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                reject(error);
            })
        })
    }catch(error){
        console.error('ERROR:', error);
    }
}
 
(async()=>{
    const data = await transcribeAudio('./recording.wav');
    console.log(data[0].results[0].alternatives)
    console.log(data[0].results.map(r=>r.alternatives[0].transcript).join('\n'));
})()

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

async function generate_response(input) {

    let query = `Respond to the user empathetically and conversationally.`;

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