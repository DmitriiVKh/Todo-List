import { useState, useEffect } from 'react'
import {ref, onValue, push, remove, update } from 'firebase/database'
import { db } from './firebase'
import './App.css'

const todosRef = ref(db, 'todos');

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState(false);

  

  useEffect(() => {
      const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setTodos(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

 
  const addTodo = async () => {
    try {
      const newTodoRef = push(todosRef);
      await update(newTodoRef, { title: newTodo });
      const data = { id: newTodoRef.key, title: newTodo };
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      console.log('Ошибка при добавлении дела', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await remove(ref(todosRef, id));
    } catch (error) {
      console.log('Ошибка при удалении дела', error);
    }
  };

  const updateTodo = async (id, newTitle) => {
    try{
      await update(ref(todosRef, id), { title: newTitle });
    } catch (error) {
      console.log('Ошибка при обновлении дел', error);
    }
  };

  const searchTodos = () => {
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTodos(filteredTodos);
  };

  const toggleSort = () => {
    setSortMode(!sortMode);
  };

  const sortedTodos = sortMode 
  ? [...todos].sort((a, b) => a.title.localeCompare(b.title)) 
  : [...todos];
  
  

  return (
    <>
      <div className="todo-list">
        <h1>Todo List</h1>
        <div>
          <input
          type='text'
          placeholder='Новая задача'
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          />
          <button onClick={addTodo}>Добавить задачу</button>
        </div>
         
          <form onSubmit={(event) => { event.preventDefault(); searchTodos(); }}>
            <input
              type='text'
              placeholder='Поиск задачи'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button type="submit">Поиск</button>
          </form>

         <div>
          <label>
          <input
          type='checkbox'
          onChange={toggleSort}
          />
          Сортировать по алфавиту
          </label>
         </div>
         <ul>
          {sortedTodos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
              <button
                onClick={() => {
                  const newTitle = prompt('Введите новое название задачи:', todo.title);
                  if (newTitle !== null) {
                    updateTodo(todo.id, newTitle);
                  }
                }}
              >
                Изменить
              </button>
            </li>
          ))}
        </ul>
        


      </div>
    </>
  )
}

export default App
