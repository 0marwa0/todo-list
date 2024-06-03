import { useState, useEffect } from "react";
import "./App.css";
import ItemUi from "./Item";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
import { v4 as uuidv4 } from "uuid";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  function addItem() {
    let item = { task: taskInput, id: uuidv4() };
    setTasks([...tasks, item]);
  }
  function onEdit(item) {
    setSelectedItem(item.task);
    setSelectedItemId(item.id);
  }

  function getTaskName(e) {
    setTaskInput(e.target.value);
  }
  function deleteItem(taskId) {
    let filterdTasks = tasks.filter((item) => item.id != taskId);
    setTasks(filterdTasks);
  }
  function save() {
    // selectedItmeId
    // selectedItem
    let updatedList = tasks.map((item) =>
      item.id === selectedItemId ? { ...item, task: selectedItem } : item
    );

    setTasks(updatedList);
    setIsOpen(false);
  }

  useEffect(() => {
    console.log("Component just starts!!!");
  }, [tasks]);

  return (
    <>
      <h1 className="mt-4 mx-4 text-center"> Todo App</h1>
      <div className="mt-4 mx-4 d-flex gap-2">
        <input type="text" className="w-100" onChange={(e) => getTaskName(e)} />
        <button className="btn btn-primary" onClick={addItem}>
          +
        </button>
      </div>
      {console.log(tasks)}
      {tasks.length == 0 ? (
        <div className="mx-4 my-4 ">Empty todo list!!</div>
      ) : (
        <ListGroup className="mt-4 mx-4" as="ul">
          {tasks.map((item, i) => (
            <ListGroup.Item
              key={item.id}
              as="li"
              className={`${
                i == 0 ? "active" : ""
              } d-flex justify-content-between`}
            >
              {item.task}
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    onEdit(item);
                    setIsOpen(true);
                  }}
                >
                  <FiEdit />
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header>Eidt item</Modal.Header>
        <Modal.Body>
          <input
            type=" text"
            onChange={(e) => {
              setSelectedItem(e.target.value);
            }}
            className="w-100"
            value={selectedItem}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsOpen(false)} className="btn btn-danger">
            Close
          </button>
          <Button onClick={save}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
