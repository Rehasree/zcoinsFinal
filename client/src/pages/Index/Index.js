import React from 'react'
import home from './images/1.svg';
import home2 from './images/2.svg';
import home3 from './images/3.svg'
import { Container } from 'react-bootstrap';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PublicIcon from '@material-ui/icons/Public';
import NumberCounter from 'number-counter';
import './Index.css'

function Index() {
    const data = [
        { title: "Investors", count: 2500, prefix: <InsertEmoticonIcon />, delay: "5", postfix: "+" },
        { title: "Assets Under Managment", count: 10, prefix: "$", delay: "1", postfix: "M" },
        { title: "Trade Volume", count: 15, prefix: "$", delay: "1", postfix: "B" },
        { title: "Countries", count: 50, prefix: <PublicIcon />, delay: "1", postfix: "" },
    ]

    return (
        <div className="home" >

            <Container>
               <div className="row">
                   <div className="col-sm-12 col-lg-6 order-lg-1 order-sm-2 order-xs-2">
                        <h1 >LET YOUR MONEY GROW...</h1>
                        <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                       <a href="/auth/login"><button className="get-started">Get started <ArrowForwardIcon /> </button></a> 
                   </div>
                   <div className="col-sm-12 col-lg-6 order-lg-2 order-sm-1 order-xs-1">
                    <img id="float" className="img-fluid" src={home} alt="img" />
                   </div>
                </div>
                <br/><br/>
                <div className="row" >
                {data.map((info, index) => {
                        return (
                            <div className="col">
                                <div className="shadow-lg p-3 mb-5 bg-white rounded count-box">
                                    <span >
                                        <NumberCounter end={info.count} delay={info.delay} className="increment" preFix={info.prefix} postFix={info.postfix} />
                                    </span>
                                    <p>{info.title}</p>
                                </div>
                            </div>
                        )})}
                    
                </div>
                {/* <Row id="counts" className="counts" align="center">
                <>
                    
                            <Col key={index} xs={6} sm={6} md={4} lg={3} xl={3}>
                                
                            </Col>
                        )
                    })}
                </>
                </Row> */}

                <div className="row" style={{ marginTop: "6rem" }}>
                <>
                    <div className="col-sm-12 col-lg-6">
                        <img style={{ padding: "10px" }} className="img-fluid" style={{width:"400px",height:"400px"}} src={home2} alt="img" />
                    </div>
                    <div  className="col-sm-12 col-lg-6 content" align="left">
                        <h1 >Smartest way of investing...</h1>
                        <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                </>
                </div>

               <div className="row" style={{background:"#FFE3FE",borderRadius:"25px",padding:"20px"}}>
                   <div className="container">
                       <p style={{fontSize:"35px",fontFamily:"cursive",fontWeight:"bolder",color:"#93329E"}}>"You can be possessive but don't let your money be"</p>
                       <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                   </div>
               </div>

                <div className="row">
                <>
                    <div className="col-sm-12 col-lg-6 order-lg-1 order-sm-2 order-xs-2">
                        <h1 >WHY SHOULD U INVEST?</h1>
                        <p className="desc d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                       <a href="/auth/login"> <button className="get-started">Checkout our report <ArrowForwardIcon/> </button></a>
                    </div>
                    <div className="col-sm-12 col-lg-6 order-lg-2 order-sm-1 order-xs-1">
                        <img className="img-fluid" src={home3} alt="img" />
                    </div>
                </>
                </div>

            </Container>
        
        </div>
    )
}

export default Index
