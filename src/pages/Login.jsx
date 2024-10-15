import axios from "axios";
import { useState } from "react";

export function Login() {
  const [passwordInput, setPasswordInput] = useState('') 
  const [emailInput, setEmailInput] = useState('') 
  
  const loginUser = async () => {
    await axios.post('http://localhost:3000/login', {user: {email: emailInput, password: passwordInput}})
  }

  return(
    <>
      <input type="password" name="email" id="email" value={passwordInput} onInput={(event)=> setPasswordInput(event.target.value) } />
      <input type="email" name="email" id="email" value={emailInput} onInput={(event)=> setEmailInput(event.target.value)} />
      <button onClick={() => loginUser()}>LOGIN</button>
    </>
  )

}
