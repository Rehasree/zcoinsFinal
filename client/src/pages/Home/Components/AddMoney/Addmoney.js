import React, { useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap';
import Modal from '../../../../components/Modal/Modal';
import './Addmoney.css'

function Addmoney(props) {
    const [amount, setAmount] = useState(0)

    return (
        <Container align="left">
            <Row >
                <Col>
                    <p className="balance">Your current balance is: <b>{props.userValue.money}/-</b></p>
                </Col>
            </Row>
            <div className="form-floating mb-3">
                <input type="number" className="form-control" id="floatingInput"
                    placeholder="Enter amount you wanna add"
                    onChange={e => setAmount(e.target.value)}
                />
                
            </div>
            <span style={{ color: "grey" }} >(This amount will be decucted from your current bank account <b>Account number here</b>)</span>
            <br /> <br />

            <Modal button="Add Money" dataTarget="#addMoney" id="addMoney" amount={amount} password="true" />
        </Container>
   
   )
}

export default Addmoney
