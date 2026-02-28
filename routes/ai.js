const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Ensure apiKey is retrieved properly, default to a string if missing locally
const getAiInstance = () => new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || 'MISSING_KEY'
});

// GENERATE SMART TEST
router.post('/generate-test', async (req, res) => {
    try {
        const { subject, unit, difficulty } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ msg: 'AI features are currently unavailable (missing API key).' });
        }

        const ai = getAiInstance();

        const prompt = `
            You are an expert ${subject} professor. 
            Create a challenging ${difficulty} level multiple-choice quiz for university students strictly on Unit ${unit} of the subject: ${subject}. 
            Do NOT generate generic math questions unless the subject is mathematics.
            The quiz must have exactly 10 questions.
            Return the result ONLY as a valid JSON array of objects. Do not include any markdown formatting like \`\`\`json.
            Each object must strictly match this format:
            {
                "question": "The question text",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": 0, // Integer 0-3 corresponding to the correct option index
                "explanation": "A concise explanation of why the answer is correct."
            }
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        let textResp = response.text || '[]';
        const questions = JSON.parse(textResp);

        res.json({
            subject,
            unit,
            type: 'ai_generated',
            questions
        });

    } catch (err) {
        console.error("AI Gen Error:", err.message);
        if (err.message && err.message.includes('API key not valid')) {
            return res.status(400).json({ msg: 'Invalid Gemini API Key in .env' });
        }
        res.status(500).json({ msg: 'Failed to generate AI test.' });
    }
});

// CLARIFY DOUBT (AI STUDY BUDDY)
router.post('/clarify-doubt', async (req, res) => {
    try {
        const { subject, unit, question } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ msg: 'AI features are currently unavailable (missing API key).' });
        }

        const ai = getAiInstance();

        const prompt = `
            You are a helpful, encouraging AI Study Buddy for a university student.
            The student is studying ${subject}, specifically focusing on Unit ${unit}.
            
            The student asked the following doubt/question:
            "${question}"
            
            Provide a clear, concise, and easy-to-understand explanation.
            Do not provide answers to assignments, but instead guide the student and explain the core concepts.
            Keep the response formatting clean (you can use markdown).
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({
            answer: response.text || ''
        });

    } catch (err) {
        console.error("AI Clarify Error:", err.message);
        if (err.message && err.message.includes('API key not valid')) {
            return res.status(400).json({ msg: 'Invalid Gemini API Key in .env' });
        }
        res.status(500).json({ msg: 'Failed to clarify doubt.' });
    }
});

module.exports = router;
