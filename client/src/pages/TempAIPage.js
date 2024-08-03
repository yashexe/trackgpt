import { useState } from 'react';
import { getOpenAIResponse } from '../services/OpenAIReponse';

import '../styles/TempAI.css'

export const TempAIPage = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(''); // State for storing the response

  const handleSubmit = async e => {
    e.preventDefault()
    setInput('')
    if (input.trim() === '') return;
    try {
      setTimeout(async () => {
        try {
          const result = await getOpenAIResponse(input);
          setResponse(result); // Update the state with the response
        } catch (error) {
          console.error('Error fetching GPT response:', error);
        }
      }, 100); // 100ms delay
    } catch (error) {
      console.error('Error adding user bubble:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chatbox">
      <div className="gpt-response">
        {response ? response : 'No response yet'} {/* Display the response here */}
      </div>
      <form onSubmit={handleSubmit} className="chatbox-form">
        <textarea
          id="promptarea"
          placeholder="Enter your prompt here."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={input ? 'input-button-highlighted' : 'input-button'}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
  
};
