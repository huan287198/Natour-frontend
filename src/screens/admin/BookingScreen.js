import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listBooks, deleteBook } from '../../actions/bookActions';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function BookingScreen(props) {
    const bookList = useSelector(state => state.bookList);
    const { books, loading, error } = bookList;
    // console.log(books);
    const bookDelete = useSelector(state => state.bookDelete);
    const { success: successDelete } = bookDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listBooks());
        return () => {
        //
        };
    }, [dispatch, successDelete]);

    const deleteConfirmed = (id) => {
        let answer = window.confirm(
            "Are you sure you want to delete booking?"
        );
        if (answer) {
            deleteHandler(id);
        }
    };

    const deleteHandler = (bookId) => {
        dispatch(deleteBook(bookId));
    }

    return (<div className="main-wrapper">
    <Sidebar history={props.history}/>
    <div className="container-fluid main-content main-panel">
        <Navbar history={props.history}/>
        <section className="main-content__list">
            <div className="main-content__list-title">
                <span>
                Danh sách bookings &nbsp;&nbsp;
                <button className="btn btn-success btn-round">
                    <a href="!">
                    <i className="material-icons">create</i>
                    Tạo mới
                    </a>
                </button>
                </span>
                <div className="p-pagination">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                    {/* <li>1</li>
                    <li>2</li> */}
                    </ul>
                </nav>
                </div>
            </div>
            <div className="list table-responsive">
                <table className="table border">
                    <thead>
                        <tr>
                        <th className="text-left">#</th>
                        <th>Tour</th>
                        <th>User</th>
                        <th>Price</th>
                        <th>Paid</th>
                        <th className="text-center">Time</th>
                        <th className="td-actions text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <div>Loading...</div> : 
                            error ? <div>{error}</div> :
                            books.map((book, i) => {
                                const date = new Date(book.createdAt).toDateString();
                                return (<tr key={i}>
                                    <td className="text-left">{i+1}</td>
                                    <td>{book.tour.name}</td>
                                    <td>{book.user.name}</td>
                                    <td>{book.price} $</td>
                                    <td>{book.paid ? 'Da thanh toan' : 'Chua thanh toan'}</td>
                                    <td className="text-center">{date}</td>
                                    <td className="td-actions text-right">
                                        <button type="button" rel="tooltip" className="btn btn-success">
                                        <a href="!">
                                            <i className="material-icons">edit</i>
                                        </a>
                                        </button>
                                        <button  type="button" rel="tooltip" onClick={() => deleteConfirmed(book._id)}
                                        className="btn btn-list-category-delete btn-danger">
                                        <i className="material-icons">close</i>
                                        </button>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>
    )
}
