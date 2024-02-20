import { useState, useEffect, useRef } from "react";

import { CiCircleRemove } from "react-icons/ci";

import NotificationSound from "./notification/mixkit-weird-alarm-loop-2977.wav";

function App() {
  const [todoArr, setTodoArr] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [firstView, setFirstView] = useState(true);
  const [secondView, setSecondView] = useState(false);
  const [second, setSeconds] = useState("");
  const [minute, setMinutes] = useState("");
  const [hour, setHours] = useState("");
  const audioPlayer = useRef(null);

  const [input, setInput] = useState({
    title: "",
    desc: "",
    timeAndDate: ""
  });

  const getItem = JSON.parse(localStorage.getItem("todoArr")) || [];
  useEffect(() => {
    setTodoArr(getItem);
    const interval = setInterval(() => {
      const date = new Date();
      const getCurrentime = date.toLocaleTimeString("en-US", { hour12: false });

      setCurrentTime(getCurrentime);
      let hr = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      setSeconds(sec * 6);
      setMinutes(6 * min);
      setHours(30 * hr + min / 2);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
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
    setTodoArr(updatedArr)
  }

  const x = getItem.map((todolist, i) => {
    return (
      <div key={i} className="tasks-list">
        <p>{todolist.title}</p>
        <p>{todolist.desc}</p>
        <p>{todolist.timeAndDate}</p>
        <div><CiCircleRemove onClick={() => del(todolist.title)} /></div>
      </div>
    );
  });

  function alarm() {
    todoArr.find((item) => {
      if (item.timeAndDate === currentTime) {
        playAudio("play");
      }
    });

    const updatedArr = getItem.filter(
      (item) => item.timeAndDate !== currentTime
    );
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
    <div className="con">
      {firstView && (
        <div className="first-view">
          <div className="h1-clock">
            <h1>
              Manage your <span>tasks</span> easily
            </h1>
            <div className="outer-circle">
              <div className="inner-circle">
                <div>
                  <div
                    className="hour"
                    style={{ transform: `rotate(${hour}deg)` }}
                    id="hour"></div>
                  <div
                    className="minute"
                    style={{ transform: `rotate(${minute}deg)` }}
                    id="minute"></div>
                  <div
                    className="second"
                    style={{ transform: `rotate(${second}deg)` }}
                    id="second"></div>
                </div>
              </div>
            </div>
            <div
              className="overlay"
              onClick={() => {
                setFirstView(false);
                setSecondView(true);
              }}>
              <p>Skip</p>
            </div>
          </div>
        </div>
      )}
      {secondView && (
        <div className="second-view-con">
          <h1>Your tasks for the day!!!</h1>
          <p>{currentTime}</p>
          <form onSubmit={submit}>
            <div>
              <label>Title: </label>
              <input
                type="text"
                onChange={handleChange}
                name="title"
                value={input.title} required
              />
            </div>

            <div>
              <label>Desc: </label>
              <input
                type="text"
                onChange={handleChange}
                name="desc"
                value={input.desc} required
              />
            </div>
            <div>
              <label>Time: </label>
              <input
                type="type"
                onChange={handleChange}
                name="timeAndDate"
                value={input.timeAndDate} required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          {getItem.length < 1 && (
            <p className="empty">
              It is empty, add to not to miss out on your important tasks
            </p>
          )}
          <div className="x-con">{x}</div>
          <audio ref={audioPlayer} src={NotificationSound} />
        </div>
      )}
    </div>
  );
}

export default App;
