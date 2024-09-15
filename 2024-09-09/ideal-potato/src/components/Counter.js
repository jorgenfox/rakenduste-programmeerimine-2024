import React, { useState } from "react"

const Counter = () => {
  const [counter, setCounter] = useState(0)

  const modifyCounter = value => setCounter(prevCounter => prevCounter + value)
  return (
    <>
      <h1>{counter}</h1>

      {[1, 5, 50, -1, -5, -50].map(value => (
        <button
          key={value}
          onClick={() => modifyCounter(value)}
        >
          {value > 0 ? `+${value}` : value}
        </button>
      ))}

      <button onClick={() => setTimeout(() => modifyCounter(), 2000)}>
        async +1
      </button>
    </>
  )
}

export default Counter
