import './bootstrap.css';
import './App.scss';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Front from './Front/Front';
import Back from './Back/Back';


function App () {





    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Front/>}/>
            <Route path="/admin" element={<Back show="admin"/>}/>
            <Route path="/admin/book" element={<Back show="book"/>}/>
            <Route path="/admin/books_info" element={<Back show="books_info"/>}/>
       </Routes>
       </BrowserRouter>
    )
}
export default App;