import React from 'react';
import Layout from '../components/Layouts/Layout'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
function Employeedata() {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newJoiningdate, setNewJoiningdate] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');


    const addEmp = (e) => {
        e.preventDefault();
        if (!newName || !newEmail || !newPhone || !newJoiningdate || !newStatus) {
            setErrorMessage("All fields must be filled out.");
            setTimeout(() => {
                setErrorMessage("");
            }, 1000);
            return;
        } else {
            const combinedData = `Name: ${newName},Email: ${newEmail}, Description: ${newPhone}, Joining Date: ${newJoiningdate}, Status: ${newStatus}`;
            console.log(combinedData);
            setSuccessMessage("Employee added successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }

        // axios.post('http://localhost:3001/addEmp', { task: newTask, status: newStatus, deadline: newDeadline, name: newName, startdate: newStartdate })
        //     .then(res => {
        //         console.log(res);
        //         window.location.reload();
        //     })
        //     .catch(err => console.log(err));
    }
    return (
        <Layout>
          
            <div className="container-fluid my-0 py-2">
                <div className="row">
                    <div className="col-sm-8">
                        <h4 className="text-center">Employee Details</h4>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sl.no</th>
                                        <th>Name</th>
                                        <th>Email_id</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>Vijay</td>
                                        <td>vijay@gmail.com</td>
                                        <td>965241800</td>
                                        <td>Active</td>
                                        <td>
                                            <button className="text-primary border-0">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button className="text-danger border-0" >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>

                                        </td>
                                    </tr>

                               </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h4 className='text-center'>Add Employee</h4>
                        <div className="card p-2">
                            <form className=" p-2">
                                <div className="mb-3">
                                    <label >Enter Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Name"
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label >Enter Email_id</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Email"
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Enter Phone no</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        max="10"
                                        min="7"
                                        placeholder="Phone number"
                                        onChange={(e) => setNewPhone(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Enter Joining date</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        placeholder="Enter Joining date"
                                        onChange={(e) => setNewJoiningdate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Status</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setNewStatus(e.target.value)} >
                                        <option selected>select option</option>
                                        <option value="0" className="text-danger">Inactive</option>
                                        <option value="1" className="text-primary">Active</option>
                                        <option value="2" className="text-success">Completed</option>

                                    </select>
                                </div>
                                <div className='text-center'>
                                    <p className='text-success'>{successMessage}</p>
                                    <p className='text-danger'>{errorMessage}</p>
                                </div>


                                <div className="text-center">
                                    <button onClick={addEmp} className="btn btn-success btn-sm">
                                        Add Employee
                                    </button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}
export default Employeedata