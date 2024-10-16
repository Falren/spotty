import axios from "axios";
import {  useState } from "react";
import { useAuth } from "../contexts/auth_context";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [passwordInput, setPasswordInput] = useState('') 
  const [emailInput, setEmailInput] = useState('') 
  const { setToken } = useAuth()
  const navigate = useNavigate();


  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {user: {email: emailInput, password: passwordInput}})
      setToken(response.headers['authorization'].split(' ')[1])
      navigate("/chat", { replace: true });
    } catch(error) {
      console.error(error)
    }
  }

  return(
    <>
      <input type="password" name="email" id="email" value={passwordInput} onInput={(event)=> setPasswordInput(event.target.value) } />
      <input type="email" name="email" id="email" value={emailInput} onInput={(event)=> setEmailInput(event.target.value)} />
      <button onClick={() => loginUser()}>LOGIN</button>
    </>
  )

}
