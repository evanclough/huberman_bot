import React from 'react';
import { Container } from 'react-bootstrap';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Container className="App">
      <h1>Custom Chatbot</h1>
      <ChatWindow />
    </Container>
  );
}

export default App;
