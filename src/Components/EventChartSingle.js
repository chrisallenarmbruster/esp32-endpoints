import React, { Component } from "react"
import { connect } from "react-redux"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

export class EventChartSingle extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  render() {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    )

    const options = {
      responsive: true,
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          position: "top",
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
        },
      },
      scales: {
        y: {
          min: 65,
          title: {
            display: true,
            text: "° Fahrenheit",
            font: {
              size: 16,
            },
          },
        },
      },
    }

    const labels = this.props.device?.events
      ?.reverse()
      .map((event) =>
        new Date(event.time).toLocaleString("en-US", {}).slice(-11)
      )

    const data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: this.props.device?.events
            ?.reverse()
            .map((event) => event.value),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    }

    return (
      <>
        {" "}
        <Button className="ms-3" variant="primary" onClick={this.handleShow}>
          Chart
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Event Chart ({this.props.device?.deviceconfig?.label} Temperature)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Line options={options} data={data} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  device: state.deviceSingle.data,
  isLoading: state.deviceSingle.isLoading,
})

export default connect(mapStateToProps)(EventChartSingle)
