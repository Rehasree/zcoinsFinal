import React from 'react'
import './Profile.css';
import {Table} from 'react-bootstrap';
import { connect } from "react-redux"
function Profile(props) {
    console.log(props.userValue)
    return (
        <div className="container">
            <div className="row Profile p-3 mb-5 rounded">
                
                    <div className="col-6" align="left" >
                        <p><b>Account Holder Name :</b>    {props.userValue.name} </p>
                        <p ><b>Mobile Number:</b>     {props.userValue.username}</p>
                        <p ><b> E-mail:</b> {props.userValue.email}</p>
                    </div>
                   
                    <div className="col-6" align="right" >
                        <p ><b>Account Holder ID :</b>    {props.userValue.name} </p>
                        <p ><b>Account ID:</b>     {props.userValue.username}</p>
                    </div>    
            </div>
        <h1>Transaction Details</h1>
        <br/>
            <Table responsive>
            <thead>
                <tr>
                <th>S.no</th>
                {Array.from({ length: 4 }).map((_, index) => (
                    <th key={index}>Table heading</th>
                ))}
                </tr>
            </thead>
             <tbody>
             {Array.from({ length: 8 }).map((_,index)=>(
                 <tr>
                 <td>{index}</td>
                 {Array.from({ length: 4 }).map((_, index) => (
                     <td key={index}>Table cell {index}</td>
                 ))}
                 </tr>
             ))} 
            </tbody>
            </Table>
        </div>
    )
}
const mapStateToProps = state => ({
    userValue: state.userValue
  })
  
export default connect(mapStateToProps)(Profile)
