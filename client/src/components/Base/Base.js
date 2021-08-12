import React, { Component } from "react";
import Navbarr from "../Navbar/Navbar";
import Footer from '../Footer/Footer'
import './Base.css'
export default class Base extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: false,
      };
    }
    onToggle = (expanded) => {
      this.setState({ expanded: !this.state.expanded });
    };
  
    render() {
        // Particles
      return (
        <div>
            <Navbarr />
            <div style={{minHeight:"90vh"}} >
              {this.props.children}
            </div>
            <Footer/>
        </div>
      );
    }
}