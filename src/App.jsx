import './App.css'
import Navbar from './components/Navbar'
import Board from './components/Board'
import React from "react"
import TaskForm from "./components/TaskForm"
import apiClient from './api/axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [taskData, setTaskData]=React.useState([])
  const [formMode, setFormMode]=React.useState(null)
  const [editingTask, setEditingTask]=React.useState(null)
  const [searchTerm, setSearchTerm]=React.useState("")
  const [label,setLabel]=React.useState([])
  const enrichedTaskData= taskData.map(task=>{
  const matchingLabel=label.find(l=>l.type===task.label)
    return {...task,labelName:matchingLabel? matchingLabel.name:task.label}
  })
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

  function updateTask(newTask){
    
      apiClient.put(`/api/tasks/${editingTask.id}`,newTask)
      .then(response=>{
        const task=response.data
        setTaskData(prev=>(
          prev.map(item=>
            item.id===task.id? task:item
          )
        ))
        toast.success("Changes saved successfully!")
        setEditingTask(null)
        setFormMode(null)
      })
      .catch(error=>{
          console.log("error: ",error)
          const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
          toast.error(errorMsg)
      }
      )
    }
  function createTask(newTask){
    apiClient.post("/api/tasks",newTask)
    .then(response=>{
      setTaskData(prev=>[...prev,response.data])
      toast.success("Task created successfully!")
      setEditingTask(null)
      setFormMode(null)
  })
    .catch(error=>{
        console.log("error: ",error)
        const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
        toast.error(errorMsg)
    }
    )
  }

  function handleInfo(newData){
    const newTask={...newData, status:editingTask?editingTask.status:"TODO"}
    if(editingTask){
      updateTask(newTask)
    }else{
      createTask(newTask)
    }
    
  }

  function handleClose(){
    setFormMode(null)
    setEditingTask(null)
  }
  
  function removeTask(id){
    apiClient.delete(`/api/tasks/${id}`)
    .then(response=>{
      setTaskData(prev=>prev.filter(item=>item.id!==id))
      toast.info("Task deleted")
  })
    .catch(error=>{
        console.log("error: ",error)
        const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
        toast.error(errorMsg)
    }
    )
  }

  function moveTask(id,newStatus){
    const statusData={status:newStatus}
    apiClient.patch(`/api/tasks/${id}/status`,statusData)
    .then(response=>{
      setTaskData(prev=>prev.map(item=>item.id===id?response.data:item))
      toast.success("Changes saved successfully!")
  })
    .catch(error=>{
      console.log("error: ",error)
      const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
      toast.error(errorMsg)
    })
    
  }
  function handleSearch(event){
    setSearchTerm(event.target.value)
  }
  function getShownData(){
      if(!searchTerm){
        return enrichedTaskData
      }else{
        return enrichedTaskData.filter(item=>item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        
      }
  }

  React.useEffect(()=>{
      apiClient.get("/api/tasks")
      .then(response=>{
        setTaskData(response.data)
      })
      .catch(error=>{
          console.log("error: ",error)
          const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
          toast.error(errorMsg)
        })
  },[])

  React.useEffect(()=>{
      apiClient.get("/api/labels")
      .then(response=>{
        setLabel(response.data)
      })
      .catch(error=>{
          console.log("error: ",error)
          const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
          toast.error(errorMsg)
        })
  },[])





  return (
    

    
    <>
      <Navbar addTask={addTask} handleSearch={handleSearch} hasMatchingTask={!searchTerm || shownData.length!==0}/>
      <Board taskData={shownData} editTask={editTask} removeTask={removeTask} moveTask={moveTask} onView={onView}/>
      { formMode && <TaskForm key={editingTask?.id || "new"} handleInfo={handleInfo} handleClose={handleClose} editingTask={editingTask}  formMode={formMode} label={label}/>}
      <ToastContainer position='top-right' autoClose={3000} />
    </>
    
  )
}

export default App
