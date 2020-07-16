import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailTour, tourBooked } from '../../actions/tourActions';
import { bookTour } from '../../actions/bookActions';
import { displayMap } from '../../functions/mapbox';
import { saveReview } from '../../actions/reviewActions';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function DetailTourScreen(props) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    // const [qty, setQty] = useState(1);

    const tourDetail = useSelector(state => state.tourDetail);
    const { tour, loading, error, guides, images, reviews, locations, date } = tourDetail;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const tourBook = useSelector(state => state.tourBooked);
    const { book } = tourBook;
    
    const reviewSave = useSelector(state => state.reviewSave);
    const { success: successSave } = reviewSave;

    const dispatch = useDispatch();

    const dateString = new Date(date).toDateString();

    //kiem tra da book chua
    let button;
    const participant = tour ? tour.participant : 0;
    const maxGroupSize = tour ? tour.maxGroupSize : 0;
    const len = book ? book.length : 0;
    const count = maxGroupSize ? maxGroupSize - participant : 0;
    let price = tour ? tour.price : 0;
    price = price ? price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : 0;
    const id = tour ? tour._id : '';
    console.log(id);

    // console.log(qty);
    if (!userInfo) {
        button = <Link className="btn btn--green span-all-rows" to="/login">Log in to book tour</Link>
    } else if (participant >= maxGroupSize) {
        button = <Link className="btn btn--green span-all-rows" to="#">Max</Link>
    } else if (len === 0) {
        button = <>
        <button className="btn btn--green span-all-rows" id="book-tour">Book tour now!</button>
        <select className="form-control" id="qty">
          {[...Array(count).keys()].map(x =>
            <option key={x + 1} value={x + 1}>{x + 1} người</option>
          )}
        </select>
        </>
    } else {
        button = <Link className="btn btn--green span-all-rows" to="#">Booked!</Link>
    }
    useEffect(() => {
      dispatch(detailTour(props.match.params.slug));
      dispatch(tourBooked(props.match.params.slug));
      return () => {
      //
      };
    }, [props.match.params.slug, successSave]);

    const mapBox = document.getElementById('map');
    if (mapBox) {
        //const locations = JSON.parse(mapBox.dataset.locations);
        if (locations) {
            displayMap(locations);
        }
    }

    const bookBtn = document.getElementById('book-tour');
    if (bookBtn) {
      bookBtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...';
        dispatch(bookTour(id, document.getElementById('qty').value));
      });
    }

    // console.log(guides);
    const tourGuide = (guide, i) => {
        return (
        <div className="overview-box__detail" key={`${i}`}>
        <img
            src={`/img/users/${guide.photo}`}
            alt={`${guide.name}`}
            className="overview-box__img"
        />
        <span className="overview-box__label">{guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}</span>
        <span className="overview-box__text">{guide.name}</span>
        </div>
    )}
    
    const submitHandle = (e) => {
      e.preventDefault();
      dispatch(saveReview({
       review, rating
      }, id));
    }
    const start = tour ? tour.startLocation : '';
    const des = start ? start.description : '';
    // console.log(des);
    return (
        <>
        <Header/>
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">
        &nbsp;
        </div>
        <img className="header__hero-img" src={tour ? `http://localhost:5000/img/tours/${tour.imageCover}` : ''} alt={tour ? `${tour.name}` : ''}></img>
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{tour ? `${tour.name} tour` : ""}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref={"/img/icons.svg#icon-clock"}></use>
            </svg>
            <span className="heading-box__text">{tour ? `${tour.duration} ngày` : ''}</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref={"/img/icons.svg#icon-map-pin"}></use>
            </svg>
            <span className="heading-box__text">{des}</span>
          </div>
        </div>
      </div>
    </section >

    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Tổng quan</h2>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`/img/icons.svg#icon-calendar`}></use>
              </svg>
              <span className="overview-box__label">Ngày xuất phát</span>
              <span className="overview-box__text">{dateString}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`/img/icons.svg#icon-trending-up`}></use>
              </svg>
              <span className="overview-box__label">Loại tour</span>
              {/* <span className="overview-box__text">{tour ? tour.difficulty : ""}</span> */}
              <span className="overview-box__text">{tour ? tour.category === "domestic" ? `Trong nước` : `Ngoài nước` : ''}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`/img/icons.svg#icon-user`}></use>
              </svg>
              <span className="overview-box__label">Số người tham gia</span>
              <span className="overview-box__text">{tour ? `${tour.participant} / ${tour.maxGroupSize} người` : ""}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`/img/icons.svg#icon-star`}></use>
              </svg>
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">{tour ? `${tour.ratingsAverage} / 5` : ""}</span>
            </div>
            <div className="overview-box__detail">
              <svg className="overview-box__icon">
                <use xlinkHref={`/img/icons.svg#icon-credit-card`}></use>
              </svg>
              <span className="overview-box__label">Giá</span>
              <span className="overview-box__text">
                {price}
              </span>
            </div>
          </div>

          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Hướng dẫn viên</h2>
            {guides ? guides.map((guide, i) => {
              return tourGuide(guide, i);
            }) : ''}
          </div>
        </div>
      </div>

      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">{tour ? `Giới thiệu về ${tour.name} tour` : ''}</h2>
        {tour ? `${tour.description}`.split('\n').map((p, i) => {
          return (
            <p className="description__text" key={i}>
              {p}
            </p>
          )
        }) : ""}
        
      </div>
    </section>

    <section className="section-pictures">
      {images ? images.map((img, i) => {
        return (
          <div className="picture-box" key={i}>
            <img
              className={`picture-box__img picture-box__img--${i+1}`}
              src={`http://localhost:5000/img/tours/${img}`}
              alt={`The Park Camper Tour ${i+1}`}
            />
          </div>
        )
      }) : ''}
      
    </section>
    <section className="section-map">
      <div id="map"></div>
    </section>

    <section className="section-reviews">
      <div className="reviews">
        {reviews ? reviews.map((review, i) => {
          // console.log(review.rating);
          // const rating = review.rating;
          return (
            <div className="reviews__card" key={i}>
              <div className="reviews__avatar">
                <img
                  src={`http://localhost:5000/img/users/${review.user.photo}`}
                  alt={`${review.user.name}`}
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">{review.user.name}</h6>
              </div>
              <p className="reviews__text">
                {review.review}
              </p>
              <div className="reviews__rating">
                {[1, 2, 3, 4, 5].map((star, i) => {
                  return (
                    <svg className={`reviews__star reviews__star--${review.rating >= star ? 'active' : 'inactive'}`} key={i}>
                      <use xlinkHref={`/img/icons.svg#icon-star`}></use>
                    </svg>
                  )
                })}
                
              </div>
            </div>
          )
        }) : ''}
      </div>
    </section>

    {len === 0 ? '' : <section className="section-reviews">
      <div className="reviews">
        <form className="form from-review" onSubmit={submitHandle}>
          <div className="form__group">
            <label className="form__label" htmlFor="review">Review</label>
            <input onChange={(e) => setReview(e.target.value)}  className="form__input" id="review" type="text"  required="required" />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="rating">Rating</label>
            <br/>
            <select className="form__input" name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
               
                <option value='1'>1 sao </option>
                <option value='2'>2 sao</option>
                <option value='3'>3 sao</option>
                <option value='4'>4 sao</option>
                <option value='5'>5 sao</option>
            </select>
          </div>
          <div className="form__group right">
            <button type="submit" className="btn btn-small btn--green">Review</button>
          </div>
        </form>
      </div>
    </section> }
    
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src='/img/logo-white.png' alt="Natours logo" className="" />
        </div>
        <img src={images ? `http://localhost:5000/img/tours/${images[1]}` : ''} alt="Tourpicture" className="cta__img cta__img--1" />
        <img src={images ? `http://localhost:5000/img/tours/${images[2]}` : ''} alt="Tourpicture" className="cta__img cta__img--2" />

        <div className="cta__content">
          <h2 className="heading-secondary">Bạn đang mong đợi gì?</h2>
          <p className="cta__text">
            {tour ? tour.duration : ''} ngày. 1 cuộc phiêu lưu. Ký ức vô tận. Đặt tour ngay hôm nay!
          </p>
          {button}
        </div>
      </div>
    </section>
    <Footer/>
    </>
    )
}
export default DetailTourScreen;