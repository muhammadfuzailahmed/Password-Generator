import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import CopiedSuccessfully from './Popup'
import './App.css'

function App() {
  let [length, setLength] =useState(8);
  let [password, setPassword] = useState('');
  let [isNumber, setIsNumber] = useState(false);
  let [isChar, setisChar] = useState(false);
  const passwordReference = useRef(null);

  const copyPasswordToClipboard = async () => {
      await window.navigator.clipboard.writeText(password);
      passwordReference.current.select();

}


  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumber) {
      str += "0123456789";
    }
    if(isChar) {
      str += "!@#$%^&*()";
    }

    for(let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, isNumber, isChar]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumber, isChar])


  return (
    <>
      <div className='bg-gray-700 w-96 h-96 m-auto mt-4 rounded-b-md'>
          <h1 className='text-white text-3xl font-bold text-center mt-0.5 mb-2'>Password Generator</h1>
          <div className='mt-2 p-3'>
            <input type="text" 
            name=""
            id=""
            readOnly
            className=' text-white border-2 border-black w-68 rounded-sm p-1 outline-none'
            placeholder='Password'
            value={password}
            ref={passwordReference}
            />
            <button onClick={copyPasswordToClipboard} className=' bg-blue-600 p-1 w-16 cursor-pointer font-bold'>Copy</button>
          </div>
          {/* Input range */}
          <div className='p-3'>
              <input type="range" 
              name=""
              id=""
              className='cursor-pointer'
              min={6}
              max={20} 
              value={length}
              onChange={(e) => {
                setLength(e.target.value)
              }}
               />
              <label className='text-white m-0.5 relative bottom-1 left-1' htmlFor="range">length: {length}</label>
          </div>

          <div className='p-3'>
              <input type="checkbox" 
              name=""
              id=""
              defaultValue={isNumber}
              onChange={() => {
                setIsNumber((prev) => !prev)
              }}
              />
              <label className='text-white ml-2' htmlFor="number">include numbers</label>              
          </div>

          <div className='pl-3'>
            <input type="checkbox" 
              name=""
              id=""
              defaultValue={isChar}
              onChange={() => {
                setisChar((prev) => !prev)
              }}
              />
              <label className='text-white ml-2' htmlFor="character">include characters</label>
          </div>

      </div>
    </>
  )
}

export default App
