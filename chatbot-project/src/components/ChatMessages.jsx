import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
      const chatMessagesRef = useRef(null);
      useEffect(()=>{
        const containerElem = chatMessagesRef.current;
        if(containerElem){
          containerElem.scrollTop = containerElem.scrollHeight;
        }
      }, [chatMessages]); // useEffect runs after every render when chatMessages changes. this is called dependency array. if we put an empty array, it runs only once after the first render. if we dont put any array, it runs after every render
      return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
          {chatMessages.map((chatMessage) => {
            // Iterates through all messages and renders a ChatMessage component
            return (
              <ChatMessage
                message={chatMessage.message}
                send={chatMessage.send}
                key={chatMessage.id}
              />
            );
          })}
        </div>
      );
    }

export default ChatMessages