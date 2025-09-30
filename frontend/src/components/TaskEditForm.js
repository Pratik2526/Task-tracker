import React, {useState} from 'react';


export default function TaskEditForm({task, onSave, onCancel}){
const [title, setTitle] = useState(task.title);
const [description, setDescription] = useState(task.description);


const submit = (e) =>{
e.preventDefault();
onSave(task.id, {title, description});
}


return (
<form onSubmit={submit} style={{marginTop:8}}>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" style={{width:'40%'}} />
<input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" style={{width:'40%', marginLeft:8}} />
<button type="submit" style={{marginLeft:8}}>Save</button>
<button type="button" onClick={onCancel} style={{marginLeft:8}}>Cancel</button>
</form>
)
}