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
                    placeholder="Enter amount you want to add"
                    onChange={e => setAmount(e.target.value)}
                />
                {/*Set label for floatingInput as "Enter the amount you want to add*/}
                <label htmlFor="floatingInput">Enter the amount you want to add</label>
            </div>
            <p>This amount will be decucted from your <strong style={{ textTransform: 'uppercase' }}>{props.userValue.BankName}</strong> bank account</p>
            {/*Display the props.userValue.AccountNum in the next line*/}
            <p><strong>Account Number</strong>: {props.userValue.AccountNum}</p>
            <br /> <br />

            <Modal button="Add Money" dataTarget="#addMoney" id="addMoney" amount={amount} password="true" />
        </Container>

    )
}

export default Addmoney
