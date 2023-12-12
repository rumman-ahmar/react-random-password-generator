import React, { useState, useCallback, useEffect, useRef } from 'react'

const RandomPasswordGenerator = () => {

  const [passLength, setPassLength] = useState(6)
  const [isNumber, setIsNumber] = useState(false)
  const [isSpecialChar, setIsSpecialChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let generated_password = ""
    let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (isNumber) text += "0123456789"
    if (isSpecialChar) text += "!@#$%^&*()_+><;:="

    for (let i = 1; i <= passLength; i++) {
      let pass_idx = Math.floor(Math.random() * text.length + 1)
      generated_password += text.charAt(pass_idx)
    }
    setPassword(generated_password)
  }, [passLength, isNumber, isSpecialChar, setPassword])

  useEffect(() => {
    generatePassword()
  }, [passLength, isNumber, isSpecialChar, generatePassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="md:h-56 w-[380px] md:w-[550px] bg-white rounded-lg">
        <h1 className="md:text-2xl text-xl md:font-semibold pt-4 px-8 md:pt-12 md:px-24">Random Password Generator</h1>
        <div className="py-4 px-4 md:px-12">
          <div className="flex flex-row">
            <input
              className="pl-4 w-56 md:w-96 h-12 rounded-lg border border-gray-200 focus:border-gray-200 outline-none"
              type="text"
              readOnly
              value={password}
              ref={passwordRef}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={copyPasswordToClipboard}
            >Copy</button>
          </div>

          <div className="flex text-sm gap-x-2">

            <div className="flex items-center gap-x-1">
              <input
                className="cursor-pointer"
                type="range"
                min={6}
                max={100}
                value={passLength}
                onChange={(event) => setPassLength(event.target.value)}
              /> <label>Length: {passLength} </label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                onChange={() => { setIsNumber((prev) => !prev) }}
              />
              <label>Numbers</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                onChange={() => { setIsSpecialChar((prev) => !prev) }}
              />
              <label>Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RandomPasswordGenerator