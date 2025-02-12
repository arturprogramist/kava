import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { postTaskBody, getTask, deleteTask } from '../../../../settings/fetchSettings'; 
import Icon from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';
import { useNavigate, useLocation } from "react-router-dom";

const BodyOfTask = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  const id = searchParams.get('id');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const pathAfterToDo = location.pathname.split('/to-do/')[1];
  const firstWord = pathAfterToDo ? pathAfterToDo.split('/')[0] : '';  

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log(title, id, '____________id title');
      e.preventDefault(); // Предотвращаем добавление новой строки
      await postTaskBody({
        title,
        body: note,
      }, id);
      e.target.blur(); // Убираем фокус с textarea
      getData(id);
    }
  };

  const getData = async () => {
    const data = await getTask(id);
    if (data.body) {
      setNote(data.body);
    } else {
      setNote('');
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const removeCurrentTask = (id) => {
    deleteTask(id);
    navigate(`/to-do/${firstWord}`, { replace: true });
  };

  return (
    <div
      style={{
        width: '100%', 
        height: '100%', 
        minHeight: '500px',
        padding: '20px',
        paddingTop: '0px',
        boxSizing: 'border-box', 
        borderRadius: '10px',
        overflow: 'hidden', 
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#e4feff',
        display: 'flex', 
        flexDirection: 'column', 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
        <span style={{ fontSize: '14px', color: '#555' }}>title: {title}</span>
        <Icon 
          path={mdiDeleteOutline} 
          size={1.3} 
          style={{ marginLeft: 'auto', color: 'teal', cursor: 'pointer' }} 
          onClick={() => removeCurrentTask(id)}
        />
      </div>
      <textarea
        value={note}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Write your note here..."
        style={{
          flex: 1, 
          fontSize: '16px',
          padding: '10px',
          boxSizing: 'border-box',
          border: '1px solid #ccc',
          borderRadius: '5px',
          resize: 'none',
          overflow: 'auto', 
          outline: 'none', 
          backgroundColor: '#f8f9fa', 
        }}
      />
    </div>
  );
};

export default BodyOfTask;
