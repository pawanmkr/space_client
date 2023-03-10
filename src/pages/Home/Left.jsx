
const Left = ({ space, handleFetch, setSpace, username, setUsername, handleJoin }) => {
  return (
    <div className="left d-flex justify-content-center align-items-center">
        <div className="form">
            <h6 className="form-heading">Create your Space <br /> Super Quick!</h6>
            <form className="d-flex flex-column">
                <div className="form-item">
                    <input type="text" className="form-input" placeholder="Space name or Id" value={space} onChange={(e) => setSpace(e.target.value)}/>
                </div>
                <div className="form-item">
                    <input type="text" className="form-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                {/* <div className="form-item">
                    <input type="password" className="form-input" placeholder="password"/>
                </div> */}
                <div className="form-item">
                    <button type="submit" className="form-submit-btn" onClick={handleFetch}>Create New</button>
                </div>
                <h4 className="form-item or-label">
                    or
                </h4>
                <div className="form-item">
                    <button type="submit" className="form-join-btn" onClick={handleJoin}>Join</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Left