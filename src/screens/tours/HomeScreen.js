import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listTours } from '../../actions/tourActions';
import Pagination from '../../components/Pagination';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function HomeScreen(props) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [difficulty, setDifficulty] = useState('');
  //const difficulty = props.match.params.difficulty ? props.match.params.difficulty : '';

  const tourList = useSelector(state => state.tourList);
  const { tours, loading, error } = tourList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTours());
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
    dispatch(listTours(difficulty, search, sort))
  }

  const sortHandler = (e) => {
    setSort(e.target.value);
    dispatch(listTours(difficulty, search, sort))
  }
  
  const fillDifficultyHandler = (e) => {
    setDifficulty(e.target.value);
    
    // console.log(difficulty);
    //dispatch(listTours(difficulty, search, sort))
  }

  return <>
  <Header/>
    {search &&
      <h2>{search}</h2>}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearch(e.target.value)} placeholder="Nhập tên để tìm kiếm..." />
          <button type="submit">Search</button>
        </form>
      </li>
      <li>
        <form onSubmit={submitHandler}>
          <select name="fill" onChange={fillDifficultyHandler}>
            <option value="">Loại tuor</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
          <button type="submit">Lọc</button>
        </form>
      </li>
      <li>
        <form onSubmit={submitHandler}>
          <select name="fill" onChange={fillDifficultyHandler}>
            <option value="">Mới nhất</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
          <button type="submit">Sort</button>
        </form>
      </li>
    </ul>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
      <main className="main">
        <div className="card-container">
            {currentTours.map((tour, i) => {
                const date = new Date(tour.startDates[0]).toDateString();
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
                            <span>{tour.name}</span>
                            </h3>
                        </div>

                        <div className="card__details">
                            {/* <h4 className="card__sub-heading">{`${tour.difficulty} ${tour.duration}-day tour`}</h4> */}
                            <h4 className="card__sub-heading">{`${tour.duration}-day tour`}</h4>
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
      </main>
    }
    <Pagination toursPerPage={toursPerPage} totalTours={tours.length} paginate={paginate} />
    <Footer/>
  </>

}
export default HomeScreen;