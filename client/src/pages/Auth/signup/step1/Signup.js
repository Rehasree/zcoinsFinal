import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from "react-redux"
import './signup.css'
import axios from "axios"
import firebase from "../../../../firebase/firebase"

function Signup(props) {
    const history = useHistory();
    const [user, setUser] = useState([]);

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
            },
            "defaultCountry": 'IN'
        })
    }

    const onSignInSubmit = () => {
        configureCaptcha()

        const phoneNumber = `+91${user.mobile}`
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent.")
                history.push("/auth/otp")
            }).catch((error) => {
                console.log("Failed to send SMS.")
                alert("Failed to send SMS.")
            });
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        if (!user.mobile.length || user.mobile.length < 10 || user.mobile.length > 10) {
            alert("Mobile number should contain 10 characters")
            return
        }

        if (user.password !== user.confirmPassword) {
            alert("Passwords are not matched.")
            return
        }

        if (!user.Birthdate) {
            alert("Enter your birthday.")
            return
        }

        axios.post("/auth/register", user)
            .then(res => {
                const user = res.data.newUser
                delete user["hash"]
                delete user["salt"]
                props.dispatch({ type: 'user', value: user })
                console.log('submitted')
                // onSignInSubmit()
                history.push("/auth/otp")
            })
            .catch(err => {
                alert("Email/Phone Number already exists")
                return
            })
    }

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user)
    if (user.Birthdate) {
        var bday = user.Birthdate;
        var year = bday.substring(0, 4);
        user.BirthYear = year;
        var month = bday.substring(5, 7);
        user.BirthMonth = month;
        var birthDay = bday.substring(8, 10);
        user.birthDay = birthDay;
    }
    return (
        <div align="left">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card-signin my-5" style={{ width: "600px" }}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign Up</h5>
                                <form className="form-signin" autoComplete="nope" onSubmit={HandleSubmit}>
                                    <div id="sign-in-button"></div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-floating mb-3">
                                                <input type="text" name="fname" id="input" className="form-control" onChange={handleChange}
                                                    placeholder="text address" required autoFocus />
                                                <label htmlFor="input">First name</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating mb-3">
                                                <input type="text" name="mname" id="mname" className="form-control" onChange={handleChange}
                                                    placeholder="text address" autoFocus />
                                                <label htmlFor="mname">Middle name</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating mb-3">
                                                <input type="text" name="lname" id="inputtext" className="form-control" onChange={handleChange}
                                                    placeholder="text address" required autoFocus />
                                                <label htmlFor="inputtext">Last name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="date" name="Birthdate" id="inputDAY" className="form-control" onChange={handleChange}
                                            placeholder="DAY" required />
                                        <label htmlFor="inputDAY">Enter your Date of Birth</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="phone" name="mobile" id="inputtel" className="form-control" onChange={handleChange}
                                            placeholder="tel" required />
                                        <label htmlFor="inputtel">Mobile number</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" name="PanCardNo" id="inputPAN" className="form-control" onChange={handleChange}
                                            placeholder="PAN" required />
                                        <label htmlFor="inputPAN">Enter Your PAN Card Number for KYC</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" name="email" id="email" className="form-control" onChange={handleChange}
                                            placeholder="email" required />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="password" id="inputPassword" className="form-control" onChange={handleChange}
                                            placeholder="Password" required />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" name="confirmPassword" id="inputPassword1" className="form-control" onChange={handleChange}
                                            placeholder="Password" required />
                                        <label htmlFor="inputPassword1">Confirm Password</label>
                                    </div>
                                    <br /><br />
                                    <button style={{ background: "#440A67", color: "white" }} className="btn btn-lg text-uppercase w-100" type="submit">
                                        Next
                                    </button>
                                </form>
                                <div style={{ marginTop: "30px" }} align="center">
                                    <p>Already signed up <a href="/auth/login">Sign-in</a></p>
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

export default connect(mapStateToProps)(Signup)
