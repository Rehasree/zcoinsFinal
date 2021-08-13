import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { connect } from "react-redux";
import { useHistory } from "react-router"
import axios from "axios"

import './Navbar.css'

function Navbarr(props) {
   const history = useHistory()

   const handleClick = () => {
      axios.get("/auth/logout")
         .then(res => {
            props.dispatch({ type: 'user', value: {} })
            history.push("/")
         })
         .catch(err => {
            console.log(err)
         })
   }

   return (
      <div>
         <Navbar className="shadow-lg bg-white rounded" collapseOnSelect bg="light" expand="lg">
            <Container>
               <Navbar.Brand href="#home" className="nav-title">Z-Coins</Navbar.Brand>
               <Nav className="me-auto">
                  <Nav.Link href="#features"></Nav.Link>
                  <Nav.Link href="#pricing"></Nav.Link>

               </Nav>
               <Nav>
                  {!props.userValue.name ? (
                     <>
                        <Nav.Link href="/auth/login" className="Loginbtn">Login/Sign Up</Nav.Link>
                     </>
                  ) : (
                     <NavDropdown title={props.userValue.name} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleClick}>Logout</NavDropdown.Item>
                     </NavDropdown>
                  )}
               </Nav>
            </Container>
         </Navbar>
      </div>

   )
}

const mapStateToProps = state => ({
   userValue: state.userValue
})

export default connect(mapStateToProps)(Navbarr)
