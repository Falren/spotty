import { styled, keyframes } from "@mui/material";
import { Box, Paper } from "@mui/material";


export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ChatContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxHeight: "70vh",
  overflow: "auto",
  backgroundImage: "linear-gradient(to bottom right, #e0f7fa, #b2ebf2)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

export const MessageBubble = styled(Box)(({ theme, iscurrentuser }) => (
  {
  display: "flex",
  justifyContent: iscurrentuser ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(2),
  animation: `${fadeIn} 0.3s ease-out`,
}));

export const MessageContent = styled(Paper)(({ theme, iscurrentuser }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: "18px",
  maxWidth: "70%",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: iscurrentuser ? theme.palette.primary.main : theme.palette.background.paper,
  color: iscurrentuser ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

export const TypingIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
