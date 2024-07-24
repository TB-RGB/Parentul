import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const FirstTimeSetupName = () => {
const user = useSelector(state => state.user)

    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)


console.log("firstname", user.first_name)
    return (
        <>
            <form>
                <input 
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                />

                <input 
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                />
                <button>Next</button>
            </form>

        </>
    )
}

export default FirstTimeSetupName