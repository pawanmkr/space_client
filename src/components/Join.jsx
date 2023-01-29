import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Join = ({ setNewSpace, setActivity, setAllSpaces, setSpaceId, setUsername }) => {

    const { joinSpaceId } = useParams()
    const [joinUser, setJoinUser] = useState('')
    const navigate = useNavigate()

    const handleJoinSpace = (e) => {
        e.preventDefault()

        let item = {
            id: joinSpaceId,
            username: joinUser,
        }

        fetch(`http://localhost:4000/namespace/join/${joinSpaceId}`, {
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
            setUsername(joinUser)
            navigate(`/spaces/${joinSpaceId}`)
        })

    }

    return (
        <div className="join-page d-flex justify-content-center align-items-center">
            <div className="form">
                <h6 className="form-heading">Join Space</h6>
                <form className="d-flex flex-column">
                    <div className="form-item">
                        <input type="text" className="form-input" placeholder="Username" value={joinUser} onChange={(e) => setJoinUser(e.target.value)} />
                    </div>
                    {/* <div className="form-item">
                <input type="password" className="form-input" placeholder="password"/>
            </div> */}
                    <div className="form-item">
                        <button type="submit" className="form-join-btn" onClick={handleJoinSpace}>Join</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Join