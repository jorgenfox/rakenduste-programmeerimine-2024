import React, { useState } from "react"
import "./App.css"
import Name from "./components/Name"
import Counter from "./components/Counter"
import PropDrilling from "./components/PropDrilling"
import Show from "./components/Show"
import Context from "./components/Context"
import Profile from "./components/Profile"

function App() {
  const [show, setShow] = useState(true)

  const toggleShow = () => setShow(prevShow => !prevShow)

  return (
    <>
      <Profile name="Jörgen" />
      <Context />
      <Show
        show={show}
        toggleShow={toggleShow}
      />
      <PropDrilling />
      <Name title="Jorgen" />
      <Name />
      <Counter />
    </>
  )
}

export default App
