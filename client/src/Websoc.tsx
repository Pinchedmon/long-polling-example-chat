import React, { useEffect, useState } from "react";
interface Imessage {
  message: string;
  id: number;
  username: string;
  event: string;
}
const Websoc = () => {
  const [messages, setMessages] = useState<Array<Imessage>>([]);
  const [value, setValue] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  const socket = new WebSocket("ws://localhost:5050");
  const connect = () => {
    const socket = new WebSocket("ws://localhost:5050");
    socket.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.send(JSON.stringify(message));
    };
    socket.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };
    socket.onclose = () => {
      console.log("socket closed");
    };
    socket.onerror = () => {
      console.log("socket error");
    };
  };
  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
    };
    socket.send(JSON.stringify(message));
    setValue("");
  };
  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Type your name"
          />
          <button onClick={connect}>Enter</button>
        </div>
      </div>
    );
  }
  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className={`${messages.length > 0 ? "messages" : ""}`}>
          {messages.map((item: Imessage, index: number) => (
            <div className="message" key={index}>
              {item.event === "connection" ? (
                <div>User {item.username} connected</div>
              ) : (
                <div>
                  {" "}
                  {item.username} {item.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Websoc;
