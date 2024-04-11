import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layouts/Layout'
function Employeetask() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedStartdate, setEditedStartdate] = useState("");
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newName, setNewName] = useState("");
    const [newStartdate, setNewStartdate] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [newPhoto, setNewPhoto] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    const [editedPhoto, setEditedPhoto] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage] = useState(10); //change here page number how much you want

    // Fetch tasks from database 
    useEffect(() => {
        axios.get('http://localhost:3001/getTodoList')
            .then(result => {
                setTodoList(result.data)
            })
            .catch(err => console.log(err))
    }, [])



    // pagination function start
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = todoList.slice(indexOfFirstItem, indexOfLastItem);

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(todoList.length / itemsPerPage);
    const handleClick = (page) => {
        setCurrentPage(page);
    };
    const handlePrev = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
    const handleNext = () => {
        setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };
    const generatePageNumbers = () => {
        const currentPageIndex = currentPage - 1;
        const pages = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPageIndex < 2) {
                pages.push(1, 2, 3);
            } else if (currentPageIndex >= totalPages - 2) {
                pages.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pages;
    };
    // pagination function end



    const profileImg = {
        width: "40px",
        height: "40px",
        border: "1px solid black",
        borderRadius: "50%"
    }
    

// Function to toggle the editable state for a specific row 
const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
        setEditableId(id);
        setEditedStartdate(rowData.startdate);
        setEditedName(rowData.name);
        setEditedTask(rowData.task);
        setEditedStatus(rowData.status);
        setEditedDeadline(rowData.deadline);
        setEditedPhoto(rowData.Photo);
    } else {
        setEditableId(null);
        setEditedStartdate("");
        setEditedName("");
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
        setEditedPhoto("");
    }
};


// Function to add task to the database 
const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline || !newName || !newStartdate || !newPhoto) {
        setErrorMessage("All fields must be filled out.");
        setTimeout(() => {
            setErrorMessage("");
        }, 1000);
        return;
    }

    axios.post('http://localhost:3001/addTodoList', { task: newTask, status: newStatus, deadline: newDeadline, name: newName, startdate: newStartdate, photo: newPhoto })
        .then(res => {
            console.log(res);
            setTodoList(prevTodoList => [res.data, ...prevTodoList]);
            // setTodoList(prevTodoList => [...prevTodoList, res.data]);
            // window.location.reload();

            // Show success message for 1 second
            setSuccessMessage("Task added successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
            setNewName('');
            setNewTask('');
            setNewStartdate('');
            setNewStatus('');
            setNewDeadline('');
            setNewPhoto('');
        })
        .catch(err => console.log(err));
}

