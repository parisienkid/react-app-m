import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, ViewComponent) => {
    switch (process) {
        case ('loading'):
            return <Spinner/>
        case ('waiting'):
            return <Skeleton/>
        case ('confirmed'):
            return ViewComponent
        case ('error'):
            return <ErrorMessage/>
        default:
            throw new Error ('Unexpected process state')
    }
};

const setListContent = (process, ViewComponent, initialLoading) => {
    switch (process) {
        case ('loading'):
            if (initialLoading) {
                return <Spinner/>
            } else {
                return ViewComponent
            }
        case ('waiting'):
            if (initialLoading) {
                return null
            } else {
                return ViewComponent
            }
        case ('confirmed'):
            return ViewComponent
        case ('error'):
            return <ErrorMessage/>
        default:
            throw new Error ('Unexpected process state')
    }
};

export {setContent, setListContent};