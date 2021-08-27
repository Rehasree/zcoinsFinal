import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router';
import './otp.css'
import { connect } from "react-redux"
import axios from "axios"

function Otp(props) {
    const [otp, setotp] = useState(null);
    const history = useHistory();

    const phnNumber = props.userValue.username

    const handleChange = (otp) => setotp(otp);
    const handleSubmit = async () => {
        if (!otp || otp.length < 6) alert("OTP is invalid .Please try again")
        else if (otp !== "123456") alert("Enter valid OTP")
        else {
            try {
                const res = await axios.post("/auth/update-info", props.userValue)
                alert("Phone number verified successfully")
                if (res.status === 200) {
                    console.log(res.data)
                    props.dispatch({ type: 'user', value: {} })
                    history.push("/auth/login")
                }
            } catch (err) {
                console.log(err)
                alert("The Fusion api has timed out. Please try after 5 mins.")
            }
        }
        // else {
        //     window.confirmationResult.confirm(otp)
        //         .then(async (result) => {
        //             const user = result.user;
        //             console.log("User", user)
        //             const res = await axios.post("/auth/update-info", props.userValue)
        //             if (res.status === 200) {
        //                 console.log(res.data)
        //                 props.dispatch({ type: 'user', value: {} })
        //                 history.push("/auth/login")
        //             }
        //         }).catch((error) => {
        //             alert(error.message)
        //         });
        // }
    }

    console.log(otp)
    return (
        <div className="d-flex justify-content-center align-items-center container">
            <div className="card-1 py-5 px-3 shadow-lg p-3 mb-5 bg-white rounded">
                <h5 className="m-0">Mobile phone verification</h5><span className="mobile-text">Enter the code we just send on your mobile phone <b className="text-info">+91 {phnNumber}</b></span>
                <div className="d-flex flex-row mt-5">
                    <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={6}
                        hasErrored="true"
                        separator={<span>-</span>}
                    />
                    <br />

                    {/* <input type="text" className="form-control" autofocus=""/><input type="text" className="form-control"/><input type="text" className="form-control"/><input type="text" className="form-control"/> */}
                </div>
                <div>
                    <button onClick={handleSubmit} className="btn btn-lg btn-info btn-block text-uppercase w-100" type="submit">
                        Verify
                    </button>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => ({
    userValue: state.userValue
})

export default connect(mapStateToProps)(Otp)
