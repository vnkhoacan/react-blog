const MyPostTable = ({children}) => {
    return (
        <table className="table table-striped table-hover table-bordered align-middle">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Number of likes</th>
                    <th scope="col">Number of comments</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
            {children}
            </tbody>
        </table>
    )
}

export default MyPostTable