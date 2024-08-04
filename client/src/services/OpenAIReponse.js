import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const getOpenAIResponse = async (prompt) => {
  try {
    console.log(prompt)
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: prompt },
          { role: 'system',
            content: "You are a financial advisor with expertise in personal finance. Your goal is to provide tailored, actionable advice based on the user's financial goals, risk tolerance, and current financial situation. Always ensure to offer clear, concise, and well-researched recommendations, and when necessary, suggest seeking professional consultation for complex financial matters."
          }
        ], 
        max_tokens: 200,
        temperature: 0.5, 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};