import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskEditForm from './TaskEditForm';

export default function TaskList(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try{
      const res = await axios.get('/api/tasks/');
      setTasks(res.data);
    }catch(err){
      console.error(err);
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchTasks() }, []);

  const addTask = async (data) => {
    try{
      const res = await axios.post('/api/tasks/', data);
      setTasks(prev=>[res.data, ...prev]);
    }catch(err){console.error(err)}
  }

  const toggleComplete = async (task) => {
    try{
      const res = await axios.patch(`/api/tasks/${task.id}/`, {completed: !task.completed});
      setTasks(prev=> prev.map(t => t.id === res.data.id ? res.data : t));
    }catch(err){console.error(err)}
  }

  const deleteTask = async (taskId) => {
    try{
      await axios.delete(`/api/tasks/${taskId}/`);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }catch(err){console.error(err)}
  }

  const saveTask = async (taskId, data) => {
    try{
      const res = await axios.patch(`/api/tasks/${taskId}/`, data);
      setTasks(prev=> prev.map(t => t.id === res.data.id ? res.data : t));
      setEditingTaskId(null);
    }catch(err){console.error(err)}
  }

  if(loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Task Tracker</h2>
      <TaskForm onSubmit={addTask} />
      <ul>
        {tasks.map(task=>(
          <li key={task.id} style={{marginBottom:12}}>
            {editingTaskId === task.id ? (
              <TaskEditForm
                task={task}
                onSave={saveTask}
                onCancel={()=>setEditingTaskId(null)}
              />
            ) : (
              <div>
                <strong>{task.title}</strong> - {task.description || "No description"}  
                <span style={{marginLeft:8}}>
                  {task.completed ? "✅ Completed" : "❌ Not Completed"}
                </span>
                <div style={{marginTop:4}}>
                  <button onClick={()=>setEditingTaskId(task.id)}>Edit</button>
                  <button onClick={()=>deleteTask(task.id)} style={{marginLeft:8}}>Delete</button>
                  <button onClick={()=>toggleComplete(task)} style={{marginLeft:8}}>
                    Toggle Complete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
