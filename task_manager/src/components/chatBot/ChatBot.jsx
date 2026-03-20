// import React, { useState } from 'react'
// import { Button, Container, InputGroup, ListGroup, Row, Form } from 'react-bootstrap'
// import { useSendMessageMutation } from '../../services/ChatbotApi'
// import ReactMarkdown from 'react-markdown';

// const userBubble = {
//   background: '#c8a882',
//   color: 'white',
//   borderRadius: '18px 18px 4px 18px',
//   padding: '8px 14px',
//   maxWidth: '70%',
//   marginLeft: 'auto',
//   marginBottom: '8px',
// }

// const botBubble = {
//   background: '#ede8e0',
//   color: '#333',
//   borderRadius: '18px 18px 18px 4px',
//   padding: '8px 14px',
//   maxWidth: '70%',
//   marginBottom: '8px',
// }

// const ChatBot = () => {

//   const user = JSON.parse(localStorage.getItem('userInfo'))
// const username = user?.username

//   const [messages, setMessages] = useState([
//   { role: 'assistant', content: "Hey! I'm Alto, your personal assistant. How can I help you today? 👋" }
// ])
//   const [input, setInput] = useState('')
//   const [sendMessage] = useSendMessageMutation()

//   const handleSubmit = async () => {
//     if (!input.trim()) return
//     const userMessage = { role: 'user', content: input }
//     const updatedMessages = [...messages, userMessage]
//     setMessages(updatedMessages)
//     setInput('')

//     const res = await sendMessage({ message: input, history: messages }).unwrap()
//     const botMessage = { role: 'assistant', content: res.message }
//     setMessages([...updatedMessages, botMessage])
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSubmit()
//   }

//   return (
//     <Container className='chat-container'  style={{ 
//   display: 'flex', 
//   flexDirection: 'column', 
//   height: '500px', 
//   background: '#f5f0eb', 
//   borderRadius: '12px', 
//   padding: '16px',
//   width: '100%',
//   maxWidth: '100%'
// }}>
      
//       <Row>
//         <h5 style={{ color: '#c8a882', fontWeight: 'bold', marginBottom: '12px' }}>Chat With Alto</h5>
//       </Row>

//       <Row style={{ flex: 1, overflowY: 'auto', marginBottom: '12px' }}>
//         <ListGroup style={{ display: 'flex', flexDirection: 'column', border: 'none', width: '100%' }}>
//           {messages.map((message, index) => (
//   <div key={index} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
    
//     {message.role === 'assistant' && (
//       <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#c8a882', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '8px', flexShrink: 0 }}>
//         A
//       </div>
//     )}

//     <div style={message.role === 'user' ? userBubble : botBubble}>
//       <ReactMarkdown>{message.content}</ReactMarkdown>
//     </div>

//     {message.role === 'user' && (
//       <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7a6a5a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginLeft: '8px', flexShrink: 0 }}>
//         {username ? username[0].toUpperCase() : 'U'}
//       </div>
//     )}


//   </div>
// ))}
//         </ListGroup>
//       </Row>

//      <Row className='w-100'> 
//   <InputGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//     <Form.Control
//       value={input}
//       onChange={(e) => setInput(e.target.value)}
//       onKeyDown={handleKeyDown}
//       placeholder="whats on your mind..."
//       style={{ borderRadius: '20px 0 0 20px', background: '#ede8e0', border: '1px solid #c8a882', padding: '10px 16px' }}
//     />
//     <Button
//       onClick={handleSubmit}
//       style={{ borderRadius: '0 20px 20px 0', background: '#c8a882', border: 'none', padding: '10px 20px' }}
//     >
//       Send
//     </Button>
//   </InputGroup>
// </Row>

//     </Container>
//   )
// }

// export default ChatBot






import React, { useState, useRef, useEffect } from 'react'
import { Button, Container, InputGroup, ListGroup, Row, Form } from 'react-bootstrap'
import { useSendMessageMutation } from '../../services/ChatbotApi'
import ReactMarkdown from 'react-markdown'
import { TbMessageChatbot } from "react-icons/tb"

const userBubble = {
  background: '#c8a882',
  color: 'white',
  borderRadius: '18px 18px 4px 18px',
  padding: '8px 14px',
  maxWidth: '70%',
  marginLeft: 'auto',
  marginBottom: '8px'
}

const botBubble = {
  background: '#ede8e0',
  color: '#333',
  borderRadius: '18px 18px 18px 4px',
  padding: '8px 14px',
  maxWidth: '70%',
  marginBottom: '8px'
}

const ChatBot = () => {

  const user = JSON.parse(localStorage.getItem('userInfo'))
  const username = user?.username

  const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm Alto, your personal assistant. How can I help you today? 👋" }
  ])

  const [input, setInput] = useState('')
  const [sendMessage, {isLoading}] = useSendMessageMutation()

  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async () => {

    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }

    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)

    setInput('')

    try {

      const res = await sendMessage({
        message: input,
        history: messages
      }).unwrap()

      const botMessage = {
        role: 'assistant',
        content: res.message
      }

      setMessages([...updatedMessages, botMessage])

    } catch (error) {

      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: "Something went wrong. Please try again." }
      ])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <>
      
      {/* Floating AI Bubble */}
      {!isOpen && (
        <div
          className="ai-chat-bubble"
          onClick={() => setIsOpen(true)}
        >
          <TbMessageChatbot size={32}/>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Container
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '360px',
            height: '520px',
            background: '#f5f0eb',
            borderRadius: '14px',
            padding: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >

          {/* Header */}
          <Row style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

            <h6 style={{ color: '#c8a882', fontWeight: 'bold' }}>
              Chat With Alto
            </h6>

            <span
              style={{cursor:'pointer',fontSize:'20px'}}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </span>

          </Row>

          {/* Messages */}
          <Row style={{ flex: 1, overflowY: 'auto', marginBottom: '12px' }}>

            <ListGroup style={{ display: 'flex', flexDirection: 'column', border: 'none', width: '100%' }}>

              {messages.map((message, index) => (

                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '8px'
                  }}
                >

                  {message.role === 'assistant' && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#c8a882',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // fontWeight: 'bold',
                        marginRight: '8px'
                      }}
                    >
                      Alto
                    </div>
                  )}

                  <div style={message.role === 'user' ? userBubble : botBubble}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>

                  {message.role === 'user' && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#7a6a5a',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        marginLeft: '8px'
                      }}
                    >
                      {username ? username[0].toUpperCase() : 'U'}
                    </div>
                  )}

                </div>

              ))}

              <div ref={chatEndRef} />

            </ListGroup>

          </Row>

<Row className="w-100 m-0">
  <InputGroup className="w-100 p-0">

    <Form.Control
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="whats on your mind..."
      style={{
        flex: 1,
        borderRadius: '20px 0 0 20px',
        background: '#ede8e0',
        border: '1px solid #c8a882',
        padding: '10px 16px'
      }}
    />

    <Button
      onClick={handleSubmit}
      style={{
        borderRadius: '0 20px 20px 0',
        background: '#c8a882',
        border: 'none',
        padding: '10px 20px'
      }}
    >
      Send
    </Button>

  </InputGroup>
</Row>

        </Container>
      )}
    </>
  )
}

export default ChatBot