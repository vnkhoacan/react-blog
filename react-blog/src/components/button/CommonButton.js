const CommonButton = ({isLoading, onClick, disabled, children}) => {
    return (
        <button className="btn btn-primary" disabled={disabled} onClick={onClick}>
            { isLoading
            ?   <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            : children }
        </button>
    )
}

export default CommonButton