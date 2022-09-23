import { useState } from "react";
import CommonButton from "../button/CommonButton";

const CommentForm = ({ path, handleAddComment }) => {
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const AddComment = () => {
        setIsLoading(true)
        handleAddComment(path, content)
        setContent('')
        setIsLoading(false)
    }
    return (
        <div className="mt-2">
            <textarea
                className="form-control mb-1"
                rows={2}
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <div className="d-block">
                <CommonButton disabled={content ? false : true} isLoading={isLoading} onClick={AddComment}>
                    Comment
                </CommonButton>
            </div>
        </div>
    )
}

export default CommentForm