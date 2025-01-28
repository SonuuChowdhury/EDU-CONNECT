import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const RephraseTextByGoogleAPI = express.Router();
RephraseTextByGoogleAPI.use(express.json());

RephraseTextByGoogleAPI.get("/api/rephrase", async (req, res) => {
    const {text}=req.body

    if(!text || text==""){
        return res.status(404).json({msg:"Text is not attached with the request"})
    }

    const apiKey = `${process.env.GenAI_KEY}`;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Please rephrase the provided text to correct any grammatical errors, enhance professionalism, and make it more concise. Ensure the output is written in a friendly and welcoming tone, suitable for notices or announcements, and uses simple, clear, and mid-level English that is easy for most people to understand. Return the result as a single paragraph with no formatting, bullet points, or special markings for seamless use in a frontend application. Here is the text to rephrase: ${text}`;


    try{
      const result = await model.generateContent(prompt);
      return res.status(200).json({text:result.response.text()})
    }catch(err){
      return res.status(500).json({msg:"Failed to rephrase the text provided"})
    }
  }
);
export default RephraseTextByGoogleAPI;
