import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { listMyReviews, saveReview, deleteReview } from '../../actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../layouts/NavBar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function MyReviewScreen(props) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [id, setId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // const userSignin = useSelector(state => state.userSignin);
    // const { userInfo } = userSignin;

    const myReviewList = useSelector(state => state.myReviewList);
    const { loading, reviews, error} = myReviewList;

    const reviewSave = useSelector(state => state.reviewSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = reviewSave;

    const reviewDelete = useSelector(state => state.reviewDelete);
    const { success: successDelete } = reviewDelete;

    const dispatch = useDispatch();

    useEffect(() => {
    if (successSave) {
        setModalVisible(false);
    }
    dispatch(listMyReviews());
    return () => {
        //
    };
    }, [successSave, successDelete, dispatch]);

    const openModal = (review) => {
        setModalVisible(true);
        setId(review._id);
        setReview(review.review);
        setRating(review.rating);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveReview({
        _id: id, review, rating
        }));
    }

    const deleteConfirmed = (id) => {
        let answer = window.confirm(
            "Are you sure you want to delete your review?"
        );
        if (answer) {
            deleteHandler(id);
        }
    };

    const deleteHandler = (reviewId) => {
        dispatch(deleteReview(reviewId));
    }

    return (<div>
        <Header/>
        <main className="main">
            <div className="user-view">
                <NavBar history={props.history}/>

                <div className="user-view__content">
                    <div className="user-view__form-container2">
                        <h2 className="heading-secondary ma-bt-md">Your reviews</h2>
                        {modalVisible && (
                            <>
                            <form className="form form-user-data" onSubmit={submitHandler}>
                                <div className="form__group">
                                    {loadingSave && <div>Loading...</div>}
                                    {errorSave && <div>{errorSave}</div>}
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="review">Review</label>
                                    <textarea onChange={(e) => setReview(e.target.value)} className="form__input" id="review" value={review} required="required" />
                                </div>
                                <div className="form__group ma-bt-md">
                                    <label className="form__label" htmlFor="rating">Rating</label>
                                    <input onChange={(e) => setRating(e.target.value)} className="form__input" id="rating" type="text" value={rating} required="required" />
                                </div>
                                <div className="form__group right">
                                    <button type="submit" className="btn btn--green">{id ? "Cập nhật" : "Thêm"}</button>
                                    <button type="button" onClick={() => setModalVisible(false)} className="btn btn--green">Huỷ</button>
                                </div>
                            </form>
                            <div className="line">&nbsp;</div>
                            </>
                        )}
                    </div>
                    
                    <div className="user-view__form-container2">
                    {loading ? <div>Loading...</div> : null}
                    {error ? <div>{error} </div> : null}
                    <table className="form form-user-data table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
                            <thead className="thead-light">
                                <tr role="row">
                                    <td width="100px">Name Tour</td>
                                    <td width="80px">Thumbnail</td>
                                    <td width="200px">Review</td>
                                    <td width="60px">Rating</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {reviews ? reviews.map((review, i) => {
                                    return (
                                        <tr role="row" key={i+1}>
                                            <td>{review.tour.name}</td>
                                            <td>
                                                <img
                                                    className={"form__user-photo2"}
                                                    src={`/img/tours/${review.tour.imageCover}`}
                                                    alt={`The Park Camper Tour ${i+1}`}
                                                />
                                            </td>
                                            <td>{review.review}</td>
                                            <td>{review.rating}</td>
                                            <td>
                                                <button className="btn--primary" onClick={() => openModal(review)}>
                                                    <i className="material-icons">edit</i>
                                                </button>
                                                <button className="btn--danger" onClick={() => deleteConfirmed(review._id)}>
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

export default MyReviewScreen