// Function to save edited data to the database 
const saveEditedTask = (id) => {
    const editedData = {
        task: editedTask,
        name: editedName,
        status: editedStatus,
        startdate: editedStartdate,
        deadline: editedDeadline,
        photo: editedPhoto,
    };

    // If the fields are empty 
    if (!editedTask || !editedStatus || !editedDeadline || !editedName || !editedStartdate || !editedPhoto) {
        setErrorMessage("All fields must be filled out.");
        setTimeout(() => {
            setErrorMessage("");
        }, 1000);
        return;
    }
    axios.post('http://localhost:3001/updateTodoList/' + id, editedData)
        .then(result => {
            console.log(result);
            setEditableId(null);
            setEditedName("");
            setEditedTask("");
            setEditedStatus("");
            setEditedStartdate("");
            setEditedDeadline("");
            setEditedPhoto("");
            window.location.reload();
            // Show success message
            setSuccessMessage("Task updated successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        })
        .catch(err => console.log(err));
}


// Delete task from database 
const deleteTask = (id) => {
    axios.delete('http://localhost:3001/deleteTodoList/' + id)
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err =>
            console.log(err)
        )
}
function formatDateForDisplay(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


return (
    <Layout>
        <div className="container-fluid my-0 py-2">
            <div className="row">
                <div className="col-md-8">
                    <h4 className="text-center">Employee Data</h4>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Sl.no</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Task</th>
                                    <th>Start date</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {Array.isArray(todoList) ? (
                                <tbody>
                                    {currentItems.map((data, index) => (
                                        <tr key={data._id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="text-center">
                                                {editableId === data._id ? (
                                                    <input
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg"
                                                        name="photo"
                                                        value={editedPhoto}
                                                        onChange={(e) => setEditedPhoto(e.target.files[0].name)}
                                                    />
                                                ) : (
                                                    <span>{data.photo && <img src={`./images/${data.photo}`} alt='' style={profileImg} />}</span>
                                                    //  <img src="./images/candy2.png" alt=""/>
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedName}
                                                        onChange={(e) => setEditedName(e.target.value)}
                                                    />
                                                ) : (
                                                    data.name
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedTask}
                                                        onChange={(e) => setEditedTask(e.target.value)}
                                                    />
                                                ) : (
                                                    data.task
                                                )}
                                            </td>
                                           
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control"
                                                        value={(editedStartdate || '').toString().substring(0, 16)}
                                                        onChange={(e) => setEditedStartdate(e.target.value)}
                                                    />
                                                ) : (
                                                    formatDateForDisplay(data.startdate)
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control"
                                                        value={(editedDeadline || '').toString().substring(0, 16)}
                                                        onChange={(e) => setEditedDeadline(e.target.value)}
                                                    />
                                                ) : (
                                                    formatDateForDisplay(data.deadline)
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <select
                                                        className="form-control"
                                                        value={editedStatus}
                                                        onChange={(e) => setEditedStatus(e.target.value)}>
                                                        <option value="0" style={{ color: '#dc3545' }}>Inactive</option>
                                                        <option value="1" style={{ color: '#007bff' }}>Active</option>
                                                        <option value="2" style={{ color: '#28a745' }}>Completed</option>
                                                    </select>
                                                ) : (
                                                    data.status === "0" ? <span className="text-danger">Inactive</span> :
                                                        data.status === "1" ? <span className="text-primary">Active</span> :
                                                            <span className="text-success">Completed</span>
                                                )}
                                            </td>
                                           
                                            <td>
                                                {editableId === data._id ? (
                                                    <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>
                                                        update
                                                    </button>
                                                ) : (
                                                    <button className="text-primary border-0" onClick={() => toggleEditable(data._id)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                )}
                                                <button className="text-danger border-0" onClick={() => deleteTask(data._id)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Loading products...</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                    <div>
                        {/* Pagination start */}
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handlePrev}>
                                        <FontAwesomeIcon icon={faAnglesLeft} />
                                    </button>
                                </li>
                                {generatePageNumbers().map((pageNumber, index) => (
                                    <li key={index} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handleClick(pageNumber)}>{pageNumber}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handleNext}>
                                        <FontAwesomeIcon icon={faAnglesRight} />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        {/* pagination end */}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Add Task</h4>
                    <form className="card p-4">
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Name"
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Task</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Task"
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Start date</label>
                            <input
                                className="form-control"
                                type="date"
                                placeholder="Enter Task"
                                onChange={(e) => setNewStartdate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <select
                                className="form-control"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}>
                                <option value="">select option</option>
                                <option value="0" className="text-danger">Inactive</option>
                                <option value="1" className="text-primary">Active</option>
                                <option value="2" className="text-success">Completed</option>

                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Deadline</label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Upload Photo</label>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="photo"
                                onChange={(e) => setNewPhoto(e.target.files[0].name)}
                            />
                        </div>
                        <div className='text-center'>
                            <p className='text-success'>{successMessage}</p>
                            <p className='text-danger'>{errorMessage}</p>
                        </div>

                        <div className="text-center">
                            <button onClick={addTask} className="btn btn-success btn-sm">
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
)
}
export default Employeetask;
