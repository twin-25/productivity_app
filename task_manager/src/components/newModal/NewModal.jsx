import React from "react";
import "./newmodal.scss";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../services/TaskApi";
import { useState } from "react";
import { useGetTagsQuery } from "../../services/TagApi";

const NewModal = ({ onClose, task }) => {
  const [formData, setFormData] = useState({
    name: task ? task.name : "",
    description: task ? task.description : "",
    category: task ? task.category : "Personal",
    due_date: task ? task.due_date : "",
    tags: task ? task.tags : [],
  });

  const [createTask, { isLoading: creating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { data: tagData } = useGetTagsQuery();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!task) {
        await createTask(formData).unwrap();
      } else {
        await updateTask({ pk: task.id, ...formData }).unwrap(); // ✅ pass as one object
      }
      onClose();
    } catch (err) {
      setError(err.data?.detail || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id).unwrap();
      onClose();
    } catch (err) {
      setError(err.data?.detail || "Delete Failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add new Task</h2>
        <div className="new">
          <div className="top">
            <p className="title">Task:</p>
            <input
              type="text"
              name="name"
              placeholder="Enter a task"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <br />
            <textarea
              placeholder="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="center">
            <ul>
              <li>
                <p>Category</p>
                <select
                  name="category"
                  id="list"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Others">Others</option>
                </select>
              </li>
              <li>
                <p>Due date</p>
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </li>
              <li>
                <p>Tags</p>
                <div className="tags">
                  <select
                    multiple
                    value={formData.tags}
                    className="native-multi-select"
                    onChange={(e) => {
                      const selected = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      );
                      setFormData({ ...formData, tags: selected });
                    }}
                    style={{
                      width: "100%",
                      height: "100px",
                      padding: "8px",

                      fontSize: "14px",
                    }}
                  >
                    {tagData?.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#352525ff",
                    }}
                  >
                    <strong>Selected: </strong>
                    {formData.tags.length > 0
                      ? tagData
                          ?.filter((tag) =>
                            formData.tags.includes(String(tag.id)),
                          )
                          .map((tag) => tag.name)
                          .join(", ")
                      : "None"}
                  </div>
                </div>
                <p className="note">
                  <strong>Note: </strong> You can select multiple tags by
                  holding Ctrl.want to add a new tag? Go to The sidebar.
                </p>
              </li>
            </ul>
          </div>
          <div className="bottom">
            <button className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="save" onClick={handleSubmit}>
              {creating || updating ? "Saving..." : "Save"}
            </button>
            {task && (
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewModal;
