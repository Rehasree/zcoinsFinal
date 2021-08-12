import React, { useState } from 'react'
import { useHistory } from "react-router"
import { connect } from "react-redux"
import axios from "axios"

function Kyc(props) {
    const history = useHistory()
    const [kyc, setkyc] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const details = { ...props.userValue, ...kyc }
        console.log(details)
        const res = await axios.post("/auth/update-info", details)
        if (res.status === 200) {
            console.log(res.data)
            props.dispatch({ type: 'user', value: {} })
            history.push("/auth/login")
        }
    }

    const handleChange = (e) => {
        if (e.target.name !== "File") setkyc({ ...kyc, [e.target.name]: e.target.value });
        // else setkyc({ ...kyc, [e.target.name]: e.target.files[0] });
    }
    console.log(kyc)

    return (
        <div>
            <div align="left">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">KYC Details</h5>
                                    <form className="form-signin" autoComplete="nope" onSubmit={handleSubmit}>
                                        <div className="form-label-group">
                                            <input type="text" name="PanCardNum" id="inputtext2" className="form-control" onChange={handleChange}
                                                placeholder="text address" required autoFocus />
                                            <label htmlFor="inputtext2">Enter PAN Card number</label>
                                        </div>
                                        <select className="form-select form-select-lg mb-3 w-100" aria-label=".form-select-lg example" onChange={handleChange} name="ProofType">
                                            <option defaultValue>Select Proof type</option>
                                            <option value="voterId">Voter ID card</option>
                                            <option value="passport">Passport</option>
                                            <option value="DrivingLicence">Driving Licence</option>
                                            <option value="NRGEAJobCards">NRGEA Job Cards</option>
                                            <option value="UID">UID(Aadhar), provided authentication using e-KYC mode(Bio-metric or OTP Based) </option>
                                        </select>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Upload Proof</label>
                                            <input type="file" className="form-control w-100" name="File" id="exampleFormControlInput1" onChange={handleChange} placeholder="Upload doc" />
                                        </div>
                                        <br /> <br />
                                        <button style={{background:"#440A67",color:"white"}} className="btn btn-lg text-uppercase w-100" type="submit">
                                            Next
                                        </button>
                                    </form>
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

export default connect(mapStateToProps)(Kyc)
