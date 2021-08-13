import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import InputSlider from './Component/slider';
import Modal from '../../../../components/Modal/Modal'

function BuySellCoins(props) {
    const [action, setAction] = useState("")
    const [countCoins, setCountCoins] = useState(100)

    const user = props.userValue
    return (
        <Container>
            <br />
            <div className="row">
                <div className="col-sm-12 col-lg-6"><p>Current Balance: <b>{user.money}/-</b></p> </div>
                <div className="col-sm-12 col-lg-6"><p>Price of each Z-COIN as per today stats: <b>100/-</b></p></div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col-sm-12 col-lg-6" >
                    <select className="form-select form-select-lg mb-3 w-100" aria-label=".form-select-lg example" onChange={e => setAction(e.target.value)}>
                        <option defaultValue>Select your type</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div >
                <div className="col-sm-12 col-lg-6" >
                    <InputSlider userValue={user} action={action} setCoins={setCountCoins} />
                </div >
            </div>
            <br />
            <Modal button="Submit" dataTarget="#buysellCoins" id="buysellCoins" action={action} coins={countCoins} password="true" />
        </Container>
    )
}

export default BuySellCoins
