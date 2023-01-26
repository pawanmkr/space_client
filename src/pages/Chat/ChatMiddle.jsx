import Message from "../../components/Message"
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'

const ChatMiddle = ({ newSpace, handleFormSubmit, sendBtn }) => {

    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')
    const [socketNameSpace, setSocketNameSpace] = useState(null)


    useEffect(() => {

        const nameSpace = io(`http://localhost:4000/${newSpace}`, {
            transports: ['websocket'],
            upgrade: false,
            rejectUnauthorized: false
        })

        nameSpace.on('connect', () => {
            console.log(`connected in ${nameSpace.name} with socketID ${nameSpace.id}`);
            console.log(nameSpace);
        })

        setSocketNameSpace(nameSpace)

    }, [])


    const handleSendMessage = (e) => {
        e.preventDefault()
        console.log(messageInput)
        socketNameSpace.emit("messageFromClient", messageInput);
        socketNameSpace.on('messageFromServer', (msg) => {
            setNewMessage(msg)
        })
        setMessageInput('')
    }

    useEffect(() => {
        if(newMessage){
            setMessages((messages) => [...messages, newMessage])
        }
    }, [newMessage])





    return (
        <div className="chat-middle">
            <div className="chatroom-name p-3">
                <p className="space-title">{newSpace}</p>
            </div>
            <div className="message-section p-3">
                {messages.map(msg => {
                    return <Message text={msg} author="Simon" sender={true} key={uuid()}/>
                })}
            </div>
            <div className="input-box">
                <form className="d-flex input-form px-3 py-2" onSubmit={handleFormSubmit}>
                    <input type="text" className="input-message" value={messageInput} placeholder="Type Message Here..." onChange={(e) => setMessageInput(e.target.value)} />
                    <button ref={sendBtn} id="sendBtn" type="submit" className="input-submit-btn" onClick={handleSendMessage}><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    )
}

export default ChatMiddle