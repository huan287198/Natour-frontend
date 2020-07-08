import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyBooks } from '../../actions/bookActions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../layouts/NavBar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function MyBookingScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const myBookList = useSelector(state => state.myBookList);
    const { loading, books, error } = myBookList;

    const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {

    }
    dispatch(listMyBooks());
    return () => {

    };
  }, [dispatch, userInfo]);
    return (<div>
        <Header/>
        <main className="main">
            <div className="user-view">
                <NavBar history={props.history}/>

                <div className="user-view__content">
                    <div className="user-view__form-container2">
                        <h2 className="heading-secondary ma-bt-md">Your bookings</h2>
                    </div>
                    <div className="user-view__form-container2">
                    {loading ? <div>Loading...</div> : null}
                    {error ? <div>{error} </div> : null}
                    <table className="form form-user-data table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
                            <thead className="thead-light">
                                <tr role="row">
                                    <td width="150px">Tên tour</td>
                                    <td width="100px">Ảnh đại diện</td>
                                    <td width="100px">Loại tuor</td>
                                    <td width="60px">Thời gian</td>
                                    <td width="80px">Trạng thái</td>
                                    <td>Hành động</td>
                                </tr>
                            </thead>
                            <tbody>
                                {books ? books.map((tour, i) => {
                                    return (
                                        <tr role="row" key={i+1}>
                                            <td>{tour.name}</td>
                                            <td>
                                                <img
                                                    className={"form__user-photo2"}
                                                    src={`/img/tours/${tour.imageCover}`}
                                                    alt={`The Park Camper Tour ${i+1}`}
                                                />
                                            </td>
                                            <td>Tour ngoài nước</td>
                                            <td>{`${tour.duration} ngày` }</td>
                                            <td>Success</td>
                                            <td>
                                                <button className="btn--danger" >
                                                    <i className="material-icons">close</i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
    )
}

export default MyBookingScreen;

