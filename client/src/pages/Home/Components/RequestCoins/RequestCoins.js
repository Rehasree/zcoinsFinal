import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Modal from '../../../../components/Modal/Modal';
import './RequestCoins.css'

function RequestCoins() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [coins, setCoins] = useState(0)

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
                            
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput"
                                name="coinsCount" placeholder="Enter no. of coins"
                                onChange={e => setCoins(parseFloat(e.target.value))}
                            />
                        
                        </div>

                    </Col>
                </Row>
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
