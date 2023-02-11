import Message from "../../components/Message"
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid'

import notificationSound from '../../assets/whatsapppc.mp3';
import Attachment from "../../components/Attachment";

const ChatMiddle = ({ newSpace, handleFormSubmit, sendBtn, username, spaceId, chats }) => {

    const [newMessage, setNewMessage] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')
    const [socketNameSpace, setSocketNameSpace] = useState(null)
    const [attachment, setAttachment] = useState()
    const [notification, setNotification] = useState(new Audio(notificationSound));
    const [checkAt, setCheckAt] = useState(false)
    const endMessage = useRef(null)


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

    useEffect(() => {
        console.log(chats)
    })


    const handleSendMessage = (e) => {
        e.preventDefault()
        const itemMessage = {
            message: messageInput,
            username: username,
            spaceId: spaceId
        }
        console.log(itemMessage)
        socketNameSpace.emit("messageFromClient", itemMessage);
        socketNameSpace.on('messageFromServer', (msg) => {
            setNewMessage(msg.message)
            setNewAuthor(msg.username)
            if (msg.username !== username) { // only play the notification sound if the message is not from the current user
                notification.play(); // play the notification sound
            }

        })
        setMessageInput('')
    }

    useEffect(() => {
        if (newMessage) {
            setMessages((messages) => [...messages, { message: newMessage, username: newAuthor }])
            endMessage.current.scrollIntoView()
        }
    }, [newMessage])

    const uploadAttachmentFile = (e) => {
        let files = e.target.files[0]
        setAttachment(files)
        setCheckAt(true)
    }

    // useEffect(() => {
    //     if(attachment){
    //         setNewMessage(attachment)
    //     }
    // }, [attachment])

    // handle attachment
    const handleAttachment = () => {
        document.querySelector('.attachment-container').classList.toggle('show-attachment')
    }

    return (
        <div className="chat-middle">
            <div className="chatroom-name p-3 d-flex justify-content-between align-items-center">
                <p className="space-title">{newSpace}</p>
                <p className="share-btn"><i class="fa-solid fa-plus"></i></p>
            </div>
            <div className="message-section p-3">
                {messages.map(msg => {
                    return (checkAt ? <Attachment text={msg.message} author={msg.username} sender={username === msg.username ? true : false} key={uuid()} />  :<Message text={msg.message} author={msg.username} sender={username === msg.username ? true : false} key={uuid()} />)
                })}
                <div className="py-1" ref={endMessage}></div>
            </div>
            <div className="input-box">
                <form className="d-flex input-form px-3 py-2" onSubmit={handleFormSubmit}>
                    <input type="text" className="input-message" value={messageInput} placeholder="Type Message Here..." onChange={(e) => setMessageInput(e.target.value)} />
                    <div className="d-flex align-items-center">

                        <div className="attachment-wrapper">
                            <i class="fa-solid fa-paperclip attachment-btn me-3" onClick={handleAttachment}></i>
                            <div className="attachment-container">
                                <div className="attachment-block mb-3 d-flex justify-content-center align-items-center"><i class="fa-solid fa-image"></i></div>
                                <div className="attachment-block d-flex justify-content-center align-items-center">
                                    <label htmlFor="attachment__file" className="label-attachment">
                                        <i class="fa-solid fa-file"></i>
                                    </label>
                                </div>
                                <input type="file" id="attachment__file" className="hidden" onChange={uploadAttachmentFile}/>
                            </div>
                        </div>

                        <button ref={sendBtn} id="sendBtn" type="submit" className="input-submit-btn" onClick={handleSendMessage}><i className="fa-solid fa-paper-plane"></i></button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ChatMiddle