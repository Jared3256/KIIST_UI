import  {useEffect} from "react";
import {io} from "socket.io-client";
import {useNavigate} from "react-router"

export default function Payment() {


  const socket = io("http://localhost:3500")
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join-wait","1234567890")

    socket.on('registration-complete', () => {
      navigate('/auth/login');
    });

    return () => socket.disconnect();
  }, []);

  return <div>Mpesa payment</div>;
}
