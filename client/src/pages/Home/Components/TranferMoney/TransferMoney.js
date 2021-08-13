import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Modal from '../../../../components/Modal/Modal';
import './TransferMoney.css'
import axios from 'axios'

function TransferMoney(props) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [coins, setCoins] = useState(0)
    const trasferCoins=(e)=>{
        e.preventDefault()
        console.log(phoneNumber,coins)
        if(phoneNumber.length!=10 || coins > props.userValue.coins  ){
                alert("Please verify your mobile number and coins");
        }
        if (phoneNumber.length==10 && coins <= props.userValue.coins){
           alert("Your coins are successfully trasferred 🎉🎉");
           props.userValue.coins = props.userValue.coins- coins 
        }
        if(phoneNumber===props.userValue.username )
        {
            alert("YoU can't transfer money to yourself");
        }
    }
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
            <form>
            <Container align="left">
                <p>Todal Coins: <b>{props.userValue.coins}</b></p>
                {props.userValue.coins ?(
                    <>
                    <Row>
                    <Col>
                        <div className="form-floating mb-3">
                            <input type="tel" className="form-control" id="floatingInput"
                                name="mobileNum" placeholder="Enter mobile number"
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                            />
                            <label className="floating-label" htmlFor="floatingInput">Enter Mobile Number</label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput"
                                name="coinsCount" placeholder="Enter no. of coins"
                                onChange={e => setCoins(parseFloat(e.target.value))}
                                required
                            />
                            <label className="floating-label" htmlFor="floatingInput">Enter No. of Coins</label>
                        </div>

                    </Col>
                </Row>
                {/*Add a button to check if the user is present or not*/}
                <button type="submit" className="get-started" onClick={trasferCoins}>Verify User</button>
               
                    </>
                ):(
                    <b><p>You don't have sufficient coins to transfer</p></b>
                )}
                
            </Container>
            </form>
        </div>
    )
}

export default TransferMoney
