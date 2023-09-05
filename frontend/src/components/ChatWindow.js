import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Message from './Message';
import Header from './Header';
import axios from 'axios'; // Import Axios
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, isUser: true };
    setMessages([...messages, userMessage]);
    setInputText('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/submitQuestion', { question: inputText},{headers: {"Authorization": "Bearer balls12345"}});
      const botMessage = { text: response.data.message, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending the request:', error);
    }
  };

  return (
    <Container className="chat-window">
      <Header title="Huberman Bot" />
      <div className="message-container">
        <Message key={-1} text={"How can I help you today?"} isUser={false}/>
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>
      <div className="input-container">
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </Form>
      </div>
    </Container>
  );
};

export default ChatWindow;
