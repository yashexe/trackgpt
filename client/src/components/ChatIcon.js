import React, { useState } from 'react';

import ChatPNG from '../assets/Home/chatbot.png';

import { getOpenAIResponse } from '../services/OpenAIReponse';

import '../styles/ChatIcon.css'

export const ChatIcon = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [visibility, SetVisibility] = useState(false)

    const toggleChat = () => SetVisibility(!visibility)
  
    const handleSubmit = async e => {
      e.preventDefault()
      setInput('')
      if (input.trim() === '') return;
    
      const result = await getOpenAIResponse(input);
      setResponse(result);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };
  
    return (
        <div className='chat-icon'>
            <div className="chat-icon">
                <img src={ChatPNG} alt="Chat Icon" onClick={toggleChat}/>
            </div>
            {visibility &&  (
                <div className="chat-menu">
                    <div className="gpt-response">
                        {response ? response : ''}
                    </div>
                    <form onSubmit={handleSubmit} className="chatbox-form">
                        <textarea
                            id="promptarea"
                            placeholder="Enter your prompt here."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button type="submit"
                            className={input ? 'input-button-highlighted' : 'input-button'}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
