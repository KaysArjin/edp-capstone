import { useEffect } from "react";

const Card = (props) => {
    return (
        <div className="container-card">
            <div className="Sender">Sender: {props.sender} </div>
            <div className="classification">{props.classification}</div>
            <div className="msg">{props.msg}</div>
        </div>
    );
}

export default Card;