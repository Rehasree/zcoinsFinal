import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './BankDetails.css'
import { connect } from "react-redux"

function BankDetails(props) {
    const history = useHistory();
    const [bankDetails, setbankDetails] = useState([]);
    let accountNum,IfscCode;
    if(bankDetails.BankName){
        accountNum= Math.random().toString(36).slice(2);
        IfscCode= Math.random().toString(36).slice(2);   
    }
    const data = props.userValue

    const HandleSubmit = (e) => {
        e.preventDefault()

        const details = { ...props.userValue, ...bankDetails, holderName: data.name }
        props.dispatch({ type: 'user', value: details })

        console.log('submitted')
        history.push("/auth/kyc")
    }

    const handleChange = (e) => setbankDetails({ ...bankDetails, [e.target.name]: e.target.value });
    bankDetails.holderName = data?.name;
    bankDetails.AccountNum = accountNum;
    bankDetails.IFSCcode= IfscCode;
    console.log(bankDetails)
    return (
        <div align="left">
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Add Bank Acccount</h5>
                                <form className="form-signin" autoComplete="nope" onSubmit={HandleSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            
                                            <select className="form-select form-select-lg mb-3 w-100" name="BankName" aria-label=".form-select-lg example" onChange={handleChange} required>
                                                <option defaultValue>Select your Bank</option>
                                                <option value="StateBank">State Bank of India</option>
                                                <option value="icici">ICIC Bank</option>
                                                <option value="Punjab">Punjab and Sind Bank</option>
                                                <option value="Bank_of_Baroda">Bank of Baroda</option>
                                                <option value="Bank_of_India">Bank of India</option> 
                                                <option value="Bank_of_Maharastra">Bank of Maharastra</option>
                                                <option value="CanaraBank">Canara Bank</option>
                                                <option value="CentralBank">Central Bank of India</option>
                                                <option value="IOB">Indian Overseas Bank</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" name="holderName" id="inputtext1" className="form-control" onChange={handleChange}
                                            placeholder="text address" value={data.name} readOnly required autoFocus />
                                        <label htmlFor="inputtext1">Account holder Name</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input style={{textTransform:"uppercase"}} type="text" name="AccountNum" id="inputtext2" className="form-control" onChange={handleChange}
                                            placeholder="text address" value={accountNum} readOnly required autoFocus />
                                        <label htmlFor="inputtext2">Account number</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" style={{textTransform:"uppercase"}} name="IFSCcode" id="inputtext3" className="form-control" onChange={handleChange}
                                            placeholder="text address" value={IfscCode} readOnly required autoFocus />
                                        <label htmlFor="inputtext3">IFSC CODE</label>
                                    </div>
                                    <br /> <br />
                                    <button style={{background:"#440A67",color:"white"}} className="btn btn-lg text-uppercase w-100" type="submit">
                                        Next
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userValue: state.userValue
})

export default connect(mapStateToProps)(BankDetails)
