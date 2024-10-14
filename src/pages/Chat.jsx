import { useState, useEffect } from 'react'

export function Chat() {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('') 
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
      if (messageData.type == 'ping') return;
      if (messageData.message) {
        const messageBody = messageData.message.body;
        setMessages((prevMessages) => [...prevMessages, messageBody])
       }
    };
  
    setSocket(ws);
    
    return () => { ws.close() }
  }, [roomId]);
  
  const sendMessage = () => {
    if (input && socket) {
      const chatMessage = {
        command: 'message',
        identifier: JSON.stringify({ channel: 'ChatChannel', chat_id: roomId }),
        data: JSON.stringify({ message: input })
      }
      socket.send(JSON.stringify(chatMessage));
      setInput('')
    }
  }  

  return (
    <>
      <input 
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}       
      />
      
      <button onClick={sendMessage}>
        Send Message
      </button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message}
          </li>
        ))}
      </ul>
    </>
  );

}

