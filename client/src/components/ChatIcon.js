import React, { useState } from 'react';
import axios from 'axios';

import ChatPNG from '../assets/Home/chatbot.png';

import { getOpenAIResponse } from '../services/OpenAIReponse';

import '../styles/ChatIcon.css'

export const ChatIcon = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [visibility, SetVisibility] = useState(false)

    const toggleChat = () => SetVisibility(!visibility)
  
    const handleSubmit = async e => {
      e.preventDefault();
      setInput('');
    
      if (input.trim() === '') return;
    
      const fetchedExpenses = await fetchExpenses();
    
      const expensesText = fetchedExpenses.map(expense => (
        `Name: ${expense.description}\nCost: ${expense.amount}\nCategory: ${expense.category}\n`
      )).join('\n');
    
      const updatedInput = `${input}\n\nFormatted SQLite Data:\n${expensesText}`;
    
      const result = await getOpenAIResponse(updatedInput);
      setResponse(result);
    };
    
  
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses')
        console.log('Fetched Expenses:', response.data)
        return response.data
      } catch (error) {
        console.error('Error fetching expenses:', error)
        return []
      }
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
                      {response.split('\n').map((line, index) => (
                        <p key={index}>{line}<br/></p>
                      ))}
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
