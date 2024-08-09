// src/App.js
import React, { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from './services/authApi';
import { useGetItemsQuery, useAddItemMutation, useUpdateItemMutation, useDeleteItemMutation } from './services/itemApi';

function App() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { data: items, refetch } = useGetItemsQuery();
  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [newItem, setNewItem] = useState({ title: '', content: '' });
  const [user, setUser] = useState({ username: '', password: '' });

  const handleRegister = async () => {
    try {
      const { token } = await register(user).unwrap();
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleLogin = async () => {
    try {
      const { token } = await login(user).unwrap();
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await addItem(newItem).unwrap();
      setNewItem({ title: '', content: '' });
      refetch();
    } catch (error) {
      console.error('Add item failed', error);
    }
  };

  const handleUpdateItem = async (id) => {
    try {
      await updateItem({ id, title: 'Updated Title', content: 'Updated Content' }).unwrap();
      refetch();
    } catch (error) {
      console.error('Update item failed', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Delete item failed', error);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div>
        <h2>Add New Item</h2>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          value={newItem.content}
          onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <ul>
        {items?.map((item) => (
          <li key={item._id}>
            {item.title} - {item.content}
            <button onClick={() => handleUpdateItem(item._id)}>Update</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
