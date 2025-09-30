import React from 'react';
import TaskList from './components/TaskList';


function App(){
return (
<div style={{maxWidth:700, margin:'2rem auto', padding:'1rem'}}>
<h1>Task Tracker</h1>
<TaskList />
</div>
)
}


export default App;
