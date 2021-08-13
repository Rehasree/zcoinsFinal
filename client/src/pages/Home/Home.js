import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import svg from './images/1.svg'
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import AssignmentReturnTwoToneIcon from '@material-ui/icons/AssignmentReturnTwoTone';
import Addmoney from './Components/AddMoney/Addmoney';
import Withdraw from './Components/Withdraw/Withdraw';
import RequestCoins from './Components/RequestCoins/RequestCoins';
import BuySellCoins from './Components/BuySellCoins/BuySellCoins';
import { connect } from "react-redux"
import { useHistory } from "react-router"
import Graph from './Graph';
import './Home.css'

function Home(props) {
    const history = useHistory()

    useEffect(() => {
        if (!Object.keys(props.userValue).length) history.push("/auth/login")
    })

    const data = [
        { icon: <AccountBalanceWalletTwoToneIcon />, id: 1, target: "#1", title: "ADD MONEY", info: <Addmoney userValue={props.userValue} /> },
        { icon: <AssignmentReturnTwoToneIcon />, id: 2, target: "#2", title: "WITHDRAW", info: <Withdraw userValue={props.userValue} /> },
        { icon: <SendTwoToneIcon />, id: 3, target: "#3", title: "REQUEST COINS", info: <RequestCoins/> },
        { icon: <CheckCircleTwoToneIcon />, id: 4, target: "#4", title: "BUY/SELL COINS", info: <BuySellCoins userValue = {props.userValue}/>  },
    ]
    const TotalBalance = props.userValue.money + (100* props.userValue.coins)
    return (
        <div class="container">
           
           <div className="row" align="center">
               <div className="col-12">
               <Graph transactableAmount={props.userValue.money} balance={TotalBalance} coins={props.userValue.coins}/>
               </div>
           </div>
            {/* BENEFITS */}
                <Row align="center">
                    {data.map((info, index) => {
                        return (
                            <Col key={index} className="pros">
                                <a className="data-card" data-toggle="collapse" href={info.target} role="button" aria-expanded="false" aria-controls={info.id}>
                                    <h3>{info.icon}</h3>
                                </a>
                                <h5>{info.title}</h5>
                            </Col>
                        )
                    })}
                    {data.map((info, index) => {
                        return (
                            <div key={index} className="collapse" id={info.id}>
                                <div>
                                    <div className="box"  >
                                        <h3>{info.title}</h3>
                                        {info.info}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Row>
                <br/> 
                <h2 align="left">Do u know????</h2>   
                <div className="row"  style={{ marginTop: "2rem" }}>
                  
                    <div className="col-sm-12 col-lg-6">
                        <img  className="img-fluid" src={svg} alt="img" />
                    </div>
                    <div className="col-sm-12 col-lg-6 content" align="left" >
                    <h3 align="left">Investing Simplified</h3>
                        <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                            Z coins is the best way to start investing your money. Don't worry about where to invest, when to invest and how to invest.
                            Just put your money in Z coins and let the system do the rest. Z coins will automatically invest your money in the best possible way.
                        </p>
                    </div>
                </div >
        
        </div>
    )
}

const mapStateToProps = state => ({
    userValue: state.userValue
})

export default connect(mapStateToProps)(Home)
