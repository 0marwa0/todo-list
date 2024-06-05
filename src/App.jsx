import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import Tasks from "./Tasks";
import ItemModal from "./ItemModal";
import { Container } from "react-bootstrap";
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [ShowWarning, setShowWarning] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  function addItem() {
    if (taskInput) {
      setShowWarning(false);
      let item = { task: taskInput, id: uuidv4() };
      setTasks([...tasks, item]);
      setTaskInput("");
    } else {
      setShowWarning(true);
    }
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
      <div className="m-4 d-flex gap-2">
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
      <Container>
        {ShowWarning ? (
          <div class="alert alert-danger m-4" role="alert">
            Empty input!!
          </div>
        ) : null}
      </Container>

      <Tasks
        tasks={tasks}
        deleteItem={deleteItem}
        onEdit={onEdit}
        setIsOpen={setIsOpen}
      />

      <ItemModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        save={save}
      />
    </>
  );
}

export default App;
