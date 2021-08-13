import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Modal from '../../../../components/Modal/Modal';
import './RequestCoins.css'
import axios from 'axios'

function RequestCoins() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [coins, setCoins] = useState(0)
    // const handleSubmit = (phoneNumber) => {
    //     let response
    //     response = axios.get("/check-user",{username: phoneNumber})
    //     response
    //       .then(res => {
    //           console.log(res.data)
    //             return res.data
    //       })
    //       .catch(err => {
    //         const errMssg = err.response.data === "Password or username is incorrect" ? "Password is incorrect." : err.response.data
    //         console.log(errMssg)
    //         alert(errMssg)
    //         return
    //     })
    // }
    
    return (
        <div>
            <Container align="left">
                <Row>
                    <Col>
                        <div className="form-floating mb-3">
                            <input type="tel" className="form-control" id="floatingInput"
                                name="mobileNum" placeholder="Enter mobile number"
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                            <label className="floating-label" htmlFor="floatingInput">Enter Mobile Number</label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput"
                                name="coinsCount" placeholder="Enter no. of coins"
                                onChange={e => setCoins(parseFloat(e.target.value))}
                            />
                            <label className="floating-label" htmlFor="floatingInput">Enter No. of Coins</label>
                        </div>

                    </Col>
                </Row>
                {/*Add a button to check if the user is present or not*/}
                {/*<button className="btn btn-primary" onClick={handleSubmit(phoneNumber)}>Verify User</button>*/}
                <Modal button="Validate" dataTarget="#requestCoins" id="requestCoins"
                    content={`You are requesting xxxxx for ${coins} coins`} password="true"
                    phoneNumber={phoneNumber}
                    coins={coins}
                />
            </Container>
        </div>
    )
}

export default RequestCoins
