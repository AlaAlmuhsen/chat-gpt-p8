import {Configuration , OpenAIApi} from 'openai';
import express, { response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    // organization: "org-gNGh2t2WYIC9ERDLsocPHEI3",
    // apiKey: "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"
});

const openai = new OpenAIApi(configuration);

app.post('/' , async (request , response) => {
    const {chats} = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role:"user", 
                content:"You are ebereGPT You can write email and letter."
            },
            ...chats
        ]
    });
    response.json({
        output: result.data.choices[0].messages
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})