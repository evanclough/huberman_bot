import React from 'react';
import { Container } from 'react-bootstrap';
import ChatWindow from './components/ChatWindow';
import "./styles/ChatWindow.css"

function App() {
  return (
    <Container className="App">
      <ChatWindow />
    </Container>
  );
}

export default App;
