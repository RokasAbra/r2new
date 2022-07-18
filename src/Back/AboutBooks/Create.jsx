import { useRef } from 'react';
import { useContext, useState } from 'react';
import getBase64 from '../../Functions/getBase64';
import BackContext from '../BackContext';


function Create() {

    const { books, setCreateAboutBooks, showMessage } = useContext(BackContext);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [book, setBook] = useState('0');
    const fileInput = useRef();

    const [photoPrint, setPhotoPrint] = useState(null);
    
    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // tylim
        })
    }


    const handleCreate = () => {
        if (book === '0') {
            showMessage({ text: 'Please, select genre!', type: 'danger' });
            return;
        }
        const data = { 
            title, 
            price: parseFloat(price), 
            inStock: inStock ? 1 : 0, 
            book: parseInt(book),
            photo: photoPrint
        };
        setCreateAboutBooks(data);
        setTitle('');
        setPrice('');
        setInStock(false);
        setBook('0');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new Product</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                    <small className="form-text text-muted">Enter your Cat name here.</small>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
                    <small className="form-text text-muted">Enter price.</small>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="in--stock" checked={inStock} onChange={() => setInStock(i => !i)} />
                    <label className="form-check-label" htmlFor="in--stock">Check me out</label>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <select className="form-control" onChange={e => setBook(e.target.value)} value={book}>
                        <option value="0">Please, select your Cat</option>
                        {
                            books ? books.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                        }
                    </select>
                    <small className="form-text text-muted">Select category here.</small>
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
                    <small className="form-text text-muted">Upload Photo.</small>
                </div>
                {
                    photoPrint ? <div className="photo-bin">
                    <img src={photoPrint} alt='vienas'/>
                </div> : null
                }
                
                
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;