import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [validNumber, setValidNumber] = useState(false)
  const [validCharcters, setValidCharcters] = useState(false)
  const [passward, setPassward] = useState("")

  // useRef hook
  const passwardRef = useRef(null)

  const passwardGeneraotr = useCallback(() => {
    let pasw = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (validNumber) str += "0123456789"
    if (validCharcters) str += "!&%#@*^$[]{}+=-~`"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pasw += str.charAt(char)
    }
    setPassward(pasw)

  }, [length, validNumber, validCharcters])

  const copyPasswardButton = useCallback(() => {
    passwardRef.current?.select()
    window.navigator.clipboard.writeText(passward)
  }, [passward])

  useEffect(()=> {passwardGeneraotr()}, [length, validNumber, validCharcters, passwardGeneraotr])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Passward generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={passward}
          className='outline-none w-full py-1 px-3'
          placeholder='passward'
          readOnly
          ref={passwardRef} 
          />
          <button
          onClick={copyPasswardButton} 
          type='button' 
          className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'
          >copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={validNumber}
            id='numberInput'
            onChange={() => {
              setValidNumber((prev) => !prev);
            }} 
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={validCharcters}
            id='characterInput'
            onChange={() => {
              setValidNumber((prev) => !prev);
            }} 
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
