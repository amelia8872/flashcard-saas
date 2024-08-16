import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator. Your task is to generate flashcards for various subjects. Each flashcard should have a question on one side and the answer on the other side. Ensure that the questions are clear and concise, and the answers are accurate and informative. The flashcards should be suitable for learners of all levels, from beginners to advanced. Please provide a variety of questions, including definitions, explanations, and examples where applicable. Only generate 10 flashcards per request.
Return in the following JSON format:
{
  "flashcards": [{
  "front":"Front of the flashcard",
  "back":"Back of the flashcard"
  }]
}
`;

export async function POST(req) {
  const openai = new OpenAI();

  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: data,
      },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  });
  // console.log(completion.choices[0].message.content);

  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
}
