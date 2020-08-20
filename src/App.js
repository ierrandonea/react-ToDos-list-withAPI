import React, { useState, useRef } from 'react';

function App() {
  const [state, setState] = useState([])

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
    setState([...state])
  };

  const [mHover, setMHover] = useState(false)

  return (
    <div className="card d-flex justify-content-center
    align-items-center">
      <div className="row w-100 no-gutters">
        <div className="col-12">
          <h3 className="text-center mt-2">To do's</h3>
          <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0" type="text" ref={inputTask} onKeyDown={handleKeyPress} placeholder="New tasks goes here..." />
          <ul className="list-group rounded-0 border-0">
            {
              state.length > 0 ?
                state.map((task, index) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-baseline rounded-0 border-left-0 border-right-0 border-top-0"
                      key={index}
                      onClick={() => handleClick(index)}>
                      {task}
                      <i
                        class={"fas" + (mHover === true ? " fa-minus-square" : " fa-check-square")}
                        onMouseOver={() => { setMHover(true) }}
                        onMouseOut={() => { setMHover(false) }}>
                      </i>
                    </li>
                  )
                }) :
                <li className="list-group-item text-muted rounded-0 border-left-0 border-right-0 border-top-0">Empty list</li>
            }
          </ul>
          <span className="ml-2 text-muted">{state.length} items left</span>
        </div>
      </div>
    </div>
  );
}

export default App;
