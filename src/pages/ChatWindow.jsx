import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { ChatContainer, MessageBubble, MessageContent, TypingIndicator } from "../styles/ChatStyles";
import { useAuth } from "../contexts/auth_context";

export const ChatWindow = () => {
  const [socket, setSocket] = useState(null)
  const { setToken, currentUser } = useAuth()
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const roomId = 1
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/cable`);
    
    ws.onopen = () => { 
      const subscriptionMessage = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
          chat_id: roomId
        })
      }
      ws.send(JSON.stringify(subscriptionMessage))
    };
  
    ws.onmessage = (event) => { 
      const messageData = JSON.parse(event.data);
      if (messageData.type == 'welcome') console.log(messageData.type)
      if (messageData.type == 'ping') return;
      if (messageData.message) {
        const messageBody = messageData.message.body;
        console.log(messageBody)
        if (messageBody.sender == currentUser.id) return 
        messageBody.timestamp = new Date(messageBody.timestamp)
        setMessages((prevMessages) => [...prevMessages, messageBody])
       }
    };
  
    setSocket(ws);
    
    return () => { ws.close() }
  }, [roomId]);
  
  const sendMessage = (newMsg) => {
    if (newMsg && socket) {
      const chatMessage = {
        command: 'message',
        identifier: JSON.stringify({ channel: 'ChatChannel', chat_id: roomId }),
        data: JSON.stringify({ message: newMsg })
      }
      socket.send(JSON.stringify(chatMessage));
    }
  }  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      setError("Message cannot be empty");
      return;
    }
    setError("");
    console.log(currentUser)
    const newMsg = { text: newMessage, sender: currentUser.id, timestamp: new Date() };
    setMessages([...messages, newMsg])
    console.log(newMsg)
    sendMessage(newMsg);
    setNewMessage("");
  };
  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="error"
        onClick={() => setToken(null)}
        sx={{ ml: 1, minWidth: 0 }}
        aria-label="Send message"
      >
        LOGOUT
      </Button>
      <ChatContainer elevation={3}>
        {messages.map((message, index) => (
          <MessageBubble key={index} iscurrentuser={+(message.sender === currentUser.id)}>
            <Avatar
              src={`https://images.unsplash.com/photo-${message.sender === "user" ? "1494790108377-be9c29b29330" : "1438761681033-6461ffad8d80"}?auto=format&fit=crop&w=80&q=80`}
              alt={message.sender === currentUser.id ? "User Avatar" : "Other Avatar"}
              sx={{ mr: 1, ml: +(message.sender === currentUser.id)}}
            />
            <Box>
              <MessageContent iscurrentuser={+(message.sender === currentUser.id)}>
                <Typography variant="body1">{message.text}</Typography>
              </MessageContent>
              <Typography variant="caption" sx={{ mt: 0.5, display: "block", textAlign: message.sender === "user" ? "right" : "left" }}>
                {formatTimestamp(message.timestamp)}
              </Typography>
            </Box>
          </MessageBubble>
        ))}
        {isTyping && (
          <TypingIndicator>
            <Typography variant="body2">Other user is typing...</Typography>
          </TypingIndicator>
        )}
        <div ref={messagesEndRef} />
      </ChatContainer>
      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
          error={!!error}
          helperText={error}
          InputProps={{
            sx: {
              borderRadius: "20px",
              pr: 1,
            },
          }}
          aria-label="Message input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ ml: 1, borderRadius: "50%", minWidth: 0, width: 56, height: 56 }}
          aria-label="Send message"
        >
          <IoSend />
        </Button>
      </Box>
    </Container>
  );
};
