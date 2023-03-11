import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Spinner from 'react-bootstrap/Spinner';
import Fectdata from './Pratise';
import Fetchapi from './Fetchapi';
// import Pratise from "./Pratise";
import storage from './fbase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { async } from '@firebase/util';



function Signup() {

  const redirect = useNavigate();
  const [image, setImage] = useState('');

  const [formvalue, setFormvalue] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    tImage: ""
  })

  const onchangeHandel = (e) => {

    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    console.log(formvalue);
  }


  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var phone = /^[0-9]{10}$/;

  var nametest = /^[a-zA-Z ]{2,30}$/;


  const onsubmitHandel = (e) => {
    e.preventDefault();
    if (formvalue.name == "") {
      document.getElementById("nameerr").innerHTML = "Please insert first name *"
    }
    else if (!nametest.test(formvalue.name)) {
      document.getElementById("nameerr").innerHTML = "Please enter valid first name *"
    }
    else {
      document.getElementById("nameerr").innerHTML = " "
    }
    if (formvalue.email == "") {
      document.getElementById("emailerr").innerHTML = "Please insert email *"
    }
    else if (!emailPattern.test(formvalue.email)) {
      document.getElementById("emailerr").innerHTML = "Please insert valid email *"
    }
    else {
      document.getElementById("emailerr").innerHTML = " "
    }
    if (formvalue.password == "") {
      document.getElementById("passerr").innerHTML = "Please insert password *"
    }
    else if (formvalue.password.length < 8) {
      document.getElementById("passerr").innerHTML = "Please enter 8 digit password *"
    }
    else {
      document.getElementById("passerr").innerHTML = " "
    }
    if (formvalue.mobile == "") {
      document.getElementById("pnoerr").innerHTML = "Please insert mobile *"
    }
    else if (!phone.test(formvalue.mobile)) {
      document.getElementById("pnoerr").innerHTML = "Please Enter Valid Number *"
    }
    else if (image == null) {
      document.getElementById("imgerr").innerHTML = "Please Select image *"
    }
    else {
      document.getElementById("pnoerr").innerHTML = " "
    
      handleUpload()
    }
  }


  function callSignUpApi() {

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1IE2hx4zICYYCbcARmxZ4J6SGMCi4q3Q', {
      method: 'POST',
      body: JSON.stringify(formvalue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        submitData();
        // if (formvalue.name !== "" && formvalue.email !== "" && formvalue.password !== "" && formvalue.mobile !== "") {
        //   handleUpload();
        // }
      });

  }

   function handleUpload() {
    console.log("Inside Upload")
    if (!image) {
      alert("Please choose a file first!")
      return;
    }

    const storageRef = ref(storage, `/files/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",null,
      (err) => console.log("INSIDE ERROR"+err.metadata.name),
      () => {
        // download url
     getDownloadURL(uploadTask.snapshot.ref)
                  .then((URL) => {
                    console.log(">>>>>>" + URL);
                    formvalue.tImage = URL;
                    setFormvalue({ ...formvalue });
                    console.log("my form value"+JSON.stringify(formvalue));
                    callSignUpApi()
                  });
     
        // setFormvalue({ ...formvalue, image: url });

      }
    
    );
  }

  function submitData() {
    console.log("data" + JSON.stringify(formvalue))
    fetch('https://fir-project-30e96-default-rtdb.firebaseio.com/user.json', {
      method: 'POST',
      body: JSON.stringify(formvalue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        swal({
          title: "Success!",
          text: "You Registered Success!",
          icon: "success",
        });
        setFormvalue({ ...formvalue, name: "", email: "", password: "", mobile: "", image: "" });
        redirect('/login')
      });
  }


  return (
    <>
      {/* contact section start */}
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="contact_text">SIGNUP</h1>
              <div className="mail_sectin">
                <input type="text" className="email-bt" placeholder="Name" name="name" value={formvalue.name} onChange={onchangeHandel} autoComplete='off' />
                <p id='nameerr' style={{ color: "red" }}></p>
                <input type="email" className="email-bt" placeholder="Email" name="email" value={formvalue.email} onChange={onchangeHandel} autoComplete='off' />
                <p id='emailerr' style={{ color: "red" }}></p>
                <input type="password" className="email-bt" placeholder="Password" name="password" value={formvalue.password} onChange={onchangeHandel} autoComplete='off' />
                <p id='passerr' style={{ color: "red" }}></p>
                <input type="number" className="email-bt" placeholder="ContactNumber" name="mobile" value={formvalue.mobile} onChange={onchangeHandel} autoComplete='off' />
                <p id='pnoerr' style={{ color: "red" }}></p>


                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                <p id='imgerr' style={{ color: "red" }}></p>


                <div className="send_bt" type="submit" onClick={onsubmitHandel}><a href="#" className='text-dark'>Signup</a></div>
                {/* <button onClick={onsubmitHandel} className="send_bt" type="submit" style={{ backgroundColor: "red" }}>Signup</button> */}
                <NavLink to="/login" style={{ color: "white" }}>If You are rgistered then Login Here</NavLink>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image_9"><img src="images/img-9.png" /></div>
            </div>
          </div>
        </div>
        <Fetchapi />
      </div>
      {/* contact section end */}
    </>
  )
}

export default Signup


// {/* <table className="table table-dark table-striped">
// <tr>
//   {/* <th scope="col">#</th> */}
//   <th scope="col">First</th>
//   <th scope="col">Email</th>
//   <th scope="col">Contact no</th>
// </tr>
// </table> */}// try {
    //   const response = fetch('https://fir-project-30e96-default-rtdb.firebaseio.com/user.json');
    //   const data = response.json();
    //   console.log(data);
    //   setTimeout(() => {
    //     this.setState({ data: data, isLoaded: true });
    //   }, 3000)

    // } catch (err) {
    //   console.log(err);
    // }

