import Message from "../../components/Message";
import Attachment from "../../components/Attachment";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import notificationSound from "../../assets/whatsapppc.mp3";

const ChatMiddle = ({
  newSpace,
  handleFormSubmit,
  sendBtn,
  username,
  spaceId,
  chats,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socketNameSpace, setSocketNameSpace] = useState(null);
  const [attachment, setAttachment] = useState({
    file: "",
    name: "",
    type: "",
    size: "",
  });
  const [notification] = useState(new Audio(notificationSound));
  const [checkAt, setCheckAt] = useState(false);
  const endMessage = useRef(null);

  const server = "https://spaces-api.onrender.com/";
  const localServer = "http://localhost:4000/";

  useEffect(() => {
    const nameSpace = io(`${localServer}${newSpace}`, {
      transports: ["websocket"],
      upgrade: false,
      rejectUnauthorized: false,
    });

    nameSpace.on("connect", () => {
      console.log(
        `connected in ${nameSpace.name} with socketID ${nameSpace.id}`
      );
      console.log(nameSpace);
    });

    // simon, yha pe user update krde when a new user joins bas yhi likha hai maine line 44-50 tak
    nameSpace.on("newUserAdded", (username) => {
      console.log(username);
    });

    setSocketNameSpace(nameSpace);
  }, []);

  useEffect(() => {
    if (chats.length !== 0) {
      setMessages(chats);
    }
  }, []);

  const handleSendMessage = (e) => {
    console.log("normal");
    e.preventDefault();
    const itemMessage = {
      message: messageInput,
      username: username,
      spaceId: spaceId,
    };
    console.log(itemMessage);
    socketNameSpace.emit("messageFromClient", itemMessage);
    socketNameSpace.on("messageFromServer", (msg) => {
      setNewMessage(msg.message);
      setNewAuthor(msg.username);
      if (msg.username !== username) {
        // only play the notification sound if the message is not from the current user
        notification.play(); // play the notification sound
      }
    });
    setMessageInput("");
  };

  // handle attachment message
  const handleFileMessage = (e) => {
    console.log("file");
    e.preventDefault();
    socketNameSpace.emit("fileFromClient", attachment);
    setAttachment([]);
    setCheckAt(false);
    socketNameSpace.on("fileFromServer", (file) => {});
  };

  useEffect(() => {
    if (newMessage) {
      setMessages((messages) => [
        ...messages,
        { message: newMessage, username: newAuthor },
      ]);
      endMessage.current.scrollIntoView();
    }
  }, [newMessage]);

  const handleAttachment = () => {
    document
      .querySelector(".attachment-container")
      .classList.toggle("show-attachment");
  };

  const uploadAttachmentFile = (e) => {
    let files = e.target.files[0];
    console.log(files);
    setAttachment({
      name: files?.name,
      size: files?.size,
      format: files?.type,
      actualFile: files,
      sender: username,
      spaceId: spaceId,
    });
    handleAttachment();
    setCheckAt(true);
  };

  useEffect(() => {
    console.log(attachment);
  }, [attachment]);

  return (
    <div className="chat-middle">
      <div className="chatroom-name p-3 d-flex justify-content-between align-items-center">
        <p className="space-title">{newSpace}</p>
        <p className="share-btn">
          <i className="fa-solid fa-plus"></i>
        </p>
      </div>
      <div className="message-section p-3">
        {messages.map((msg) => {
          return checkAt ? (
            <Attachment
              text={msg.message}
              author={msg.username}
              sender={username === msg.username ? true : false}
              key={uuid()}
            />
          ) : (
            <Message
              text={msg.message}
              author={msg.username}
              sender={username === msg.username ? true : false}
              key={uuid()}
            />
          );
        })}
        <div className="py-1" ref={endMessage}></div>
      </div>
      <div className="input-box">
        <form
          className="d-flex input-form px-3 py-2"
          onSubmit={handleFormSubmit}
        >
          <div className="w-100 position-relative">
            {checkAt && (
              <div className="attachment_file_show d-flex justify-content-between align-items-center px-4">
                <p className="mb-0 attachment-file-name">{attachment?.name}</p>
                <p className="mb-0">{attachment?.size}</p>
              </div>
            )}
            <input
              type="text"
              className="input-message"
              value={messageInput}
              placeholder="Type Message Here..."
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="attachment-wrapper">
              <i
                className="fa-solid fa-paperclip attachment-btn me-3"
                onClick={handleAttachment}
              ></i>
              <div className="attachment-container">
                <div className="attachment-block mb-3 d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-image"></i>
                </div>
                <div className="attachment-block d-flex justify-content-center align-items-center">
                  <label
                    htmlFor="attachment__file"
                    className="label-attachment"
                  >
                    <i className="fa-solid fa-file"></i>
                  </label>
                </div>
                <input
                  type="file"
                  id="attachment__file"
                  className="hidden"
                  onChange={uploadAttachmentFile}
                />
              </div>
            </div>

            <button
              ref={sendBtn}
              id="sendBtn"
              type="submit"
              className="input-submit-btn"
              onClick={checkAt ? handleFileMessage : handleSendMessage}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatMiddle;
