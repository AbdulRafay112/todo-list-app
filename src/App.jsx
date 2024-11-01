import Navbar from "./components/Navbar"
import { useState , useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'; 
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  const saveTO = (params)=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if(todoString){
    let todos = JSON.parse(localStorage.getItem('todos'))
    setTodos(todos)
    }
  }, [])
  
  // function for add todos
  const handleAdd = ()=>{
    setTodos([...todos , {id:uuidv4(), todo , isCompleted:false}]);
    setTodo("");
    saveTO()
  }

  // function for edit todos
  const handleEdit = (e , id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
    saveTO()
  }

  // function for delete todos 
  const handleDelete = (e,id)=>{
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if(isConfirmed){
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
  }
  saveTO()
  }

  // function for handle change input;
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  // function for handle checkbox
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted ;
    setTodos(newTodos)
    saveTO()
  }

  // function for toggle finished todos
  const toggleFinished = ()=>{
    setShowFinished(!showFinished)

  }
  return (
    <>
    <Navbar/>
    <div className="container bg-slate-600 text-white w-full mx-auto my-3 min-h-screen px-4 md:w-1/2">
    <div className="flex justify-center">
    <h1 className="my-5 text-xl xl:text-2xl">Tick-It -- lets Manage Your todos</h1>
    </div>
      <div className="addTodo">
        <h1 className="font-bold mx-3 my-3 text-xl">Add a todo</h1>
        <div className="flex flex-col items-center">
        <input onChange={handleChange} type="text" value={todo} className="w-[80%]   text-black px-2"  />
        <button onClick={handleAdd} disabled = {todo.length < 3} className="bg-slate-700 w-[80%]  my-4 px-2 text-xl disabled:bg-slate-500 ">save</button>
        </div>
      </div>
      <input type="checkbox" checked={showFinished} onChange={toggleFinished}  /> show finished
      <h2 className="font-bold mx-3 my-1 text-xl">Your todos</h2>
      <div className="todos">
        {todos.length === 0 && <div className="m-5">No todos to display </div>}
        {todos.map(item=>{
        return  (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-3 mx-3 my-4">
          <div className="todo-text flex gap-2 w-72">
          <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
          <div className={item.isCompleted? "line-through" : "" }  >{item.todo}</div>
          </div>
          <div className="buttons flex gap-4 mx-6">
            <button onClick={(e)=>handleEdit(e , item.id)}><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}}><MdDelete /></button>
          </div>
        </div>
        })}
      </div>


    </div>

 
    </>
  )
}

export default App
