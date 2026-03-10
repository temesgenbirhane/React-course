import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessage.css';
export function ChatMessage({ message, send }) {
      return (
        <div className={send === "user" ? "chat-message-user" : "chat-message-robot"}>
          {send === "robot" && <img src={RobotProfileImage} className= "chat-message-profile" />}
          {/* Conditional rendering using logical AND */}
          <div className= "chat-message-text">
            {message}
          </div>

          {send === "user" && <img src={UserProfileImage} className= "chat-message-profile" />}
        </div>
      );
    }

    