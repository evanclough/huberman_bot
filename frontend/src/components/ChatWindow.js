import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Message from './Message';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Send user input to Langchain or GPT-3.5 and get a response
    // const response = await fetchResponseFromLangchainOrGPT35(inputText);

    // For now, simulating a bot response
    const response = "This is a sample bot response.";

    setMessages([...messages, { text: inputText, isUser: true }, { text: response, isUser: false }]);
    setInputText('');
  };

  return (
    <Container className="chat-window">
      <div className="message-container">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default ChatWindow;
