import React, { useState, useRef } from 'react';

function App() {
  const [state, setState] = useState(["Make the bed", "Wash my hands", "Eat", "Walk the dog"])

  const inputTask = useRef('');

  const handleKeyPress = e => {
   if (e.keyCode === 13 && e.target.value !== '') {
      setState([...state, e.target.value]);
      e.target.value = '';
    } else {
       console.log(inputTask.current.value);
    }
  }

  const handleClick = index => {
      state.splice(index, 1);
      console.log(state);
      setState([...state])
  };

  return (
    <div className="card d-flex justify-content-center
    align-items-center text-center">
      <h3>To do's</h3>
      <input type="text" ref={inputTask} onKeyDown={handleKeyPress} />
      <ul className="list-item-group">
        {
        state.map((task,index) => {
          return (
          <li className="list-item" key={index} onClick={() => handleClick(index)}>{task}</li>
          )
        })
        }
      </ul>
      <span>{state.length} items left</span>
    </div>
  );
}

export default App;
