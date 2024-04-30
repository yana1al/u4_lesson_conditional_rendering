import { useState } from 'react'
import './App.css'
import Greeting from './components/Greeting'
import Login from './components/Login'
import Logout from './components/Logout'
import Inbox from './components/Inbox'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  
  const [messages, setMessages] = useState([
    "Catching Up: Let's Grab Coffee This Week!",
    "Urgent: Need Your Input on Project Plan",
    "Quick Update: Successful Launch of Our New Feature!"
  ])

  const handleClick = () => {
    setLoggedIn(!loggedIn)
  }

  let button
  const unread = loggedIn && <Inbox messages={messages} />

  if (loggedIn) {
    button = <Logout handleClick={handleClick} />
  } else {
    button = <Login handleClick={handleClick} />
  }

return (
  <div>
    <Greeting loggedIn={loggedIn} />
    <p>The user is <b>{loggedIn ? 'currently' : 'not'}</b> logged in.</p>
    {button}
    {unread}
  </div>
)
}

export default App