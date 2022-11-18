import { useEffect, useState } from 'react';

import './App.css';
import { api } from './lib/api';

interface todoItemProps {
  todo: Todo;
  onClick: () => void;
}

interface todoBottomProps {
  undoCount: number;
  clearCompleted: () => void;
  selectAll: () => void;
  selectActive: () => void;
  selectCompleted: () => void;
  status: string;
}

interface inputProps {
  addTodo: (v: string) => void;
  value: string;
}

interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

function App() {
  return (
    <div className="App">
      <Title />
      <TodoBox />
    </div>
  );
}

function Title() {
  return <div className="title">todos</div>;
}

function TodoBox() {
  const [todos, setTodos] = useState([] as Todo[]);

  const [status, setStatus] = useState('all');

  useEffect(() => {
    console.log(1);
    api
      .get('/api/todos')
      .then((res) => {
        if (res.data.success) {
          setTodos(res.data.data?.todos || []);
        } else {
          window.alert(res.data.message || 'undefined error');
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }, []);

  const handleClick = (i: number) => {
    const newTodos = [...todos];
    newTodos[i] = { ...newTodos[i], completed: !newTodos[i].completed };
    api
      .post('/api/todo/status', {
        id: newTodos[i].id,
        completed: newTodos[i].completed,
      })
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          window.alert(res.data.message || 'undefined error');
        } else {
          setTodos(newTodos);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    api
      .delete('/api/todo/completed')
      .then((res) => {
        if (!res.data.success) {
          window.alert(res.data.message || 'undefined error');
        } else {
          setTodos(newTodos);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  const addTodo = (value: string) => {
    api
      .post('/api/todo', { name: value })
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          window.alert(res.data.message || 'undefined error');
        } else {
          setTodos([res.data.data.todo, ...todos]);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  };

  return (
    <div className="todoBox">
      <Input addTodo={addTodo} value={''}></Input>
      {todos.map((todo, i) => {
        if (showTodoItemByStatus(status, todo)) {
          return (
            <TodoItem
              todo={todo}
              onClick={() => handleClick(i)}
              key={i}
            ></TodoItem>
          );
        }
        return null;
      })}
      <TodoBottom
        undoCount={getLeftCount(todos)}
        selectAll={() => setStatus('all')}
        selectActive={() => setStatus('active')}
        selectCompleted={() => setStatus('completed')}
        status={status}
        clearCompleted={clearCompleted}
      ></TodoBottom>
    </div>
  );
}

function showTodoItemByStatus(status: string, todo: Todo) {
  if (
    status === 'all' ||
    (status === 'active' && !todo.completed) ||
    (status === 'completed' && todo.completed)
  ) {
    return true;
  }
  return false;
}

const getLeftCount = (todos: Todo[]) => {
  let i = 0;
  todos.forEach((todo) => {
    if (!todo.completed) {
      i++;
    }
  });
  return i;
};

function Input(props: inputProps) {
  const [input, setInput] = useState('');
  return (
    <div className="todoInput">
      <div className="inputIcon"></div>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onInput={(e) => setInput(e.currentTarget.value)}
        onKeyUp={(e) => {
          if (e.code === 'Enter' && e.currentTarget.value.trim() !== '') {
            props.addTodo(e.currentTarget.value);
            setInput('');
          }
        }}
      ></input>
    </div>
  );
}

const tickedStyle = {
  color: ' rgb(98, 149, 85, 0.6)',
  fontSize: '2rem',
  lineHeight: '3rem',
  fontFamily: 'Georgia, serif',
};

const tickedNameStyle = {
  textDecoration: 'line-through solid rgb(200, 200, 200)',
  color: 'rgb(210, 210, 210)',
};

function TodoItem(props: todoItemProps) {
  return (
    <div className="todoItem">
      <button
        className="todoTick"
        style={props.todo.completed ? tickedStyle : {}}
        onClick={props.onClick}
      >
        {props.todo.completed ? '✔' : ''}
      </button>
      <div
        className="todoName"
        style={props.todo.completed ? tickedNameStyle : {}}
      >
        {props.todo.name}
      </div>
    </div>
  );
}

const selectedStyle = {
  border: '2px solid rgb(255, 142, 142)',
  borderRadius: '10%',
  padding: '5px 10px',
};

function TodoBottom(props: todoBottomProps) {
  return (
    <div className="todoBottom">
      <div className="todoLeft">{props.undoCount} item left</div>
      <div className="todoStatus">
        <button
          className="todoAll"
          style={props.status === 'all' ? selectedStyle : {}}
          onClick={props.selectAll}
        >
          All
        </button>
        <button
          className="todoActive"
          style={props.status === 'active' ? selectedStyle : {}}
          onClick={props.selectActive}
        >
          Active
        </button>
        <button
          className="todoCompleted"
          style={props.status === 'completed' ? selectedStyle : {}}
          onClick={props.selectCompleted}
        >
          Completed
        </button>
      </div>
      <button className="todoClear" onClick={props.clearCompleted}>
        Clear completed
      </button>
    </div>
  );
}

export default App;
