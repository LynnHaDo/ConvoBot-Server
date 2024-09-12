import OpenAI from "openai";
//import { DevEnvironment } from '../environment/Dev.js';

const openai = new OpenAI({
  apiKey: process.env.openaiAPIKey
});

export const makeChatRequest = async (messages, chatOptions) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        ...chatOptions
      });
    
    if (response.choices) {
        let responseText = response.choices[0].message.content;
        responseText = responseText.replace(/(\r\n|\n|\r)/gm, "");
        return responseText;
    }

    throw new Error("The response is in an unsupported format");
}

export const makeImageRequest = async (prompt, n, size) => {
    const image = await openai.images.generate({ 
        model: "dall-e-2", 
        prompt: prompt,
        n:3,
        size:'256x256'
    });

    if (image.data) {
        return image.data;
    }

    throw new Error("The response is in an unsupported format");
}

