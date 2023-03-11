import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {

  const redirect=useNavigate();
  const [formvalue, setFormvalue] = useState({

    email: "",
    password: "",
    returnSecureToken: true
  })

  const onchangeHandel = (e) => {

    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    console.log(formvalue);
  }



  const onLogin = (e) => {
    e.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1IE2hx4zICYYCbcARmxZ4J6SGMCi4q3Q', {
      method: 'POST',
      body: JSON.stringify(formvalue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if(formvalue.email !== json.email){
          // alert("errrr");
          swal({
            title: "error!",
            text: "You Login Failed due wrong email or password!",
            icon: "error",
          });
        }
        else if (json.registered == true) {
          localStorage.setItem('email',json.email);
          swal({
            title: "Success!",
            text: "You Login Success!",
            icon: "success",
          });
          return redirect('/index');
        }
        else {
          swal({
            title: "error!",
            text: "You Login Failed due wrong email or password!",
            icon: "error",
          });
          // return redirect('/login');
        }
      });

  }


  return (
    <>
      {/* contact section start */}
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="contact_text">LOGIN FORM</h1>
              <div className="mail_sectin">
                {/* <input type="text" className="email-bt" placeholder="Name" name="Name" /> */}
                <input type="email" value={formvalue.email} onChange={onchangeHandel} className="email-bt" placeholder="Email" name="email" autoComplete='off' />
                <input type="password" value={formvalue.password} onChange={onchangeHandel} className="email-bt" placeholder="Password" name="password"  autoComplete='off' />
                <div className="send_bt" onClick={onLogin} ><a href="#" className='text-dark'>LOGIN</a></div>
                <NavLink to="/signup">If You are not rgister--Register Here</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact section end */}

    </>
  )
}

export default Login