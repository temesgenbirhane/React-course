import { useState } from 'react'
import { ChatInput } from './components/ChatInput';
import './App.css'
import ChatMessages from './components/ChatMessages';
    
    function App() {
      const [chatMessages, setChatMessages] = useState([
        {
          message: "hello chatbot",
          send: "user",
          id: "id1"
        },
        {
          message: "How can i help you",
          send: "robot",
          id: "id2"
        },
        {
          message: "can you get me todays date?",
          send: "user",
          id: "id3"
        },
        {
          message: "Today is september 27",
          send: "robot",
          id: "id4"
        }
      ]);
      // App owns the chatMessages state (lifting state up)

      return (
        <div className="app-container">
          
          {/* Rendering ChatInput and passing props */}

          <ChatMessages chatMessages={chatMessages} />
          <ChatInput 
            chatMessages={chatMessages} 
            setChatMessages={setChatMessages}
          />
        </div>
      );
    }

export default App
