import Router from './routes/Router'
import socket, { socketConnect } from './socket'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    socketConnect()
    return function cleanup() {
      socket.off("connect_error");
    };
  }, [])
  return (
    <Router />
  );
}

export default App;
