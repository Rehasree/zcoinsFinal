import React, { useState } from 'react'
import axios from "axios"
import { connect } from "react-redux"

function Modal(props) {
  const [pwd, setPwd] = useState(null);
  const isPassword = props.password
  const command = props.id
  const user = props.userValue
  let amount = props.amount

  const handleClick = (e) => {
    if ((command === "addMoney" || command === "withdraw") && props.amount <= 0) {
      if (command === "addMoney") alert("Enter atleast INR 1 to add money")
      else if (command === "withdraw") alert("Enter atleast INR 1 to withdraw money")
      e.target.removeAttribute("data-target")
      return
    }
    else if (command === "buysellCoins") {
      if (props.action === "buy") {
        if (user.money < props.coins * 100 || !props.coins) {
          !props.coins
            ? alert("You didn't to buy atleast one coin.")
            : alert(`With your money number of coins you can buy are ${Math.floor(user.money / 100)}`)
          e.target.removeAttribute("data-target")
          return
        }
      } else if (props.action === "sell") {
        if (user.coins < props.coins || !props.coins) {
          !props.coins
            ? alert("Select atleast one coin to sell or You didn't have any coins in your account.")
            : alert(`You can't sell more than ${user.coins} coins`)
          e.target.removeAttribute("data-target")
          return
        }
      } else {
        alert("Please select buy or sell action")
        e.target.removeAttribute("data-target")
        return
      }
    } else if (command === "requestCoins" || command === "transferCoins") {
      if (user.username === props.phoneNumber || props.phoneNumber.length < 10 || props.phoneNumber.length > 10) {
        if (command === "transferCoins") alert("You can't transfer yourself and phone number should contain 10 characters.")
        else if (command === "requestCoins") alert("You can't request yourself and phone number should contain 10 characters.")
        e.target.removeAttribute("data-target")
        return
      } else if (!props.coins || props.coins <= 0) {
        if (command === "transferCoins") alert("You need to transfer atleast one coin.")
        else if (command === "requestCoins") alert("You need to request atleast one coin.")
        e.target.removeAttribute("data-target")
        return
      }
    }
    if (command === "transferCoins" && props.coins > user.coins) {
      alert(`You can't transfer beyond ${user.coins} coins.`)
      e.target.removeAttribute("data-target")
      return
    }
    e.target.setAttribute("data-target", props.dataTarget)
  }

  const handleSubmit = () => {
    if (!pwd) {
      alert("Please enter your password.")
      return
    }
    if (command === "withdraw" && props.amount && props.amount > user.money) {
      if (props.amount > user.money + user.coins * 100) {
        alert(`You can't withdraw more than ${user.money + user.coins * 100}/-`)
        return
      }
      if (props.amount <= user.money + user.coins * 100) {
        alert(`${user.money} will been withdrawn now. Remaining amount will be withdrawn after the stock market opens/closes for the day`)
        amount = user.money;
      }
    }

    let response

    if (command === "addMoney" || command === "withdraw")
      response = axios.post("/manage-money", { username: user.username, password: pwd, amount: amount, command })
    else if (command === "buysellCoins")
      response = axios.post("/manage-coins", { username: user.username, password: pwd, action: props.action, coins: props.coins })
    else if (command === "requestCoins")
      response = axios.post("/request-coins", { username: user.username, password: pwd, requestedUser: props.phoneNumber, coins: props.coins })
    else if (command === "transferCoins")
      response = axios.post("/transfer-coins", { username: user.username, password: pwd, transferedUser: props.phoneNumber, coins: props.coins })

    response
      .then(res => {
        if (res.data.user) props.dispatch({ type: 'user', value: res.data.user })
        alert(res.data.message)
        setPwd(null)
        window.location.reload()
      })
      .catch(err => {
        const errMssg = err.response.data === "Password or username is incorrect" ? "Password is incorrect." : err.response.data
        console.log(errMssg)
        alert(errMssg)
        return
      })
  }

  const handleChange = (e) => setPwd(e.target.value)

  return (
    <div>
      <button type="button" onClick={handleClick} className="btn btn-info w-100" data-toggle="modal">
        {props.button}
      </button>

      <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* {props.content} */}
              {isPassword && (
                <div className="form-floating">
                  <input type="password" placeholder="Enter password" className="form-control W-100" id="floatingPassword" name="Password" onChange={handleChange} />
                  {/*Add label for floatingPassword which says "Enter your password"*/}
                  <label className="floatingPassword" htmlFor="floatingPassword">Enter your password</label>
                </div>
              )}

            </div>
            <div className="modal-footer" align="center">
              <button type="button" onClick={handleSubmit} className="btn btn-info w-100">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  userValue: state.userValue
})

export default connect(mapStateToProps)(Modal)
