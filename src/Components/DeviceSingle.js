import React, { Component } from "react"
import { connect } from "react-redux"

export class DeviceSingle extends Component {
  render() {
    return <div>DeviceSingle</div>
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DeviceSingle)
