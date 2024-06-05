import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";

import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";

function Tasks({ tasks, deleteItem, onEdit, setIsOpen }) {
  return (
    <>
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
    </>
  );
}

export default Tasks;
