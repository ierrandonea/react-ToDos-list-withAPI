import React, { useState, useEffect } from 'react';

function App() {

  const [state, setState] = useState([])

  console.log(state);

  const getToDos = async () => {
    try {
      const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ierrandonea");
      const data = await response.json();
      data.result = "ok" ?
      setState(data)
      : postToDos()
    } catch (error) {
      console.log(error)
    }
  };

  const putToDos = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ierrandonea", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...state])
    })
      .then(response => response.json())
      .then(data => {
        console.log('Saved new task:', data);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const deleteToDos = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ierrandonea", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Deleted user', data);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const postToDos = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ierrandonea", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([])
    })
      .then(response => response.json())
      .then(data => {
        console.log('Posted User', data);
      })
      .catch((error) => {
        console.log(error)
      });
  };


  // GET To Do's
  useEffect(() => {
    getToDos()
  }, [])

  // PUT To Do's
  useEffect(() => {
    state.length > 0 ?
    putToDos()
    : console.log("array must be > 0 to PUT")
  }, [state])

  const handleKeyPress = e => {
    if (e.keyCode === 13 && e.target.value !== '') {
      setState([...state, { label: e.target.value, done: false }]);
      e.target.value = '';
      console.log(state)
    };
  }

  // changes status and deletes
  const handleClick = index => {
    state[index].done == false?
    setState(state[index].done = true)
    :
    state.splice(index, 1);
    state.length > 0 ?
      setState([...state])
      :
      setState([{ label: "Add more tasks...", done: false }])
  };
  
 // deletes and changes status separately **NOT WORKING**

  // const handleDelete = index => {
  //   state.splice(index, 1);
  //   state.length > 0 ?
  //     setState([...state])
  //     :
  //     setState([{ label: "Add more tasks...", done: false }])
  // }

  // const handleClick = index => {
  //   state[index].done == false?
  //   setState(state[index].done = true)
  //   :
  //   console.log(state[index.done])
  // };


  const handleReset = () => {
    setState([{ label: "Add more tasks...", done: false }])
  };

  return (
    <div className="card d-flex justify-content-center
    align-items-center">
      <div className="row w-100 no-gutters">
        <div className="col-12">
          <h3 className="text-center mt-2 font-600">To do's</h3>
          <input className="form-control rounded-0 border-left-0 border-right-0 border-top-0"
            type="text"
            onKeyDown={handleKeyPress}
            placeholder="New tasks goes here..." />
          <ul className="list-group rounded-0 border-0">
            {
              state.length > 0 ?
                state.map(({ label: task, done: status }, index) => {
                  console.log(task, status)
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-baseline rounded-0 border-left-0 border-right-0 border-top-0"
                      key={index}
                      onClick={() => handleClick(index)}>
                      {task}
                      <span className="icons">
                      <i
                        className={"fas" + (state[index].done === true ? " fa-check-square" : " fa-square")}>
                      </i>
                      </span>
                    </li>
                  )
                }) :
                <li className="list-group-item text-muted rounded-0 border-left-0 border-right-0 border-top-0">Empty list</li>
            }
          </ul>
          <div className="d-flex justify-content-between align-items-baseline mx-2">
            <span className="ml-2 text-muted font-200">{state.length} items left</span>
            <span className="font-400 reset-btn" onClick={() => handleReset()}>reset list</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
