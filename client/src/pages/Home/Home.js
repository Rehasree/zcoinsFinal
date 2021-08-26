import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import svg from './images/2.svg'
import svg2 from './images/4.svg'
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import AssignmentReturnTwoToneIcon from '@material-ui/icons/AssignmentReturnTwoTone';
import Addmoney from './Components/AddMoney/Addmoney';
import Withdraw from './Components/Withdraw/Withdraw';
import RequestCoins from './Components/RequestCoins/RequestCoins';
import BuySellCoins from './Components/BuySellCoins/BuySellCoins';
import TransferWithinAStationTwoToneIcon from '@material-ui/icons/TransferWithinAStationTwoTone';
import TransferMoney from './Components/TranferMoney/TransferMoney';
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
        { icon: <AccountBalanceWalletTwoToneIcon />, id: "collapse1", target: "#collapse1", title: "ADD MONEY", info: <Addmoney userValue={props.userValue} /> },
        { icon: <AssignmentReturnTwoToneIcon />, id: "collapse2", target: "#collapse2", title: "WITHDRAW", info: <Withdraw userValue={props.userValue} /> },
        { icon: <SendTwoToneIcon />, id: "collapse3", target: "#collapse3", title: "REQUEST COINS", info: <RequestCoins userValue={props.userValue} /> },
        { icon: <TransferWithinAStationTwoToneIcon/>, id: "collapse4", target: "#collapse4", title: "TRANSFER COINS", info: <TransferMoney userValue={props.userValue} /> },
        { icon: <CheckCircleTwoToneIcon />, id: "collapse5", target: "#collapse5", title: "BUY/SELL COINS", info: <BuySellCoins userValue={props.userValue} /> },

    ]
    const TotalBalance = props.userValue.money + (100 * props.userValue.coins)
    return (
        <div className="container">
            <div className="row" align="center">
                <div className="col-12">
                    <Graph isHome="true" transactableAmount={props.userValue.money} balance={TotalBalance} coins={props.userValue.coins} />
                </div>
            </div>
            {/* BENEFITS */}
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <Row align="center">
                        {data.map((info,index)=>{
                            return(
                                <Col key={index} className="pros">
                                <a class=" collapsed data-card" type="button" data-bs-toggle="collapse" data-bs-target={info.target} aria-expanded="false" aria-controls={info.id}>
                                    <h3>{info.icon}</h3>
                                </a>
                                <h5>{info.title}</h5>
                               </Col>
                            )
                        })}
                    </Row>
    
                    {data.map((info,index)=>{
                        return(
                             <div id={info.id} class="accordion-collapse collapse" aria-labelledby={info.id} data-bs-parent="#accordionExample">
                                <div>
                                <div className="box">
                                    <h3>{info.title}</h3>
                                    {info.info}
                                </div>
                                </div>
                            </div>
                        )
                    })}
               </div>
            </div>
           
            <br />
            <h2 align="left">Do you know????</h2>
            <div className="row" style={{ marginTop: "2rem" }}>

                <div className="col-sm-12 col-lg-6">
                    <img className="img-fluid animated" src={svg} alt="img" />
                </div>
                <div className="col-sm-12 col-lg-6 content" align="left" >
                    <h3 align="left">Investing Simplified</h3>
                    <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                        Z coins is the best way to start investing your money. Don't worry about where to invest, when to invest and how to invest.
                        Just put your money in Z coins and let the system do the rest. Z coins will automatically invest your money in the best possible way.
                    </p>
                </div>
            </div >
                <div className="spaceGenerator"></div>
                <div className="row">
                <>
                    <div align="left" className="col-sm-12 col-lg-6 order-lg-1 order-sm-2 order-xs-2">
                        <h1 >WHY SHOULD U INVEST?</h1>
                        <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                            You need to invest your money in order to overcome the inflation and Z coins is the best place to do so. 
                            Through Z coins, you don't need to have the knowledge of stock market of investing. You can invest your money in different low-risk stocks 
                            using Z coins.  
                            Z coins has proved itself by bringing good returns to its investors. Why wait when you can also be an investor?
                            <br/>
                            Like always, the more the merrier. 
                        </p>

                    </div>
                    <div className="col-sm-12 col-lg-6 order-lg-2 order-sm-1 order-xs-1">
                        <img className="img-fluid animated" src={svg2} alt="img" />
                    </div>
                </>
                </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userValue: state.userValue
})

export default connect(mapStateToProps)(Home)
