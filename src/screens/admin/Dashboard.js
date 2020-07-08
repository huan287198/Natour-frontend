import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listTours, top5Tours } from '../../actions/tourActions';
// import { listUsers } from '../../actions/userActions';
import { listBooks } from '../../actions/bookActions';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Dashboard(props) {
    const tourList = useSelector(state => state.tourList);
    const { length: countTours } = tourList;
    // const userList = useSelector(state => state.userList);
    // const { length: countUsers } = userList;
    const bookList = useSelector(state => state.bookList);
    const { length: countBooks } = bookList;
    const top5Tour = useSelector(state => state.top5Tour);
    const { tours, loading, error } = top5Tour;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listTours());
        // dispatch(listUsers());
        dispatch(listBooks());
        dispatch(top5Tours());
        return () => {
        //
        };
    }, [dispatch]);
    return (<div className="wrapper">
        <Sidebar history={props.history}/>
        <div className="main-panel ps-container ps-theme-default ps-active-y">
            <Navbar history={props.history}/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="card card-stats">
                                <div className="card-header card-header-warning card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">content_copy</i>
                                    </div>
                                    <p className="card-category">Booking</p>
                                    <h3 className="card-title">
                                        {countBooks}
                                    </h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">date_range</i> Last 24 Hours
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="card card-stats">
                                <div className="card-header card-header-success card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">store</i>
                                    </div>
                                    <p className="card-category">Tour</p>
                                    <h3 className="card-title">
                                        {countTours}
                                    </h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">date_range</i> Last 24 Hours
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <div className="card card-stats">
                                <div className="card-header card-header-warning card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">account_box</i>
                                    </div>
                                    <p className="card-category">User</p>
                                    <h3 className="card-title">
                                        {/* {countUsers} */}
                                    </h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">date_range</i> Last 24 Hours
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <h3> Top 5 cheap </h3>
                </div>
                <div className="row">
                    {
                        loading ? <div>Loading...</div> :
                        error ? <div>{error}</div> :
                        tours.map((tour, i) => {
                            //console.log(tour.reviews.length);
                            return (
                                <div className="col-md-4" key={i}>
                                    <div className="card card-product" data-count="1">
                                        <div className="card-header card-header-image" data-header-animation="true">
                                            <img
                                                src={`http://localhost:5000/img/tours/${tour.imageCover}`}
                                                alt={tour.name}
                                                className="card__picture-img"
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">
                                                {tour.name}
                                            </h4>
                                            <div className="card-description">
                                                {tour.summary}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <p className="card-category"><i className="material-icons">mood</i> {tour.reviews.length} reviews</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    </div>
    )
}
