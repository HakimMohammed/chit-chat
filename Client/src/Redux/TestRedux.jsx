import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TestRedux(){
    const auth = useSelector(state => state)

    useEffect(()=>{
        console.log(auth)
    },[auth])
    const dispacth = useDispatch()

    const handleClick = (e) => {
        console.log("clicked")
        dispacth({type:"login"})
    }

    return(
        <div>
            <h1>Did the user logged in ? {auth ? "Yes" : "No"}</h1>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}