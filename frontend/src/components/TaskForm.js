import React, {useState} from 'react';

export default function TaskForm({onSubmit}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if(!title.trim()) return; // simple validation
    onSubmit({ title, description }); // call the function passed from parent
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={submit} style={{marginBottom:16}}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        style={{width:'40%'}}
      />
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Short description"
        style={{width:'40%', marginLeft:8}}
      />
      <button type="submit" style={{marginLeft:8}}>Add Task</button>
    </form>
  )
}
