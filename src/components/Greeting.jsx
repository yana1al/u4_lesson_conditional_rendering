import Welcome from './Welcome'
import Denied from './Denied'

const Greeting = ({ loggedIn }) => {

  if (loggedIn) {
    return <Welcome />
  } else {
    return <Denied />
  }
}

export default Greeting