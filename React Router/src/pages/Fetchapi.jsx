import { Delete } from '@mui/icons-material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';

function Fetchapi() {

    // Get Data
    // Fetch api method
    useEffect(() => {
        getdata();
    }, []);

    const [alldata, setalldata] = useState([]);
    function getdata() {
        fetch('https://fir-project-30e96-default-rtdb.firebaseio.com/user.json')
            .then((response) => response.json())
            .then((json) => {
                setalldata(json);
                getdata();
            });
    }
    // Axios method
    // const [students, setStudents] = useState([]);

    // useEffect(() => {
    //     getAllData();
    // })

    // async function getAllData() {
    //     try {
    //         const students = await axios.get("https://fir-project-30e96-default-rtdb.firebaseio.com/user.json")
    //         // console.log(students.data)
    //         setStudents(students.data);
    //     } catch (err) {
    //         console.log("Something is Wrong");
    //     }
    // }

    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Edit Data
    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        password: "",
        mobile: ""
    })

    const [userid, setUserid] = useState("");

    const editHandel = (id) => {
        setUserid(id);
        // fetch(`https://miralreact-default-rtdb.firebaseio.com/users/${id}.json`)
        fetch(`https://fir-project-30e96-default-rtdb.firebaseio.com/user/${id}.json`)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                setFormvalue(json);
            });
        handleShow();
    }

    // Update data
    const onchangeHandel = (e) => {

        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
        console.log(formvalue);
    }

    const updateHandel = (e) => {
        e.preventDefault();
        fetch(`https://fir-project-30e96-default-rtdb.firebaseio.com/user/${userid}.json`, {
            method: 'PUT',
            body: JSON.stringify(formvalue),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                swal({
                    title: "Success!",
                    text: "You Update Success!",
                    icon: "success",
                });
                setFormvalue({ ...formvalue, name: "", email: "", password: "", mobile: "" });
                getdata();
            });
        handleClose();
    }

    // Delete Data
    function deleteHandle( id) {
        fetch(`https://fir-project-30e96-default-rtdb.firebaseio.com/user/${id}.json`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => {

            swal({
                title: "Success!",
                text: "You Delete Success!",
                icon: "success",
            });
            getdata();
        })
    }
    return (
        <>
        <div class="table-responsive">
            <table className="table table-dark table-hover">
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">First</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Contact no</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Image</th>
                </tr>

                {Object.keys(alldata).map((item, i) => {
                    return (
                        <tr key={item}>
                            <td>{i + 1}</td>
                            <td>{alldata[item].name}</td>
                            <td>{alldata[item].email}</td>
                            <td>{alldata[item].password}</td>
                            <td>{alldata[item].mobile}</td>
                            <td><button className='btn btn-primary' onClick={() => editHandel(item)}>Edit</button></td>
                            <td><button className='btn btn-danger' onClick={() => deleteHandle(item)}>Delete</button></td>
                            <td><img src={alldata[item].tImage} alt="" width={100} height={100}/></td>
                        </tr>
                    )
                })}
            </table>
        </div>

            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row g-0">
                            <div className="col-lg-12">
                                <div className="bg-primary h-100 p-5">
                                    <form>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <input type="text" name='name' value={formvalue.name} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your Name" style={{ height: 55 }} />
                                            </div>
                                            <div className="col-12">
                                                <input type="email" name='email' value={formvalue.email} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your Email" style={{ height: 55 }} />
                                            </div>
                                            <div className="col-12">
                                                <input type="password" name='password' value={formvalue.password} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your Password" style={{ height: 55 }} />
                                            </div>
                                            <div className="col-12">
                                                <input type="number" name='mobile' value={formvalue.mobile} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your mobile" style={{ height: 55 }} />
                                            </div>

                                            <div className="col-12">
                                                <button onClick={updateHandel} className="btn btn-secondary w-100 py-3" type="submit">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}

export default Fetchapi