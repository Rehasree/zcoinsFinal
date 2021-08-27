import React, { useEffect, useState } from 'react'
import './Profile.css';
import { Table } from 'react-bootstrap';
import { connect } from "react-redux"
import { useHistory } from "react-router"
import axios from "axios"

function Profile(props) {
    const history = useHistory()
    const [transactions, setTransactions] = useState([])
    const [bank, setBank] = useState({})

    if (props.userValue.name) {
        var name = props.userValue.name.replaceAll("undefined", "");
        var name = name.replaceAll("-", " ");
    }

    useEffect(() => {
        if (!Object.keys(props.userValue).length) history.push("/auth/login")
        else {
            axios.post("/get-profile-details", { phoneNumber: props.userValue.username })
                .then(res => {
                    setTransactions(res.data.transactions)
                    setBank(res.data.bank)
                })
                .catch(err => {
                    console.log(err)
                    alert("Sorry we can't able to fetch your bank details.")
                })
        }
    }, [])

    return (
        <div className="container">
            <div className="row Profile p-3 mb-5 rounded">

                <div className="col-6" align="left" >
                    <p><b>Account Holder Name :</b>    {name} </p>
                    <p ><b>Mobile Number:</b>     {props.userValue.username}</p>
                    <p ><b> E-mail:</b> {props.userValue.email}</p>
                </div>

                <div className="col-6" align="right" >
                    <p ><b>Account Holder ID :</b>    {bank.accountHolderID} </p>
                    <p ><b>Account ID:</b>     {bank.accountID}</p>
                </div>
            </div>
            <h1>Transaction Details</h1>
            <br />
            <Table responsive>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Type of transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{transaction.transactionID}</td>
                                <td>{`${transaction.currency} ${transaction.amount / 100}`}</td>
                                <td>{transaction.recordType}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
const mapStateToProps = state => ({
    userValue: state.userValue
})

export default connect(mapStateToProps)(Profile)
