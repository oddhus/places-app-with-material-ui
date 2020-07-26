import React, { useState } from 'react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';


export default function Auth() {
  const [signInMode, setSignInMode] = useState(true)

  return (
    signInMode ? <SignIn setSignInMode={setSignInMode} /> : <SignUp setSignInMode={setSignInMode} />
  )
}