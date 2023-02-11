import './App.css'
import Home from './pages/Home/Index'
import Chat from './pages/Chat/Index'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'
import Join from './components/Join'

function App() {

  const [space, setSpace] = useState('')
  const [newSpace, setNewSpace] = useState('')
  const [username, setUsername] = useState('')
  const [activity, setActivity] = useState([])
  const [allSpaces, setAllSpaces] = useState([])
  const [spaceId, setSpaceId] = useState('')
  const [chats, setChats] = useState([])
  
  const navigate = useNavigate()
  const sendBtn = useRef(null)


  
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
      setNewSpace(data.extractData.spaceName)
      setActivity(data.activity)
      setAllSpaces(data.allSpace)
      setSpaceId(data.extractData.shareableSpaceId)
      setChats(data.extractData.chats)
      navigate(`/spaces/${data.extractData.spaceName}`)
    })
  }

  // join room - fetch get
  const handleJoin = (e) => {
    e.preventDefault()

    let item = {
      id: space,
      username: username,
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
      setSpaceId(data.extractData.shareableSpaceId)
      navigate(`/spaces/${data.extractData.spaceName}`)
      // handleSocket(data.extractData.spaceName);
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
            <Route path='/spaces/:spaces' element={<Chat newSpace={newSpace} activity={activity} allSpaces={allSpaces} handleFormSubmit={handleFormSubmit} sendBtn={sendBtn}  username={username} spaceId={spaceId} chats={chats}/>} />
            {/* // new route here to which looks like "/spaces/join/:spaces_id" */}

            <Route path='/join/:joinSpaceId' element={<Join setNewSpace={setNewSpace} setActivity={setActivity} setAllSpaces={setAllSpaces} setSpaceId={setSpaceId} setUsername={setUsername}/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App
