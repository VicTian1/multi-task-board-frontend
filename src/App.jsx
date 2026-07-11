import './App.css'
import Navbar from './components/Navbar'
import Board from './components/Board'
import React from "react"
import Tasks from "./data/Data.js"
import TaskForm from "./components/TaskForm"

function App() {
  const [taskData, setTaskData]=React.useState([])
  const [isChange, setIsChange]=React.useState(null)
  const [editingTask, setEditingTask]=React.useState(null)
  
  function addTask(){
    setIsChange("add")
  }
  function editTask(id){
    setEditingTask(taskData.filter(item=>{
      if(item.id===id){
        return true
      }
      return false
    })[0])
    setIsChange("edit")
  }

  function handleInfo(formData){
    const newData=  Object.fromEntries(formData.entries())
    const newTask={...newData, status:"to do", id:editingTask? editingTask.id:crypto.randomUUID()}
    if(editingTask){
      setTaskData(prev=>{
        return prev.map(item=>{
          if(item.id===editingTask.id){
            return newTask
          }else{
            return item
          }
        })
      })

    }else{
      setTaskData(prev=>[...prev,newTask])
    }
    setEditingTask(null)
    setIsChange(null)
  }

  function handleClose(){
    setIsChange(null)
    setEditingTask(null)
  }
  function removeTask(id){

    setTaskData(prev=>{
      return prev.filter(item=>{
        if(item.id===id){
          return false
        }
        return true
      })
    })
  }

  function moveTask(id,newStatus){
    setTaskData(prev=>{
      return prev.map(item=>{
        if(item.id===id){
          return {...item, status:newStatus}
        }else{
          return item
        }
      })
    })
  }

  return (
    <>
      <Navbar addTask={addTask} />
      <Board taskData={taskData} editTask={editTask} removeTask={removeTask} moveTask={moveTask}/>
      { isChange && <TaskForm handleInfo={handleInfo} handleClose={handleClose} editingTask={editingTask} />}
    </>
  )
}

export default App
