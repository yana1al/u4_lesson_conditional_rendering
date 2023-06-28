# Conditional Rendering

![conditional](https://i.imgur.com/DPsrU0G.png)

## Overview

In this lesson we'll be covering conditional rendering with React by building a small greeting application. Conditional rendering is important because it allows us to control the flow of user experience in an application.

## Lesson Objectives

- Understand several methods for conditional rendering with React components
- Use conditional rendering with state to affect real time changes in our application's UI

## Getting Started

- `Fork` and `clone` this repository and `cd` into the new directory
- `npm install` to install our dependencies
- Run `npm run dev` to open your app in the browser

### Setup

In React, you can create distinct components that encapsulate the behavior you need. Then, you can render them depending on the state of your application.

Conditional rendering in React works the same way conditions work in JavaScript. We can use JavaScript operators like `if` or `?` to create elements representing the current state, and let React update the UI to match them.

We'll start by adding two components into our `components` directory:

#### Welcome.jsx

```jsx
const Welcome = () => {

  return (
    <h1>Welcome back!</h1>
  )
}

export default Welcome
```

#### Denied.jsx

```jsx
const Denied = () => {

  return (
    <h1>Please login!</h1>
  )
}

export default Denied
```

We’ll then create a Greeting component that displays either of these components depending on whether a user is logged in:

#### Greeting.jsx

```jsx
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
```

Make sure to import our `Greeting` component into `App.jsx`. Add your Greeting component into our return statement. For now we will hard code a boolean value of `false` to be passed down as a prop named `loggedIn`.

#### App.jsx

```js
import Greeting from './components/Greeting'

const App = () => {

  return (
    <div>
      <Greeting loggedIn={false} />
    </div>
  );
}

export default App
```

This example renders a different greeting depending on the value of `loggedIn` prop.

- Which greeting is our component rendering?
- Now let's try changing value of `loggedIn` to `true`
- Has anything changed with our rendered components?
- Wait, where did `<Denied />` go?

![pulp](https://i.kym-cdn.com/photos/images/newsfeed/001/042/619/4ea.jpg)

### Element Variables

You can also use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn’t change.

Let's create two more new components in our `components` folder representing `Logout` and `Login` buttons:

#### Login.jsx

```jsx
const Login = ({ handleClick }) => {

  return (
    <button onClick={handleClick}>Login</button>
  )
}

export default Login
```

#### Logout.jsx

```jsx
const LogoutButton = ({ handleClick }) => {

  return (
    <button onClick={handleClick}>Log Out</button>
  )
}

export default Logout
```

In the example below, we will now add `state` to our `App` using the `useState` hook to track our `loggedIn` variable. We'll also import our two button components from above and attach methods to set the state of `loggedIn` with `onClick` event listeners.

- In the `App` component, we'll create a variable `button` that conditionally renders one of our button components depending on whether the user `loggedIn` or not.
- `App.jsx` will now render either `<Login />` or `<Logout />` depending on its current state.
- It will also render a `<Greeting />` from the previous example:

```js
import { useState } from 'react'
import './App.css'
import Greeting from './components/Greeting'
import Login from './components/Login'
import Logout from './components/Logout'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleClick = () => {
    setLoggedIn(!loggedIn)
  }

  let button

  if (loggedIn) {
    button = <Logout handleClick={handleClick} />
  } else {
    button = <Login handleClick={handleClick} />
  }

  return (
    <div>
      <Greeting loggedIn={loggedIn} />
      {button}
    </div>
  )
}

export default App
```

### Inline If with the Logical && Operator

![and](https://media.tenor.co/images/bf504f6a2b7ad83c2f78dfeee2d2ede0/raw)

You may embed any expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element.

Let's add one more component to our `components` folder...

#### Mailbox.jsx

```jsx
const Mailbox = ({ messages }) => {

  return (
    <div>
      <h1>Hello!</h1>
      {messages.length && (
        <h2>You have {messages.length} unread messages.</h2>
      )}
    </div>
  )
}

export default Mailbox
```

Now we'll import it within our `App.jsx` component.

```js
import Mailbox from './components/Mailbox'
```

Before we render `Mailbox`, we'll need to add another state variable to pass as props.

```js
const [messages, setMessages] = useState([
  "Catching Up: Let's Grab Coffee This Week!",
  "Urgent: Need Your Input on Project Plan",
  "Quick Update: Successful Launch of Our New Feature!"
])
```

Finally, inside of `App.jsx`, we'll add a variable `unread` and set it equal to another inline logical && operator that will only render `<Messages />` if the user is logged in.

- Don't forget to call in `{messages}` inside your return statement.

```js
// App.jsx

let button

const unread = loggedIn && <Mailbox messages={messages} />

if (loggedIn) {
  button = <Logout handleClick={handleClick} />
} else {
  button = <Login handleClick={handleClick} />
}

...
```

<details>
  <summary>
    Your <code>App.jsx</code> should look like this when you're finished
  </summary>

```js
import { useState } from 'react'
import './App.css'
import Greeting from './components/Greeting'
import Login from './components/Login'
import Logout from './components/Logout'
import Mailbox from './components/Mailbox'

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

  const unread = loggedIn && <Mailbox messages={messages} />

  if (loggedIn) {
    button = <Logout handleClick={handleClick} />
  } else {
    button = <Login handleClick={handleClick} />
  }

  return (
    <div>
      <Greeting loggedIn={loggedIn} />
      {button}
      {unread}
    </div>
  )
}

export default App
```

</details>

So why does the logical && operator work with conditional rendering in React?

It works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

Therefore, if the condition is `true`, the element right after `&&` will appear in the output. If it is `false`, React will ignore and skip it.

### Inline If-Else with A Ternary Operator

![ternary](https://i.pinimg.com/originals/85/d9/26/85d9268373fde414bdc43cb09b40de8b.gif)

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator `condition ? true : false`.

To try this out, let's add a `<p>` tag inside the return of `App.jsx`. This `<p>` tag will tell us whether the user is logged in or not depending on the outcome of the ternary statement:

```js
// App.js
return (
    <div>
      <Greeting loggedIn={loggedIn} />
      <p>The user is <b>{loggedIn ? 'currently' : 'not'}</b> logged in.</p>
      {button}
      {unread}
    </div>
  )
```

### Preventing Component from Rendering

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this, return `null` instead of its render output.

## Recap

With React we are able to control the flow of rendering and user experience with conditional JavaScript statements. Statements often used in React apps to conditionally render components include:

- `if` / `else` Statements
- Logical `&&` Operators
- Ternary Operators
- `switch` Statements

Make sure to use conditional rendering to create more controlled applications in React!

![Burn](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F1ofR3QioNy264%2Fgiphy.gif&f=1&nofb=1)

## Resources

- [Conditional Rendering React Repository](https://github.com/reactjs/reactjs.org/tree/master/content/docs/conditional-rendering.md)
- [React Conditional Rendering Docs](https://reactjs.org/docs/conditional-rendering.html)
