import './App.css'
import Navbar from './components/Navbar'
import Board from './components/Board'
import React from "react"
import TaskForm from "./components/TaskForm"

function App() {
  const [taskData, setTaskData]=React.useState(()=>{
     try{
      return JSON.parse(localStorage.getItem("taskData"))||[]
      
    } catch(error){
      console.log("Failed to parse taskData from localStorage, resetting to empty array.",error)
      return []
    } 
    
  })
   
  const [formMode, setFormMode]=React.useState(null)
  const [editingTask, setEditingTask]=React.useState(null)
  const [searchTerm, setSearchTerm]=React.useState("")
  const shownData=getShownData()
  

  
  function addTask(){
    setFormMode("add")
  }
  function prepareTaskFrom(id){
    setEditingTask(taskData.find(item=>item.id===id))
  }
  function editTask(id){
    prepareTaskFrom(id)
    setFormMode("edit")
  }
  function onView(id){
    prepareTaskFrom(id)
    setFormMode("view")
  }

  function handleInfo(formData){
    const newData=  Object.fromEntries(formData.entries())
    const newTask={...newData, status:editingTask?editingTask.status:"to do", id:editingTask? editingTask.id:crypto.randomUUID()}
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
    setFormMode(null)
  }

  function handleClose(){
    setFormMode(null)
    setEditingTask(null)
  }
  
  function removeTask(id){

    setTaskData(prev=>{
      return prev.filter(item=>item.id!==id)
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
  function handleSearch(event){
    setSearchTerm(event.target.value)
  }
  function getShownData(){
      if(!searchTerm){
        return taskData
      }else{
        return taskData.filter(item=>item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        
      }
  }
  React.useEffect(()=>{
    localStorage.setItem("taskData",JSON.stringify(taskData))
  },[taskData])


  return (
    <>
      <Navbar addTask={addTask} handleSearch={handleSearch} hasMatchingTask={!searchTerm || shownData.length!==0}/>
      <Board taskData={shownData} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView} />
      { formMode && <TaskForm key={editingTask?.id || "new"} handleInfo={handleInfo} handleClose={handleClose} editingTask={editingTask}  formMode={formMode}/>}
    </>
  )
}

export default App
