import { useContext } from "react";
import BackContext from "../BackContext";


function Line({ line }) {

    const { setDeleteBook, setModalBook } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteBook(line);
    }

    const handleEdit = () => {
        setModalBook(line);
        console.log(line);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.genre}</b>
                   
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
           
        </li>
    );
}

export default Line;