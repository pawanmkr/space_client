import React from 'react'

const Attachment = ( text, author, sender ) => {
    console.log(text)
  return (
    <div className={sender ? "sent" : "received"}>
        <div className={sender ? "sent__content px-3 py-2" : "received__content px-3 py-2"}>
            <p className="mb-0 sender">{author}</p>
            <p className="mb-0">Attachment</p>
        </div>
    </div>
  )
}

export default Attachment