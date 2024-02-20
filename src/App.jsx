import { useState, useEffect, useRef } from "react";

import { CiCircleRemove } from "react-icons/ci";

import NotificationSound from "./notification/mixkit-weird-alarm-loop-2977.wav";


function App() {
  const [todoArr, setTodoArr] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const audioPlayer = useRef(null);

  const [input, setInput] = useState({
    title: "",
    desc: "",
    timeAndDate: ""
  });


  const getItem = JSON.parse(localStorage.getItem("todoArr")) || [];
  useEffect(() => {
    setTodoArr(getItem);
    // const interval = setInterval(() => {
      // const getCurrentime = new Date().toLocaleTimeString("en-US", { hour12: false });
      // setCurrentTime(getCurrentime);
    // }, 1000);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [input]);
  // console.log(currentTime);

  function playAudio(play) {
    console.log(play);
    if (play === "play") {
      audioPlayer.current.play();
    }
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();

    setTodoArr([...todoArr, input]);
    localStorage.setItem("todoArr", JSON.stringify([...todoArr, input]));
    setInput((prev) => {
      return { ...prev, title: "", desc: "", timeAndDate: "" };
    });
  }

  function del(title) {
    const updatedArr = getItem.filter((todo) => todo.title !== title);
    localStorage.setItem("todoArr", JSON.stringify(updatedArr));
  }

  const x = getItem.map((todolist, i) => {
    return (
      <div key={i}>
        <h1>{todolist.title}</h1>
        <p>{todolist.desc}</p>
        <h1>{todolist.timeAndDate}</h1>
        <CiCircleRemove onClick={() => del(todolist.title)} />
      </div>
    );
  });


  function alarm() {
    todoArr.find((item) => {
      if (item.timeAndDate === currentTime) {
        playAudio("play");
      }

    });

    const updatedArr = getItem.filter((item) => item.timeAndDate !== currentTime);
    localStorage.setItem("todoArr", JSON.stringify(updatedArr));
  }

  alarm();

  function stopAlarm() {
    const millisecondsToAdd = 1 * 60 * 2000; // 20secs

    if (input.timeAndDate + millisecondsToAdd === currentTime) {
      location.reload();
    }
  }

  stopAlarm();

  return (
    <div>
      <div>{currentTime}</div>
      <form onSubmit={submit}>
        <label>Title</label>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={input.title}
        />

        <label>Desc</label>
        <input
          type="text"
          onChange={handleChange}
          name="desc"
          value={input.desc}
        />

        <label>Date</label>
        <input
          type="type"
          onChange={handleChange}
          name="timeAndDate"
          value={input.timeAndDate}
        />
        <button type="submit">Submit</button>
      </form>
      {getItem.length < 1 && <p>It is empty</p>}
      {x}
      <audio ref={audioPlayer} src={NotificationSound} />
    </div>
  );
}

export default App;
