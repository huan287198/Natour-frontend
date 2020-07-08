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
    const { loading: loadingBooks, books, error: errorBooks } = myBookList;

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
                        <div className="card-container2">
                            <h2 className="heading-secondary ma-bt-md">My tours</h2>
                        </div>
                        <div className="card-container2">
                            {loadingBooks ? <div>Loading...</div> :
                        errorBooks ? <div>{errorBooks} </div> :
                        books.map((tour, i) => {
                        const date = new Date(tour.startDates[0]).toDateString();
                        return (
                            <div className="card" key={i}>
                                <div className="card__header">
                                    <div className="card__picture">
                                    <div className="card__picture-overlay">&nbsp;</div>
                                    <img
                                        src={`/img/tours/${tour.imageCover}`}
                                        alt={tour.name}
                                        className="card__picture-img"
                                    />
                                    </div>

                                    <h3 className="heading-tertirary">
                                    <span>{tour.name}</span>
                                    </h3>
                                </div>

                                <div className="card__details">
                                    <h4 className="card__sub-heading">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
                                    <p className="card__text">
                                    {tour.summary}
                                    </p>
                                    <div className="card__data">
                                    <svg className="card__icon">
                                        <use xlinkHref="img/icons.svg#icon-map-pin"></use>
                                    </svg>
                                    <span>{tour.startLocation.description}</span>
                                    </div>
                                    <div className="card__data">
                                    <svg className="card__icon">
                                        <use xlinkHref="img/icons.svg#icon-calendar"></use>
                                    </svg>
                                    <span>{date}</span>
                                    </div>
                                    <div className="card__data">
                                    <svg className="card__icon">
                                        <use xlinkHref="img/icons.svg#icon-flag"></use>
                                    </svg>
                                    <span>{`${tour.locations.length} stops`}</span>
                                    </div>
                                    <div className="card__data">
                                    <svg className="card__icon">
                                        <use xlinkHref="img/icons.svg#icon-user"></use>
                                    </svg>
                                    <span>{`${tour.maxGroupSize} people`}</span>
                                    </div>
                                </div>

                                <div className="card__footer">
                                    <p>
                                    <span className="card__footer-value">{`$${tour.price}`}</span>
                                    <span className="card__footer-text"> per person</span>
                                    </p>
                                    <p className="card__ratings">
                                    <span className="card__footer-value">{tour.ratingsAverage}</span>
                                    <span className="card__footer-text">{` rating (${tour.ratingsQuantity})`}</span>
                                    </p>
                                    <Link to={`/tour/${tour.id}`} className="btn btn--green btn--small">Details</Link>
                                </div>
                            </div>
                        )
                    })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default MyBookingScreen;

