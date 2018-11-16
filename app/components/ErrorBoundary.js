import React, { Component } from 'react'
import PropTypes from 'prop-types'

// todo - Update this when ErrorBoundary hook support launches

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hadError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, info) {
    console.warn(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h2>{this.props.text}</h2>
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  text: PropTypes.string
}

ErrorBoundary.defaultProps = {
  text: 'Oh no. Something went wrong.'
}