import { useRef, useState } from "react";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);
  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailRef.current!.value,
        password: passwordRef.current!.value
      })
    });
    const json = await res.json();
    setMessage(json);
  };
  return (
    <div>
      <h1>Sign up now</h1>
      {JSON.stringify(message)}
      <input type='text' placeholder='email' ref={emailRef} />
      <input type='password' placeholder='password' ref={passwordRef} />
      <button onClick={handleLogin}>Sign up</button>
    </div>
  );
}
