import React, { useEffect, useState } from 'react'
import { fetchData, postData, deleteUser } from '../../settings/fetchSettings'
import Icon from '@mdi/react';
import { mdiDeleteOutline, mdiNotePlus } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom'

import './ToDo.css'

const ToDo = () => {
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [currentLinkId, setCurrentLinkId] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await fetchData();
    console.log([...data])
    setUsers([...data])
  }

  useEffect(() => {
    getData();
  },[])

  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) { 
      alert('Username cannot be empty!');
      setDisplay(false);
      return; 
    }
    
    await postData({
      name: username,
      todos: [],
    });
    
    setUsername('');
    setDisplay(false);
    getData();
  };

  const deleteCertainUser = async (id) => {
    await deleteUser(id);
    navigate(`/to-do`, { replace: true });
    getData();
    setDisplayDelete(false)
  }

  const toggleDisplay = display ? 'block' : 'none';

  return (
    <>
      <header className='menu'>
        <div className="nav-user">
          {users.map((item, i)=> {
            return (
              <NavLink 
                  onClick={() => {
                    setCurrentLinkId(item.id)
                    setDisplayDelete(true)
                  }}
                  key={i} 
                  to={item.name} 
                  className={({ isActive }) => (isActive ? "user-link-active user-link" : "user-link")}
                  >
                    {item.name}
                  </NavLink>
            )
          })}
        </div>
        <div className="options">
          <Icon path={mdiNotePlus} size={1.3} onClick={() => setDisplay(true)} style={{  }}/>
          <Icon path={mdiDeleteOutline} size={1.3} onClick={() => deleteCertainUser(currentLinkId)} style={{  }}/>
        </div>
      </header>
      <div className='outlet'>
        <form
          onSubmit={handleSubmit}
          style={{
            display: `${toggleDisplay}`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            padding: '20px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: '#e4feff',
            textAlign: 'center',
          }}
        >
          <input
            type="text"
            placeholder="type name of topic..."
            value={username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              outline: 'none',
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
            Submit
          </button>
        </form>
        <Outlet/>
      </div>

    </>
  )
}

export default ToDo


