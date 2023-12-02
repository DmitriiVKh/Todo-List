import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log('Ошибка при получении данных', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [])
  

  return (
    <>
      <div className="todo-list">
        <h1>Todo List</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
