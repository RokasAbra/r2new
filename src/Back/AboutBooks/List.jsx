import { useContext } from "react";
import BackContext from "../BackContext";
import Line from "./Line";


function List() {

    const {books} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Books</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    books ? books.map(e => <Line key={e.id} line={e}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;