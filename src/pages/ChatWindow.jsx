import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Container,
  styled,
  keyframes,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;
const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxHeight: "70vh",
  overflow: "auto",
  backgroundImage: "linear-gradient(to bottom right, #e0f7fa, #b2ebf2)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const MessageBubble = styled(Box)(({ theme, isCurrentUser }) => ({
  display: "flex",
  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(2),
  animation: `${fadeIn} 0.3s ease-out`,
}));

const MessageContent = styled(Paper)(({ theme, isCurrentUser }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: "18px",
  maxWidth: "70%",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: "other", timestamp: new Date(Date.now() - 300000) },
    { id: 2, text: "Hi! How are you?", sender: "user", timestamp: new Date(Date.now() - 240000) },
    { id: 3, text: "I'm doing great, thanks for asking! How about you?", sender: "other", timestamp: new Date(Date.now() - 180000) },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
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
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
    simulateReply();
  };
  const simulateReply = () => {
    setIsTyping(true);
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you soon.",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, reply]);
      setIsTyping(false);
    }, 3000);
  };
  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <Container maxWidth="sm">
      <ChatContainer elevation={3}>
        {messages.map((message) => (
          <MessageBubble key={message.id} isCurrentUser={message.sender === "user"}>
            <Avatar
              src={`https://images.unsplash.com/photo-${message.sender === "user" ? "1494790108377-be9c29b29330" : "1438761681033-6461ffad8d80"}?auto=format&fit=crop&w=80&q=80`}
              alt={message.sender === "user" ? "User Avatar" : "Other Avatar"}
              sx={{ mr: 1, ml: message.sender === "user" ? 1 : 0 }}
            />
            <Box>
              <MessageContent isCurrentUser={message.sender === "user"}>
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
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
