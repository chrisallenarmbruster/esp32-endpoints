import React, { Component, Fragment } from "react"
// import NavBar from './Navbar';
import { Routes, Route, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import { setDevices } from "../store/deviceAll"
import Home from "./Home"

class App extends Component {
  componentDidMount() {
    this.props.setDevices()
  }

  render() {
    return (
      <Fragment>
        Stackathon
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Fragment>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { devices: state.deviceAll.data, isLoading: state.deviceAll.isLoading }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDevices: () => dispatch(setDevices()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
