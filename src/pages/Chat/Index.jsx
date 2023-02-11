import ChatLeft from "./ChatLeft"
import ChatMiddle from "./ChatMiddle"
import ChatRight from "./ChatRight"
import handleFormSubmit from "../../App"


const Chat = ({ newSpace, activity, allSpaces, messageInput, setMessageInput, handleSendMessage, messages, handleFormSubmit, sendBtn, socket, setMessages, username, spaceId, chats }) => {

    return (
        <div className="chat-section d-flex justify-content-between align-items-center">
            <ChatLeft activity={activity}/>
            <ChatMiddle newSpace={newSpace} handleSendMessage={handleSendMessage}  handleFormSubmit={handleFormSubmit} sendBtn={sendBtn} username={username} spaceId={spaceId} chats={chats}/>
            <ChatRight allSpaces={allSpaces} username={username}/>
        </div>
    )
}


export default Chat