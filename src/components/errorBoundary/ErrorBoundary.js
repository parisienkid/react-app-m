import { Component } from "react/cjs/react.production.min";
import ErrorMessage from "../error/ErrorMessage";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }
    }

    static getDerivedStateFroError(error) {
        return {error}
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage></ErrorMessage>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;