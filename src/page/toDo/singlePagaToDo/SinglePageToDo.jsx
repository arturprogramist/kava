import React, { useEffect, useState } from 'react'
import { fetchData, postTask } from '../../../settings/fetchSettings';
import { NavLink, Outlet, useParams } from 'react-router-dom'

import './SinglePageToDo.css'

const SinglePageToDo = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('')
  const [currentId, setCurrentId] = useState(null);

  const getTasks = async () => {
    const tasks = await fetchData(id);
    console.log(tasks[0].id, 'tasks update')

    setTasks([...tasks[0].todos]);
    console.log(tasks, 'user id from single page')
    setCurrentId(tasks[0].id)
  }

  useEffect(() => {
    getTasks();
  },[id])
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (value.trim()) {
      await postTask({ title: value }, currentId);
      getTasks();
    }
    setValue('');
  };

  return (
    <div className='task-maneger' style={{ display: 'flex', minHeight: '100%', width: '100%', }}>
      <div className='task-container'>
        <div 
           style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              boxSizing: 'border-box'
              }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
              padding: '20px',
              backgroundColor: '#e4feff',
              textAlign: 'center',
              borderRadius: '20px',
              marginBottom: '10px',
              boxSizing: 'border-box'
            }}
          >
            <span style={{ display: 'block', fontSize: '14px', color: '#555' }}>
              Name of Task
            </span>
            <input
              className='inputTask'
              type="text"
              placeholder="task name"
              value={value}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: 'teal',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              add
            </button>
          </form>
        </div>
        <ul className='tasks' style={{ position: 'relative' }}>
          {tasks.map((item, i) => {
            return (
              <li key={i} 
              className='task-link'>
                <NavLink 
                  className={({ isActive }) => (isActive ? "link-task-active link-task" : "link-task")}
                  to={{
                    pathname: `${item.title}${item.id}`, 
                    search: `?title=${encodeURIComponent(item.title)}&id=${item.id}&page=${id}`
                  }}
                >
                  {item.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <div style={{ width: '100%' }}><Outlet/></div>
      
    </div>
  )
}

export default SinglePageToDo
