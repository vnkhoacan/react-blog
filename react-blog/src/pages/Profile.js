import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "../components/profile/ProfileContent";
import UserService from "../services/user.service";
import CommonSprinner from "../components/sprinners/CommonSprinner";
const Profile = () => {
    let { id } = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        UserService.getOne(id).then((data) => {
            setUser(data.data.data)
        }).catch((err) => {
            console.log(err)
        }).finally(()=> {
            setIsLoading(false)
        })
        // eslint-disable-next-line
    }, [])
    return (
        <div style={{backgroundColor: "#eee", height: "90vh"}}>
            <div className='container'>
                { isLoading
                ? <CommonSprinner/>
                : <ProfileContent user={user}/>}
            </div>
        </div>
    )
}

export default Profile