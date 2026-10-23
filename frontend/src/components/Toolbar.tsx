import "../styles.css"
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function Toolbar() {
    function getLetter() {
        const user = localStorage.getItem("user");
        return user ? Array.from(user)[0] : "";
    }
    const navigate = useNavigate();
    return (<div className={"toolbar"}>
        <p className="toolbar-message">Place for more features!</p>
        {/*<Button className="secondary-button">Goals</Button>
        <Button className="secondary-button">Budget</Button>
        <Button className="secondary-button" onClick={()=>navigate("/expenses")}>Expenses</Button>*/}
        <Button className="primary-button" onClick={()=>navigate("/")}>Log Out</Button>
        <p className={"toolbar-letter centered"}>{getLetter()}</p>
        </div>)
}

export default Toolbar