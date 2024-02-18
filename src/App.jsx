import { useState, useEffect } from "react";

import { CiCircleRemove } from "react-icons/ci";

function App() {
  const [todoArr, setTodoArr] = useState([]);
  const [realtime, setRealtime] = useState("");

  const [input, setInput] = useState({
    title: "",
    desc: "",
    timeAndDate: ""
  });

  const getItem = JSON.parse(localStorage.getItem("todoArr")) || [];
  useEffect(() => {
    setTodoArr(getItem);
    const interval = setInterval(() => {
      const a = new Date();
      const b = a.toLocaleTimeString("en-US", { hour12: false });
      setRealtime(b);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [input]);
  // console.log(realtime);

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
      <div key={i + 1}>
        <h1>{todolist.title}</h1>
        <p>{todolist.desc}</p>
        <h1>{todolist.timeAndDate}</h1>
        <CiCircleRemove onClick={() => del(todolist.title)} />
      </div>
    );
  });

  // const b = todoArr

  function alarm() {
    todoArr.find((item) => {
      if (item.timeAndDate === realtime) {
        alert("hi");
      }
    });
  }

  alarm();

  return (
    <div>
      <div>{realtime}</div>
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
    </div>
  );
}

export default App;
