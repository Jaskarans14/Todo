import Table from "./Components/Table.js";
import { useState, useEffect } from "react";

function Searchbar(props) {
  return (
    <div className="d-flex my-3">
      <input
        type="text"
        id="search-input"
        className="form-control"
        placeholder="Search with Title..."
        aria-label="Recipient's username with two button addons"
      />
      <button
        id="search-btn"
        className="btn btn-outline-secondary mx-2"
        type="button"
      >
        Search
      </button>
    </div>
  );
}

function AddBtn() {
  return (
    <div
      id="add-logo"
      className="add bg-secondary d-flex justify-content-center align-items-center"
      data-bs-toggle="modal"
      data-bs-target="#add-task"
    >
      <i className="uil uil-plus"></i>
    </div>
  );
}

function EditTaskModal(props) {
  return (
    <div
      className="modal fade"
      id="edit-task"
      tabIndex="-1"
      aria-labelledby="editModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModal">
              Edit Task
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="edit-title"
                defaultValue={
                  props.currentEditTask ? props.currentEditTask[0] : ""
                }
                onChange={(e) => {
                  props.updateTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="edit-description"
                defaultValue={
                  props.currentEditTask ? props.currentEditTask[1] : ""
                }
                onChange={(e) => {
                  props.updateDesc(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              id="save-btn"
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              onClick={() => props.updateTask()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddTaskModal(props) {
  return (
    <div
      className="modal fade"
      id="add-task"
      tabIndex="-1"
      aria-labelledby="addModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addModal">
              Create a new task
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={props.cancel}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="task-title" className="col-form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="task-title"
                value={props.title}
                onChange={(e) => {
                  props.setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="task-description" className="col-form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="task-description"
                value={props.desc}
                onChange={(e) => {
                  props.setDesc(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              id="cancel-btn"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={props.cancel}
            >
              Cancel
            </button>
            <button
              id="add-btn"
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              onClick={() => props.addTask()}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditTask, setCurrentEditTask] = useState("");

  // Add the task in the table and used in add button in AddTaskModal
  const addTask = () => {
    let newTask = [title, desc];
    let updatedTaskArr = [...taskArr];
    updatedTaskArr.push(newTask);
    setTaskArr(updatedTaskArr);
    localStorage.setItem("todoList", JSON.stringify(updatedTaskArr));
    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    let todoItems = JSON.parse(localStorage.getItem("todoList"));
    if (todoItems) {
      setTaskArr(todoItems);
    }
  }, []);

  // this function generally cancel to add the task make input fields empty
  const cancel = () => {
    setTitle("");
    setDesc("");
  };

  // delete the task from the table and from localstorage too.
  const deleteTask = (index) => {
    let copiedArr = [...taskArr];
    copiedArr.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(copiedArr));
    setTaskArr(copiedArr);
  };

  // this function get the index and element which user want to edit
  const editTask = (index, element) => {
    setCurrentEdit(index);
    setCurrentEditTask(element);
  };

  // when user change the value of title this function will return that value of the title accordingly
  const updateTitle = (value) => {
    setCurrentEditTask((oldTask) => {
      const updatedTaskTitle = [...oldTask];
      updatedTaskTitle[0] = value;
      return updatedTaskTitle;
    });
  };

  // when user change the value of description this function will return that value of the description accordingly
  const updateDesc = (value) => {
    setCurrentEditTask((oldTask) => {
      const updatedTaskDesc = [...oldTask];
      updatedTaskDesc[1] = value;
      return updatedTaskDesc;
    });
  };

  // this function update or we can say edit the title and description of the task
  const updateTask = () => {
    let newTaskArr = [...taskArr];
    newTaskArr[currentEdit] = currentEditTask;
    setTaskArr(newTaskArr);
    localStorage.setItem("todoList", JSON.stringify(newTaskArr));
    setCurrentEdit("");
  };

  // Creating table for the tasks and used in Table component
  const taskTable = () => {
    let taskDetails = taskArr.map((element, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{element[0]}</td>
          <td>{element[1]}</td>
          <td>
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#edit-task"
              onClick={() => {
                editTask(index, element);
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                deleteTask(index);
              }}
              type="button"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return taskDetails;
  };

  return (
    <>
      <div id="main-container" className="container">
        <h2 className="text-center mt-3 mb-5">TODO's LIST</h2>
        <Searchbar />
        <Table tasks={taskTable} />
        <AddBtn />
        <AddTaskModal
          title={title}
          desc={desc}
          setTitle={setTitle}
          setDesc={setDesc}
          addTask={addTask}
          cancel={cancel}
        />
        <EditTaskModal
          currentEdit={currentEdit}
          currentEditTask={currentEditTask}
          editTask={editTask}
          updateTitle={updateTitle}
          updateDesc={updateDesc}
          updateTask={updateTask}
        />
      </div>
    </>
  );
}

export default App;
