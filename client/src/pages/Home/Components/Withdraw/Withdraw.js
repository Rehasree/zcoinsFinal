import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Modal from '../../../../components/Modal/Modal'

function Withdraw(props) {
    const [amount, setAmount] = useState(0)
    return (
        <div>
            <Container align="left">
                <div className="form-floating mb-3">
                    <input type="number" placeholder="Enter amount to withdraw" className="form-control"
                        id="floatingInput"
                        onChange={e => setAmount(e.target.value)}
                    />
                    {/*Set label for floatingInput as "Enter the amount you want to withdraw"*/}
                    <label htmlFor="floatingInput" className="floatingInput-label">Enter the amount you want to withdraw</label>
                </div>

                <p>
                    This amount will be withdrawed into your <strong style={{ textTransform: 'uppercase' }}>{props.userValue.BankName}</strong> bank account
                </p>
                <p><strong>Account Number</strong>: {props.userValue.AccountNum}</p>
                <br /> <br />

                <Modal button="Withdraw Amount" dataTarget="#withdraw" id="withdraw" amount={amount} password="true" />
            </Container>
        </div>
    )
}

export default Withdraw
