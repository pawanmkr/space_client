import Message from "../../components/Message"
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";


const ChatMiddle = ({ newSpace, handleFormSubmit, sendBtn }) => {

    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')

    const nameSpace = io(`http://localhost:4000/${newSpace}`, {
        transports: ['websocket'],
        upgrade: false,
        rejectUnauthorized: false
    })

    useEffect(() => {
        nameSpace.on('connect', () => {
            // console.log(`connected in ${spacename} with socketID ${nameSpace.id}`);
            console.log(nameSpace);
        })
    }, [])


    const handleSendMessage = (e) => {
        e.preventDefault()
        console.log(messageInput)
        nameSpace.emit("messageFromClient", messageInput);
        nameSpace.on('messageFromServer', (msg) => {
            setNewMessage(msg)
        })
        setMessageInput('')
    }

    useEffect(() => {
        if(newMessage){
            setMessages((messages) => [...messages, newMessage])
        }
    }, [newMessage])

    console.log(messageInput)




    return (
        <div className="chat-middle">
            <div className="chatroom-name p-3">
                <p className="space-title">{newSpace}</p>
            </div>
            <div className="message-section p-3">
                {/* <Message text="Received Text" author="Simon Paul" sender={false} />
                <Message text="Sent Text" author="Pawan Lamar" sender={true} /> */}
                {messages.map(msg => {
                    return <Message text={msg} author="Simon" sender={true} />
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