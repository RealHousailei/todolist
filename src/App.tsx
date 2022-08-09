import React from 'react';
import './App.css';

interface todoItemProps {
  ticked?: boolean;
  name: string;
}

function App() {
  return (
    <div className="App">
      <Title></Title>
      <div className="todoBox">
        <Input></Input>
        <TodoItem ticked={true} name="something to do"></TodoItem>
        <TodoItem name="something to do"></TodoItem>
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

const tickedStyle = {
  color: ' rgb(98, 149, 85, 0.6)',
  fontSize: '2rem',
  lineHeight: '3rem',
  fontFamily: 'Georgia, serif;',
};

const tickedNameStyle = {
  textDecoration: 'line-through solid rgb(200, 200, 200)',
  color: 'rgb(210, 210, 210)',
};

function TodoItem(props: todoItemProps) {
  return (
    <div className="todoItem">
      <div className="todoTick" style={props.ticked ? tickedStyle : {}}>
        {props.ticked ? '✔' : ''}
      </div>
      <div className="todoName" style={props.ticked ? tickedNameStyle : {}}>
        {props.name}
      </div>
    </div>
  );
}

const selectedStyle = {
  border: '2px solid rgb(255, 142, 142)',
  borderRadius: '10%',
  padding: '5px 10px',
};

function TodoButtom() {
  return (
    <div className="todoButtom">
      <div className="todoLeft">1 item left</div>
      <div className="todoStatus">
        <div className="todoAll" style={selectedStyle}>
          All
        </div>
        <div className="todoActive">Active</div>
        <div className="todoCompleted">Completed</div>
      </div>
      <div className="todoClear">Clear completed</div>
    </div>
  );
}

export default App;
