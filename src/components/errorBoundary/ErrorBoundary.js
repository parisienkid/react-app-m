import { Component } from "react/cjs/react.production.min";
import ErrorMessage from "../error/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;