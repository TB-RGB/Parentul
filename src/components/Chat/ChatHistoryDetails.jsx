import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const ChatHistoryDetails = () => {
    const dispatch = useDispatch();
    const { log } = useSelector((store) => store.history);
    const user = useSelector((store) => store.user);
    const history = useHistory();

    const handleBackClick = () => {
        history.push(`/chathistory/${user.id}`);
    }

    return (
        <>
            <h1>Chat Log</h1>
            <button className="btn btn-secondary mt-5" onClick={handleBackClick}>Back</button>
            {log.map((message) => (
                <div key={message.id}>
                    <p>{message.content}</p>
                    <p>{message.sender}</p>
                </div>
            ))}
        </>
    )

}

export default ChatHistoryDetails