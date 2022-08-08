import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Title></Title>
      <div className="todoBox">
        <Input></Input>
        <TodoItem></TodoItem>
        <TodoItem></TodoItem>
        <TodoButtom></TodoButtom>
      </div>
    </div>
  );
}

function Title() {
  return <div className="title">todos</div>;
}

// function TodoBox() {
//   return <div className="todo-box">1111</div>;
// }

function Input() {
  return (
    <div className="todoInput">
      <div className="inputIcon"></div>
      <input type="text" placeholder="What needs to be done?"></input>
    </div>
  );
}

function TodoItem() {
  return (
    <div className="todoItem">
      <div className="todoTick"></div>
      <div className="todoName">Something to do</div>
    </div>
  );
}

function TodoButtom() {
  return (
    <div className="todoButtom">
      <div className="todoLeft">1 item left</div>
      <div className="todoStatus">
        <div className="todoAll">All</div>
        <div className="todoActive">Active</div>
        <div className="todoCompleted">Completed</div>
      </div>
      <div className="todoClear">Clear completed</div>
    </div>
  );
}

export default App;
