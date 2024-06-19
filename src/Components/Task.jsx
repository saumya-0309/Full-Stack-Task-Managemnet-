// import axios from "axios";
// import React, { useEffect, useState } from "react";



// const Task = () => {
//    const[Task,setTask] = useState([]);

//    useEffect(() =>{
//    const fetchData = async () => {
//     setTask([]);
//     try{
//       const{data : response} = await axios.get(
//         `${import.meta.env.VITE_APP_API_PATH}/get_task_list`
//       );
//       console.log(response);
//       setTask(response.Result);
//     }catch(error){}
//    };
  
//     fetchData();
//    },[]);
   
//   return (
  
//     <div className="px-5 mt-8 m-4 ">
//     <div className="d-flex justify-content-center">
//       <h3 className="text-primary">TASK PROGRESS </h3>
//     </div>

//     {/* TAsk */}
//    <div className="grid gap-1 column-gap-3">
//       <div className="p-2 g-col-6   mt-3 ">
//         <div className="px-3 pt-2 pb-3 border border-primary-subtle shadow-lg ">
//           <div className="text-center pb-1">
//           <h3 className="text-primary-emphasis" >TASK</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-between draggable">
//             <table className="table">
//                <thead>
//                 <tr>
//                   <th>Task Name:</th>
//                 </tr>
//                </thead>
//                <tbody>
//                 {Task.map((e, index) =>(
//                   <tr key={index}>
//                     <td>{e.name}</td>
//                   </tr>
//                 ))}
//                </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* //  TASk In -Working */}
//       <div className="p-2 g-col-6   mt-3">
//         <div className="px-3 pt-2 pb-3 border border-warning-subtle shadow-lg ">
//           <div className="text-center pb-1">
//           <h3 className="text-warning" >Task In-Working</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-between">
//           <table className="table">
//                <thead>
//                 <tr>
//                   <th>Task Name:</th>
//                 </tr>
//                </thead>
//                <tbody>
//                 {Task.map((e, index) =>(
//                   <tr key={index}>
//                     <td>{e.name}</td>
//                   </tr>
//                 ))}
//                </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
      
//       {/* TAsk Testing */}
//       <div className="p-2 g-col-6  mt-3">
//         <div className="px-3 pt-2 pb-3 border border-danger-subtle shadow-lg ">
//           <div className="text-center pb-1">
//               <h3 className="text-danger-emphasis" >Task In-Testing</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-between">
//           <table className="table">
//                <thead>
//                 <tr>
//                   <th>Task Name:</th>
//                 </tr>
//                </thead>
//                <tbody>
//                 {Task.map((e, index) =>(
//                   <tr key={index}>
//                     <td>{e.name}</td>
//                   </tr>
//                 ))}
//                </tbody>
//             </table>
//           </div>
//         </div>
//       </div>


//       {/*    
//     Task completed successfully */}

//       <div className="p-2 g-col-6  mt-3">
//         <div className="px-3 pt-2 pb-3 border border-success shadow-lg ">
//           <div className="text-center pb-1">
//             <h3 className="text-success" >Task Completed</h3>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-between">
//           <table className="table">
//                <thead>
//                 <tr>
//                   <th>Task Name:</th>
//                 </tr>
//                </thead>
//                <tbody>
//                 {Task.map((e, index) =>(
//                   <tr key={index}>
//                     <td>{e.name}</td>
//                   </tr>
//                 ))}
//                </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//   </div>
//     </div>
//   );
// };

// export default Task;





import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Task = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    testing: [],
    completed: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${import.meta.env.VITE_APP_API_PATH}/get_task_list`
        );
        console.log(response);
        setTasks((prev) => ({ ...prev, todo: response.Result }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceClone = Array.from(tasks[source.droppableId]);
    const destClone = Array.from(tasks[destination.droppableId]);
    const [movedTask] = sourceClone.splice(source.index, 1);

    destClone.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [source.droppableId]: sourceClone,
      [destination.droppableId]: destClone
    }));
  };

  const renderTasks = (tasksList) =>
    tasksList.map((task, index) => (
      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <td>{task.name}</td>
          </tr>
        )}
      </Draggable>
    ));

  return (
    <div className="px-5 mt-8 m-4">
      <div className="d-flex justify-content-center">
        <h3 className="text-primary">TASK PROGRESS</h3>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        {["todo", "inProgress", "testing", "completed"].map((column, index) => (
          <div key={index} className="grid gap-1 column-gap-3">
            <Droppable droppableId={column}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-2 g-col-6 mt-3"
                >
                  <div className="px-3 pt-2 pb-3 border border-primary-subtle shadow-lg">
                    <div className="text-center pb-1">
                      <h3 className="text-primary-emphasis">{column.toUpperCase().replace('_', ' ')}</h3>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between draggable">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Task Name:</th>
                          </tr>
                        </thead>
                        <tbody>{renderTasks(tasks[column])}</tbody>
                      </table>
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Task;
