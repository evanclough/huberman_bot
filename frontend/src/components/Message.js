import React from 'react';
import { Card } from 'react-bootstrap';

const Message = ({ text, isUser }) => {
  return (
    <Card className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <Card.Body><b>{isUser ? "User: " : "Bot: "}</b>{text}</Card.Body>
    </Card>
  );
};

export default Message;
