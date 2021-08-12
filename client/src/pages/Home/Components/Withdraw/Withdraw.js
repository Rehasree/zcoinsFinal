import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Modal from '../../../../components/Modal/Modal'

function Withdraw() {
    const [amount, setAmount] = useState(0)

    return (
        <div>
            <Container align="left">
                <div className="form-floating mb-3">
                    <input type="number" placeholder="Enter amount to withdraw" className="form-control"
                        id="floatingInput"
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>
                <span style={{ color: "grey" }} >
                    (This amount will be withdrawed into your current bank account <b>Account number here</b>)
                </span>
                <br /> <br />

                <Modal button="Withdraw Amount" dataTarget="#withdraw" id="withdraw" amount={amount} password="true" />
            </Container>
        </div>
    )
}

export default Withdraw
