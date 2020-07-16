import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listTours, top3Tours } from '../../actions/tourActions';
import Pagination from '../../components/Pagination';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function HomeScreen(props) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  //const difficulty = props.match.params.difficulty ? props.match.params.difficulty : '';

  const tourList = useSelector(state => state.tourList);
  const { tours, loading, error } = tourList;

  const top3Tour = useSelector(state => state.top3Tour);
  const { tours: toursTop3, loading: loadingTop3, error: errorTop3 } = top3Tour;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTours());
    dispatch(top3Tours());

    return () => {
      //
    };
  }, [dispatch]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage] = useState(6);
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listTours(category, search, sort, duration))
  }

  const sortHandler = (e) => {
    setSort(e.target.value);
  }
  
  const fillCategoryHandler = (e) => {
    setCategory(e.target.value);
  }

  const durationHandler = (e) => {
    setDuration(e.target.value);
    //dispatch(listTours(category, search, sort))
  }
    // console.log(search);

  return <>
  <Header/>
    {/* {search &&
      <h2>{search}</h2>} */}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearch(e.target.value)} placeholder="Nhập tên để tìm kiếm..." />
        </form>
      </li>
      <li>
        <form onSubmit={submitHandler}>
          <select name="fill" onChange={fillCategoryHandler}>
            <option value="">Loại tuor</option>
            <option value="domestic">Trong nước</option>
            <option value="foreign">Ngoài nước</option>
          </select>
          {/* <button type="submit">Lọc</button> */}
        </form>
      </li>
      <li>
        <form onSubmit={submitHandler}>
          <select name="fill" onChange={durationHandler}>
            <option value="">Thời gian</option>
            <option value="1">1 ngày</option>
            <option value="2">2 ngày</option>
            <option value="3">3 ngày</option>
            <option value="4">4 ngày</option>
            <option value="5">5 ngày</option>
            <option value="6">6 ngày</option>
            <option value="7">7 ngày</option>
          </select>
          {/* <button type="submit">Lọc</button> */}
        </form>
      </li>
      <li>
        <form onSubmit={submitHandler}>
          <select name="fill" onChange={sortHandler}>
            <option value="">Mới nhất</option>
            <option value="lowest">Thấp tới cao</option>
            <option value="highest">Cao tới thấp</option>
          </select>
          {/* <button type="submit">Sort</button> */}
        </form>
      </li>
      <li>
        <button type="submit" onClick={(e) => submitHandler(e)}>Search</button>
      </li>
    </ul>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
      <main className="main">
        <div className="card-container">
            {currentTours.map((tour, i) => {
                let price = tour ? tour.price : 0;
                price = price ? price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : 0;
                const date = new Date(tour.startDates[0]).toDateString();
                // console.log(tour)
                return (
                    <div className="card" key={i}>
                        <div className="card__header">
                            <div className="card__picture">
                            <div className="card__picture-overlay">&nbsp;</div>
                            <img
                                src={`http://localhost:5000/img/tours/${tour.imageCover}`}
                                alt={tour.name}
                                className="card__picture-img"
                            />
                            </div>

                            <h3 className="heading-tertirary">
                            {/* <span>{tour.name}</span> */}
                            </h3>
                        </div>

                        <div className="card__details">
                            <p className="card__sub-heading1">
                              {tour.name}
                            </p>
                            <h4 className="card__sub-heading">{tour.category === "domestic" ? `Tour trong nước ${tour.duration}-ngày` : `Tour ngoài nước ${tour.duration}-ngày`}</h4>
                            {/* <h4 className="card__sub-heading">{`${tour.duration}-day tour`}</h4> */}
                            
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
                            <span className="card__footer-value">{price}</span>
                            <span className="card__footer-text"> mỗi người</span>
                            </p>
                            <p className="card__ratings">
                            <span className="card__footer-value">{tour.ratingsAverage}</span>
                            <span className="card__footer-text">{` rating (${tour.ratingsQuantity})`}</span>
                            </p>
                            <Link to={`/tour/${tour.slug}`} className="btn btn--green btn--small">Details</Link>
                        </div>
                    </div>
                )
            })}
        </div>
      </main>
    }
    <div style={{ width: '85%', margin: '3rem auto'}} className="pagination">
      <Pagination toursPerPage={toursPerPage} totalTours={tours.length} paginate={paginate} />
    </div>
    <div style={{ width: '85%', margin: '3rem auto', textAlign: 'center' }}>
      <h2>Tours nổi bật</h2>
    </div>
    {loadingTop3 ? <div>Loading...</div> :
      errorTop3 ? <div>{error}</div> :
      <main className="main">
        <div className="card-container">
            {toursTop3.map((tour, i) => {
                let price = tour ? tour.price : 0;
                price = price ? price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) : 0;
                const date = new Date(tour.startDates[0]).toDateString();
                // console.log(tour)
                return (
                    <div className="card" key={i}>
                        <div className="card__header">
                            <div className="card__picture">
                            <div className="card__picture-overlay">&nbsp;</div>
                            <img
                                src={`http://localhost:5000/img/tours/${tour.imageCover}`}
                                alt={tour.name}
                                className="card__picture-img"
                            />
                            </div>

                            <h3 className="heading-tertirary">
                            {/* <span>{tour.name}</span> */}
                            </h3>
                        </div>

                        <div className="card__details">
                            <p className="card__sub-heading1">
                              {tour.name}
                            </p>
                            <h4 className="card__sub-heading">{tour.category === "domestic" ? `Tour trong nước ${tour.duration}-ngày` : `Tour ngoài nước ${tour.duration}-ngày`}</h4>
                            {/* <h4 className="card__sub-heading">{`${tour.duration}-day tour`}</h4> */}
                            
                            
                        </div>

                        <div className="card__footer">
                            <p>
                            <span className="card__footer-value">{price}</span>
                            <span className="card__footer-text"> mỗi người</span>
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
      </main>
    }
    <Footer/>
  </>

}
export default HomeScreen;