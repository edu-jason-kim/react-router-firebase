import { onValue, push, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { rtdb } from "../firebase"

function ChatRoom ({ articleId }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const chatRef = ref(rtdb, `articles/${articleId}`)


  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val()
      const messages = Object.values(data)
      setMessages(messages)
    })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('전송하기: ', input)

    push(chatRef, {
      text: input,
      timestamp: Date.now(),
    })

    setInput('')
  }
 
  return <div style={{ height: '500px', overflow: 'scroll' }}>
    {messages.map((message, index) => {
      return <div key={index} style={{ marginTop: '1rem' }}>
        <div>{new Date(message.timestamp).toLocaleTimeString()}</div>
        <div>{message.text}</div>
      </div>
    })}

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const text = e.target.value
          setInput(text || '')
        }}
      />
      <button>전송</button>
    </form>
  </div>
}

export default ChatRoom
