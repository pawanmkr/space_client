import './App.css'
import Home from './pages/Home/Index'
import Chat from './pages/Chat/Index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { io } from 'socket.io-client';
import { useEffect } from 'react'

function App() {

  const [space, setSpace] = useState('')
  const [newSpace, setNewSpace] = useState('')
  const [username, setUsername] = useState('')
  const [activity, setActivity] = useState([])
  const [allSpaces, setAllSpaces] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const navigate = useNavigate()


  async function handleSocket(spacename) {
    // socket io
    const nameSpace = io(`http://localhost:4000/${spacename}`, {
      transports: ['websocket'],
      upgrade: false,
      rejectUnauthorized: false
    })

    nameSpace.on('connect', () => {
      console.log(`connected in ${spacename} with socketID ${nameSpace.id}`);
      console.log(nameSpace);

      // nameSpace.emit("messageFromClient", newMessage)
      // setNewMessage('')
      // document.getElementById('sendBtn').addEventListener('click', () => {
      //   console.log(messageInput)
      //   // nameSpace.emit("messageFromClient", messageInput);
      // })
    })

    // nameSpace.on('messageFromServer', (msg) => {
    //   setMessages(messages => [...messages, msg])
    // })
    nameSpace.on('messageFromServer', (msg) => {
      setMessages(messages => [...messages, msg])
    })
  }
  
  // create room - fetch post
  const handleFetch = (e) => {

    e.preventDefault()

    let item = {
      name: space,
      username: username
    }

    fetch(`http://localhost:4000/namespace/create/${space}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(item)
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setNewSpace(data.extractData.spaceName)
      setActivity(data.activity)
      setAllSpaces(data.allSpace)
      navigate(`/spaces/${data.extractData.spaceName}`)
      handleSocket(data.extractData.spaceName);
    })
    
  }

  // join room - fetch get
  const handleJoin = (e) => {
    e.preventDefault()

    // simon, yha ye change krna hai 
    // you need to modify this item here...in create you were giving name and username
    // but here i need id and username so change name with id
    let item = {
      id: space,
      username: username
    }

    fetch(`http://localhost:4000/namespace/join/${space}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(item)
    }).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setNewSpace(data.extractData.spaceName)
      setActivity(data.activity)
      setAllSpaces(data.allSpace)
      navigate(`/spaces/${data.extractData.spaceName}`)
      handleSocket(data.extractData.spaceName);
    })
  }


  // handle send message
  useEffect(() => { console.log(messageInput) }, [messageInput])
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(messageInput)
  }


  

  return (
    <div className="app">
      <div>
          <Routes>
            <Route path='/' element={<Home space={space} setSpace={setSpace} username={username} setUsername={setUsername} handleFetch={handleFetch} handleJoin={handleJoin} />} />
            <Route path='/spaces/:spaces' element={<Chat newSpace={newSpace} activity={activity} allSpaces={allSpaces}  messageInput={messageInput} setMessageInput={setMessageInput} messages={messages} handleFormSubmit={handleFormSubmit}/>} />
          </Routes>
      </div>
    </div>
  )
}

export default App
