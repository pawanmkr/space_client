import Message from "../../components/Message"


const ChatMiddle = ({ newSpace, messageInput, setMessageInput, messages, handleFormSubmit }) => {

    return (
        <div className="chat-middle">
            <div className="chatroom-name p-3">
                <p className="space-title">{newSpace}</p>
            </div>
            <div className="message-section p-3">
                {/* <Message text="Received Text" author="Simon Paul" sender={false} />
                <Message text="Sent Text" author="Pawan Lamar" sender={true} /> */}
                {messages.map(msg => {
                    return <Message text={msg} author="Simon" sender={true}/>
                })}
            </div>
            <div className="input-box">
                <form className="d-flex input-form px-3 py-2" onSubmit={handleFormSubmit}>
                    <input type="text" className="input-message" value={messageInput} placeholder="Type Message Here..." onChange={(e) => setMessageInput(e.target.value)}/>
                    <button type="submit" className="input-submit-btn"><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    )
}

export default ChatMiddle