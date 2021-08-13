import React, { useState, useEffect } from 'react';
import './Login.css'
import { useHistory } from "react-router"
import { connect } from "react-redux"
import axios from "axios"

function Login(props) {
    const history = useHistory()
    const [Cred, setCred] = useState([]);

    useEffect(() => {
        if (Object.keys(props.userValue).length) history.push("/home")
    })

    const HandleSubmit = async (e) => {
        e.preventDefault()

        if (!Cred.mobile.length || Cred.mobile.length < 10 || Cred.mobile.length > 10) {
            alert("Mobile number should contain 10 characters")
            return
        }

        const res = await axios.post("/auth/login", { username: Cred.mobile, password: Cred.password })
        if (!res.data.success) {
            alert("Username or password is incorrect.")
            return
        }

        const user = res.data.user
        delete user["hash"]
        delete user["salt"]
        props.dispatch({ type: 'user', value: user })
        history.push("/home")
    }

    const handleChange = (e) => setCred({ ...Cred, [e.target.name]: e.target.value });

    return (
        <div align="left">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Login</h5>
                                <form className="form-signin" autoComplete="nope" onSubmit={HandleSubmit}>
                                    <div className="form-label-group">
                                        <input type="phone" name="mobile" id="inputtel" className="form-control" onChange={handleChange}
                                            placeholder="tel" required />
                                        <label htmlFor="inputtel">Mobile number</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" name="password" id="inputPassword" className="form-control" onChange={handleChange}
                                            placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>

                                    <br /> <br />
                                    <button style={{ background: "#93329E", color: "white" }} className="btn btn-lg text-uppercase w-100" type="submit">
                                        Login
                                    </button>
                                </form>
                                <div style={{ marginTop: "30px" }} align="center">
                                    <p>New User? <a href="/auth/signup">Sign-up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userValue: state.userValue
})

export default connect(mapStateToProps)(Login)
