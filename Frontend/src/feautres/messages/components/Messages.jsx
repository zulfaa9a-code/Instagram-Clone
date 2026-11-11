import { useState, useEffect, useRef } from 'react'
import './messages.scss' 
import { getConversation, sendMessage } from '../services/message.api'
 import { socket } from '../services/socket'
const Messages = ({ selectedUser }) => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)

useEffect(() => {
    if (!selectedUser) return

    const handleNewMessage = (msg) => {
        // Only show it if it belongs to the chat that's currently open
        if (msg.sender === selectedUser._id) {
            setMessages((prev) => [...prev, msg])
        }
    }

    socket.on('newMessage', handleNewMessage)
    return () => socket.off('newMessage', handleNewMessage)
}, [selectedUser?._id])
    // Load conversation history when the selected user changes
    useEffect(() => {
        if (!selectedUser) return

        let ignore = false
        setText('')
        setMessages([])
        setLoading(true)

        getConversation(selectedUser._id)
            .then((data) => {
                if (!ignore) setMessages(data)
            })
            .catch(console.error)
            .finally(() => {
                if (!ignore) setLoading(false)
            })

        // Prevents a slow response from an old chat overwriting the current one
        return () => {
            ignore = true
        }
    }, [selectedUser?._id])

    // Auto-scroll to the newest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        const content = text.trim()
        if (!content) return

        setText('')
        try {
            const saved = await sendMessage(selectedUser._id, content)
            setMessages((prev) => [...prev, saved])
        } catch (err) {
            console.error(err)
            setText(content) // restore the text if sending failed
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!selectedUser) {
        return (
            <div className="messages-panel">
                <div className="no-chat">
                    <h2>Your messages</h2>
                    <p>Select a user to start chatting.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="messages-panel">
            {/* Header */}
            <div className="message-header">
                <img src={selectedUser.profileImg} alt="Profile" />
                <h3>{selectedUser.username}</h3>
            </div>

            {/* Chat Area */}
            <div className="message-body">
                {loading ? (
                    <p className="empty-chat">Loading...</p>
                ) : messages.length === 0 ? (
                    <p className="empty-chat">Start a conversation!</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`bubble ${
                                msg.sender === selectedUser._id ? 'received' : 'sent'
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            {/* Message Input */}
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend} disabled={!text.trim()}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default Messages