import Navbar from './Navbar'
import Board from './Board'
import React from "react"
import TaskForm from "./TaskForm"
import apiClient from '../api/axios'
import { toast } from 'react-toastify'
import { DragDropContext } from '@hello-pangea/dnd'


export default function TaskBoard({handleLogout}){
    const [taskData, setTaskData]=React.useState([])
    const [isLoadingTasks, setIsLoadingTasks] = React.useState(true)
      const [formMode, setFormMode]=React.useState(null)
      const [editingTask, setEditingTask]=React.useState(null)
      const [searchTerm, setSearchTerm]=React.useState("")
      const [labels,setLabels]=React.useState([])
      const enrichedTaskData= taskData.map(task=>{
        const matchingLabel=labels?.find(l=>l.type===task.label)
        return {...task,labelName:matchingLabel? matchingLabel.name:task.label}
      })
      const shownData=getShownData()
      
    
      
      function addTask(){
        setFormMode("add")
      }
      function prepareEditingTask(id){
        setEditingTask(taskData.find(item=>item.id===id))
      }
      function editTask(id){
         prepareEditingTask(id)
        setFormMode("edit")
      }
      function onView(id){
         prepareEditingTask(id)
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

      function removeTaskFromState(id){
          setTaskData(prev=>{
            const removedTask=prev.find(item=>item.id===id)
            if(!removedTask) return prev
            const status=removedTask.status;
            const columnTasks=prev.filter(item=> (item.status===status && item.id!==id)).sort((a,b)=>a.index-b.index)
            const updatedColumnTasks=columnTasks.map((item,idx)=>({
                ...item,
                index:idx
            }))
            const otherTasks=prev.filter(item=>item.status!==status)
            const newTaskData=[...otherTasks,...updatedColumnTasks]
            return newTaskData
        
        })
      }

      
      
      function removeTask(id){
        const oldTaskData=taskData
        removeTaskFromState(id)
        apiClient.delete(`/api/tasks/${id}`)
        .then(()=>{
          toast.info("Task deleted")
      })
        .catch(error=>{
            setTaskData(oldTaskData)
            
            const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
            toast.error(errorMsg)
        }
        )
      }

      function moveTaskInState(id,newStatus){
        setTaskData(prev=>{
          const task=prev.find(item=>item.id===id)
          if(!task) return prev
          const oldStatus=task.status
          if(oldStatus===newStatus) return prev
          const newTask={...task,status:newStatus}
          const columnTasks=prev.filter(item=>(item.status===oldStatus && item.id!==id)).sort((a,b)=>a.index-b.index)
          const newColumnTasks=columnTasks.map((item,idx)=>({
            ...item,
            index:idx
          }))
          const anotherColumnTasks=prev.filter(item=>item.status===newStatus).sort((a,b)=>a.index-b.index)
          const newAnotherColumnTasks=[...anotherColumnTasks,newTask].map((item,idx)=>({
            ...item,
            index:idx
          }))
          const otherTasks=prev.filter(item=>item.status!==oldStatus && item.status!==newStatus)
          return [...newColumnTasks,...newAnotherColumnTasks,...otherTasks]

        })
      }

    
      function moveTask(id,newStatus){
        const oldTaskData=taskData
        moveTaskInState(id,newStatus)
        const statusData={status:newStatus}
        apiClient.patch(`/api/tasks/${id}/status`,statusData)
        .then(()=>{
          toast.success("Changes saved successfully!")
      })
        .catch(error=>{
          setTaskData(oldTaskData)
          
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

       function handleMoveInSameColumn(draggableId,sourceDroppableId,destinationIndex){
        setTaskData(prev=>{
          const task=prev.find(item=>String(item.id)===draggableId)
         
          const columnTasks=prev.filter(item=>item.status===sourceDroppableId).sort((a,b)=>a.index-b.index)
          const taskIndex = columnTasks.findIndex(item => String(item.id) === draggableId)
          columnTasks.splice(taskIndex,1)
          columnTasks.splice(destinationIndex,0,task)

          const newColumnTasks=columnTasks.map((item,idx)=>({
            ...item,
            index:idx
          }))
          const otherTasks=prev.filter(item=>item.status!==sourceDroppableId)
          return [...otherTasks,...newColumnTasks]
        })
      }


      function handleMoveInDifferentColumn(draggableId,sourceDroppableId,destinationIndex,destinationDroppableId){
        setTaskData(prev=>{
          const task=prev.find(item=>String(item.id)===draggableId)
          const newTask={...task,status:destinationDroppableId}
          const sourceColumnTasks=prev.filter(item=>item.status===sourceDroppableId).sort((a,b)=>a.index-b.index)
          const currentIndex = sourceColumnTasks.findIndex(item => String(item.id) === draggableId)

         sourceColumnTasks.splice(currentIndex, 1)
        
          const reindexedSourceTasks=sourceColumnTasks.map((item,idx)=>({
            ...item,
            index:idx
          }))
          const destinationColumnTasks=prev.filter(item=>item.status===destinationDroppableId).sort((a,b)=>a.index-b.index)
          destinationColumnTasks.splice(destinationIndex,0,newTask)
          const reindexedDestinationTasks=destinationColumnTasks.map((item,idx)=>({
            ...item,
            index:idx
          }))
          const otherTasks=prev.filter(item=>item.status!==destinationDroppableId && item.status!==sourceDroppableId)
          


          
          return [...reindexedSourceTasks,...reindexedDestinationTasks,...otherTasks]

        })
      }

      function onDragEnd(result){
        if(searchTerm) return
        const {draggableId,source,destination}=result
        let moveData
        if(!destination) return;
        if(source.droppableId===destination.droppableId && source.index===destination.index){
          return;
        }
        const oldTaskData=taskData
        if(source.droppableId===destination.droppableId){
          handleMoveInSameColumn(draggableId,source.droppableId,destination.index)
          moveData={index:destination.index}

        }else{
          handleMoveInDifferentColumn(draggableId,source.droppableId,destination.index,destination.droppableId)
          moveData={index:destination.index, status:destination.droppableId}
        }
        apiClient.patch(`/api/tasks/${draggableId}/move`,moveData)
        .then(()=>{
          toast.success("Changes saved successfully!")
      })
        .catch(error=>{
          setTaskData(oldTaskData)
          
          const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
          toast.error(errorMsg)
        })


      }
    
      

    
      
    
    React.useEffect(() => {
      apiClient.get("/api/tasks")
        .then(response => {
            setTaskData(response.data)
        })
        .catch(error => {
            
            const errorMsg =
                error.response?.data?.message ||
                error.message ||
                "Request failed. Please try again later."

            toast.error(errorMsg)
        })
        .finally(() => {
            setIsLoadingTasks(false)
        })
      }, [])
    
      React.useEffect(()=>{
          apiClient.get("/api/labels")
          .then(response=>{
            setLabels(response.data)
          })
          .catch(error=>{
              
              const errorMsg=error.response?.data?.message || error.message||"Request failed. Please try again later."
              toast.error(errorMsg)
            })
      },[])
    
      
    
    
    
    
    
      return (
            <DragDropContext onDragEnd={onDragEnd}>
              <>
                <Navbar addTask={addTask} handleSearch={handleSearch} hasMatchingTask={!searchTerm || shownData.length!==0} handleLogout={handleLogout}/>
                {isLoadingTasks
                ? <div className="loading-message" role="status" aria-live="polite">Loading tasks...</div>
                : <Board
                    taskData={shownData}
                    editTask={editTask}
                    removeTask={removeTask}
                    moveTask={moveTask}
                    onView={onView}
                    isSearching={Boolean(searchTerm)}
                  />
}
                { formMode && <TaskForm key={editingTask?.id || "new"} handleInfo={handleInfo} handleClose={handleClose} editingTask={editingTask}  formMode={formMode} labels={labels}/>}
                
              </>
            </DragDropContext>
         
 
        
      )
}
    
