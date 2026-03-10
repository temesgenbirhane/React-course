import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {  
      // Receives props from App:
      // - chatMessages: current list of messages
      // - setChatMessages: function to update that list (lifting state up)

      const [inputText, setInputText] = useState('');
      // Controlled input: React state stores the text typed by the user

      function saveInputText(event) {
        setInputText(event.target.value);
        // Updates inputText on every keystroke
      }

      function sendMessage() {
        // Step 1: Add the user's message
        const newChatMessages = [
          ...chatMessages,   // copy old messages
          {
            message: inputText,
            send: "user",
            id: crypto.randomUUID()
          }
        ];
        setChatMessages(newChatMessages);

        // Step 2: Generate chatbot response using external library
        const response = Chatbot.getResponse(inputText);

        // Step 3: Append chatbot message to the updated list
        setChatMessages([
          ...newChatMessages,
          {
            message: response,
            send: "robot",
            id: crypto.randomUUID()
          }
        ]);

        // Step 4: Clear the input field
        setInputText('');
      }

      return (
        <div className="chat-input-container">
          <input 
            placeholder="input a text here" 
            size="30" 
            onChange={saveInputText} 
            value={inputText}
            className="chat-input"
          />
          <button onClick={sendMessage} className="send-button">send</button>
        </div>
      );
    }