import { useRef, useState } from "react";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);
  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/api/login", {
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
    console.log(emailRef.current!.value, passwordRef.current!.value);
    setMessage(json);
  };
  return (
    <div>
      Please Login dear My Queen
      {JSON.stringify(message)}
      <input type='text' placeholder='email' ref={emailRef} />
      <input type='password' placeholder='password' ref={passwordRef} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
