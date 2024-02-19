const { OpenAI } = require('openai')
require('dotenv').config({ path: '../../.env' });
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const { resolve } = require('path');

process.env.GOOGLE_APPLICATION_CREDENTIALS='./application_default_credentials.json';

const client = new textToSpeech.TextToSpeechClient();

async function transformTexttoSpeechWithGoogle(text, outputFile ){
    try{const request = {
        input: {text},
        voice: { languageCode: 'en_US', ssmlGender: 'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'}
    };

    const [response] = await client.synthesizeSpeech(request);
    console.log(response);
    fs.writeFileSync(outputFile,response.audioContent,'binary');
    return outputFile;
    }catch(error){
    console.error('ERROR:', error);
    }
}


async function generateAudio(text) {
    transformTexttoSpeechWithGoogle(text, '../Chat/output.mp3')
}

// (async()=> {
//     transformTexttoSpeechWithGoogle('Test text I want to hear', 'output.mp3')
// })()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.use('/audio', express.static('response/'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, 'recording.wav')
    }
});

const upload = multer({ storage: storage });

const bodyParserMiddleware = express.json();
app.use((req, res, next) => {
    if (req.path === '/api/gpt/audio') {
        // Skip body parser for file upload route
        next();
    } else {
        // Use body parser for other routes
        bodyParserMiddleware(req, res, next);
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/gpt/audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const raw_text = await run(req.file.path);
        const convo = await generate_response(raw_text);
        const outputFile = await generateAudio(convo);

        // const fileUrl = `${req.protocol}://${req.get('host')}/audio/${outputFile}`;
        res.json({ user: raw_text, bot: convo });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
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

async function transcribeAudio(audiofile){
    try{
        const speechClient = new speech.SpeechClient();
        
        const file =fs.readFileSync(audiofile);
        const audioBytes = file.toString('base64');

        const audio = {
            content: audioBytes
        };

        const config = {
            // encoding:'LINEAR16',
            // sampleRateHertz:44100,
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

async function run(filepath) {
    // const data = await transcribeAudio('./recording.wav');
    const data = await transcribeAudio(filepath);
    // console.log(data[0].results[0].alternatives)
    // console.log(data[0].results.map(r=>r.alternatives[0].transcript).join('\n'));
    return data[0].results.map(r=>r.alternatives[0].transcript)[0];
}

async function demo() {
    st = await run('./uploads/recording.wav');
    console.log(st[0]);
    ab = await generate_response(st[0]);
    generateAudio(ab);
}

// demo();