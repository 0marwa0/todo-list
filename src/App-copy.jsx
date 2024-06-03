import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaEdit } from "react-icons/fa"; // Import the edit icon

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskInput, setEditTaskInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  function addItem() {
    let item = { task: taskInput, id: uuidv4() };
    setTasks([...tasks, item]);
    setTaskInput("");
  }

  function getTaskName(e) {
    setTaskInput(e.target.value);
  }

  function deleteItem(taskId) {
    let filteredTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(filteredTasks);
  }

  function openEditModal(task) {
    setEditTaskInput(task.task);
    setCurrentTaskId(task.id);
    setShowModal(true);
  }

  function saveTask() {
    let updatedTasks = tasks.map((item) =>
      item.id === currentTaskId ? { ...item, task: editTaskInput } : item
    );
    setTasks(updatedTasks);
    setShowModal(false);
  }

  useEffect(() => {
    console.log("Component just starts!!!");
  }, [tasks]);

  return (
    <>
      <h1 className="mt-4 mx-4 text-center">Todo App</h1>
      <div className="mt-4 mx-4 d-flex gap-2">
        <input
          type="text"
          className="w-100"
          value={taskInput}
          onChange={(e) => getTaskName(e)}
        />
        <button className="btn btn-primary" onClick={addItem}>
          +
        </button>
      </div>
      {console.log(tasks)}
      {tasks.length === 0 ? (
        <div className="mx-4 my-4">Empty todo list!!</div>
      ) : (
        <ListGroup className="mt-4 mx-4" as="ul">
          {tasks.map((item, i) => (
            <ListGroup.Item
              key={item.id}
              as="li"
              className={`${
                i === 0 ? "active" : ""
              } d-flex justify-content-between align-items-center`}
            >
              {item.task}
              <div className="d-flex gap-2">
                <button
                  className="btn btn-light"
                  onClick={() => openEditModal(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  x
                </button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="w-100"
            value={editTaskInput}
            onChange={(e) => setEditTaskInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
