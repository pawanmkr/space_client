import './App.css'
import Home from './pages/Home/Index'
import Chat from './pages/Chat/Index'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { io } from 'socket.io-client';
import { useEffect } from 'react'
import { useRef } from 'react'



function App() {

  const [space, setSpace] = useState('')
  const [newSpace, setNewSpace] = useState('')
  const [username, setUsername] = useState('')
  const [activity, setActivity] = useState([])
  const [allSpaces, setAllSpaces] = useState([])

  const [socket, setSocket] = useState()
  const navigate = useNavigate()
  const sendBtn = useRef(null)


  // async function handleSocket(spacename) {
  //   // socket io
      // nameSpace.emit("messageFromClient", newMessage)
      // setNewMessage('')
      // document.getElementById('sendBtn').addEventListener('click', () => {
      //   console.log(messageInput)
      //   nameSpace.emit("messageFromClient", messageInput);
      // })

  // //     // nameSpace.emit("messageFromClient", newMessage)
  // //     // setNewMessage('')
  // //     // document.getElementById('sendBtn').addEventListener('click', () => {
  // //     //   console.log(messageInput)
  // //     //   // nameSpace.emit("messageFromClient", messageInput);
  // //     // })
  // //   })

  // //   // nameSpace.on('messageFromServer', (msg) => {
  // //   //   setMessages(messages => [...messages, msg])
  // //   // })
  // //   nameSpace.on('messageFromServer', (msg) => {
  // //     setMessages(messages => [...messages, msg])
  // //   })
  // }
  
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
    })
    
  }

  // join room - fetch get
  const handleJoin = (e) => {
    e.preventDefault()

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

  
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }


  

  return (
    <div className="app">
      <div>
          <Routes>
            <Route path='/' element={<Home space={space} setSpace={setSpace} username={username} setUsername={setUsername} handleFetch={handleFetch} handleJoin={handleJoin} />} />
            <Route path='/spaces/:spaces' element={<Chat newSpace={newSpace} activity={activity} allSpaces={allSpaces} handleFormSubmit={handleFormSubmit} sendBtn={sendBtn}  />} />
          </Routes>
      </div>
    </div>
  )
}

export default App
