export const authFetch = async (login, password) => {
  const credentials = btoa(`${login}:${password}`);
  
  const response = await fetch('https://0a5c-194-42-110-146.ngrok-free.app/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    console.error('Error: Authentication failed');
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const token = await response.text();
  localStorage.setItem('authToken', token); // Save token to localStorage
  console.log(token, 'Token saved to localStorage');
  return token;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const fetchData = async (user) => {
  const response = await fetch('https://0a5c-194-42-110-146.ngrok-free.app/todo/all', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...getAuthHeaders(),
    }
  });

  if (response.ok) {
    const data = await response.json();
    return user ? data.filter(item => item.name === user) : data;
  } else {
    console.error('Error fetching data', response);
  }
};

export const postData = async (body) => {
  const response = await fetch('https://0a5c-194-42-110-146.ngrok-free.app/todo', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) console.error('Error posting data', response);
};

export const postTask = async (body, id) => {
  const response = await fetch(`https://0a5c-194-42-110-146.ngrok-free.app/todo/${id}/todos`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) console.error('Error updating task', response);
};

export const postTaskBody = async (body, id) => {
  const response = await fetch(`https://0a5c-194-42-110-146.ngrok-free.app/TaskFlow/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) console.error('Error updating task body', response);
};

export const getTask = async (id) => {
  const response = await fetch(`https://0a5c-194-42-110-146.ngrok-free.app/TaskFlow/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...getAuthHeaders(),
    }
  });

  if (response.ok) return await response.json();
  console.error('Error fetching task', response);
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`https://0a5c-194-42-110-146.ngrok-free.app/TaskFlow/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...getAuthHeaders(),
      }
    });

    if (!response.ok) throw new Error(`Failed to delete task. Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`https://0a5c-194-42-110-146.ngrok-free.app/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...getAuthHeaders(),
      }
    });

    if (!response.ok) throw new Error(`Failed to delete user. Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    return null;
  }
};
