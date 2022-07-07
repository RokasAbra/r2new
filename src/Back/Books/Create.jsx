import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

    const { setCreateBook } = useContext(BackContext);

    const [genre, setGenre] = useState('');

    const handleCreate = () => {
        const data = { genre };
        setCreateBook(data);
        setGenre('');
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Add new Book genre</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setGenre(e.target.value)} value={genre} />
                    <small className="form-text text-muted">Enter new genre here.</small>
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;