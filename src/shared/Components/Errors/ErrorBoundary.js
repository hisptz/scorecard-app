import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import FullPageError from "./FullPageError";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: undefined}
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }

    render() {

        return (
            this.state.hasError ? <FullPageError error={this.state.error}/> : <Fragment>{this.props.children}</Fragment>
        )
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
};



