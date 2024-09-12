import express from 'express';
import { makeChatRequest, makeImageRequest } from './utils/gptUtils.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse content 

app.post('/chat', async (req, res) => {
    const messages = req.body.messages;
    const chatOptions = req.body.chatOptions;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).send('Messages are undefined or have length 0');
    }

    try {
        const response = await makeChatRequest(messages, chatOptions);
        return res.status(200).send({response})
    } catch (err) {
        return res.status(500).send('An error occured while processing the chat request');
    }
})

app.post('/image', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send('The prompt is required')
    }

    try {
        const response = await makeImageRequest(prompt);
        return res.status(200).send({response})
    } catch (err) {
        return res.status(500).send('An error occured while processing the image request');
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

