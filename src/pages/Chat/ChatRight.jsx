import Room from "../../components/Room"
import { v4 as uuid } from 'uuid'

const random = Math.floor(Math.random() * 100000);

const ChatRight = ({ allSpaces }) => {

  console.log(allSpaces)
  return (
    <div className="chat-right">
      <div className="chat-right__content">
        <div className="profile-section p-3 pb-1">
          <div className="profile-section__content d-flex justify-content-center align-items-center flex-column mb-2">
            <div className="profile-container mb-3">
              <img src={`https://robohash.org/${random}`} alt="Profile-Image" className="profile-image" />
            </div>
            <h4 className="profile-name">Simon Paul</h4>
          </div>
        </div>


        <div className="chat-right__utils p-2">

          <div className="chat-right__utils_container pt-2 pb-2">
            {/* <Room room=" Omly Fans no Grills"/>
            <Room room="Duckbois on the move"/>
            <Room room="blue pegasus: reincarnation"/>
            <Room room="SM2 these are the breaks."/> */}
            {allSpaces && allSpaces.map(space => {
              return <Room room={space.name} key={uuid()}/>
            })}
          </div>


        </div>

      </div>
    </div>
  )
}

export default ChatRight