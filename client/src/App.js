import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [taskText, setTaskText] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [edit, setEdit] = useState('');
  const [editTask, setEditTask] = useState('');

  const addTask = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5700/api/item', {item: taskText})
      setTaskList(prev => [...prev, res.data]);
      setTaskText('');
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const getTaskList = async () => {
      try{
        const res = await axios.get('http://localhost:5700/api/items')
        setTaskList(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getTaskList()
  },[]);

  const deleteTask = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:5700/api/item/${id}`)
      const newTaskList = taskList.filter(item=> item._id !== id);
      setTaskList(newTaskList);
    }catch(err){
      console.log(err);
    }
  }

  const editTasks = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:5700/api/item/${edit}`, {item: editTask})
      console.log(res.data)
      const editIndex = taskList.findIndex(item => item._id === edit);
      const editedTask = taskList[editIndex].item = editTask;
      setEditTask('');
      setEdit('');
    }catch(err){
      console.log(err);
    }
  }

  const printEdit = () => (
    <form onSubmit={(e)=>{editTasks(e)}} >
      <input className='text' type="text" placeholder="New Task" onChange={e=>{setEditTask(e.target.value)}} value={editTask} />
      <button className='edit' type="submit">Edit</button>
    </form>
  )

  return (
    <div className="App">
      <h1><span className='header'>Task List</span></h1>
      <form onSubmit={e => addTask(e)}>
        <input className='text' type="text" placeholder='Enter new task' onChange={e => {setTaskText(e.target.value)} } value={taskText} />
        <button className='create' type="submit">Create</button>
      </form>
      <div>
        {
          taskList.map(item => (
          <div>
            {
              edit === item._id
              ? printEdit()
              : <>
                  <p><span className='tasks'>"{item.item}"</span></p>
                  <button className='edit' onClick={()=>{setEdit(item._id)}}>Edit</button>
                  <button className='del' onClick={()=>{deleteTask(item._id)}}>Delete</button>
                </>
            }
          </div>
          ))
        }
        

      </div>
    </div>
  );
}

export default App;
