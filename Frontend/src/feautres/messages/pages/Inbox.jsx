import React, { useState } from 'react'
import List from '../components/List'
import "./inbox.scss"
 import { socket } from '../services/socket'
import { useEffect } from 'react'
import Messages from '../components/Messages'
import Nav from '../../shared/components/Nav'
const Inbox = () => {

    const [selectedUser, setSelectedUser] = useState(null)
  useEffect(() => {
    socket.connect()
    return () => socket.disconnect()
}, [])
    return (
        <div className="inbox-layout">
            <Nav />

            <div className="direct-messages">
                <List setSelectedUser={setSelectedUser} />

                <Messages selectedUser={selectedUser} />
            </div>
        </div>
    )
}

export default Inbox