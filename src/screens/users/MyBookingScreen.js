import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listMyBooks, createBooking } from '../../actions/bookActions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../layouts/NavBar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';


function MyBookingScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [qty1, setQty1] = useState('');
    const [price1, setPrice1] = useState('');
    const [paid1, setPaid1] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const myBookList = useSelector(state => state.myBookList);
    const { loading, books, error, paid } = myBookList;

    const bookCreate = useSelector(state => state.bookCreate);
    const { success } = bookCreate;

    const tour = props.match.params.id;
    // const qty = props.location.search.split("?")[1].split("&");
    const qty = props.location.search ? Number(props.location.search.split("?")[1].split("&")[2]) : 1;
    const price = props.location.search ? Number(props.location.search.split("?")[1].split("&")[1]) : 1;
    const user = props.location.search ? props.location.search.split("?")[1].split("&")[0] : 1;
    console.log(user);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (tour) {
            dispatch(createBooking({ tour, user, price, qty}));
        }
        dispatch(listMyBooks());
        return () => {

        };
    }, [success]);

    const openModal = (book) => {
        setModalVisible(true);
        setName(book.tour.name);
        setImageCover(book.tour.imageCover);
        setQty1(book.qty);
        setPrice1(book.price);
        setPaid1(book.paid);
        setCreatedAt(book.createdAt);
    }

    const imgStyle = {
        height: '25rem',
        width: '25rem'
    }

    return (<div>
        <Header/>
        <main className="main">
            <div className="user-view">
                <NavBar history={props.history}/>
                <div className="user-view__content">
                    <div className="user-view__form-container2">
                        <h2 className="heading-secondary ma-bt-md">Your bookings</h2>
                        {modalVisible && (
                            <>
                            <form className="form form-user-data" >
                                <div className="form__group">
                                    <label className="form__label" htmlFor="name">Tên tour</label>
                                    <input className="form__input" id="name" type="text" value={name} disabled/>
                                </div>
                                <div className="form__group ma-bt-md">
                                    <label className="form__label" htmlFor="imageCover">Ảnh</label>
                                    <div className="field__wrap">
                                    <img 
                                        src={`http://localhost:5000/img/tours/${imageCover}`}
                                        id="outputPhoto" alt='photo22' style={ imgStyle }
                                    />
                                    </div> 
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="price1">Giá</label>
                                    <input className="form__input" id="price1" type="text" value={price1} disabled/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="qty1">Số lượng</label>
                                    <input className="form__input" id="qty1" type="text" value={qty1} disabled/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" >Thành tiền</label>
                                    <input className="form__input" type="text" value={qty1 * price1} disabled/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" htmlFor="paid1">Trạng thái</label>
                                    <input className="form__input" id="paid1" type="text" value={paid1 ? 'Thành công' : 'Chờ xác nhận'} disabled/>
                                </div>
                                <div className="form__group">
                                    <label className="form__label" >Ngày đặt</label>
                                    <input className="form__input" type="text" value={createdAt} disabled/>
                                </div>
                                <div className="form__group right">
                                    <button type="button" onClick={() => setModalVisible(false)} className="btn btn--primary">Quay lại</button>
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
                                    <td width="150px">Tên tour</td>
                                    <td width="100px">Ảnh đại diện</td>
                                    <td width="60px">Loại tuor</td>
                                    <td width="100px">Ngày khởi hành </td>
                                    <td width="80px">Trạng thái</td>
                                    <td>Hành động</td>
                                </tr>
                            </thead>
                            <tbody>
                                {books ? books.map((book, i) => {
                                    const date = new Date(book.tour.startDates[0]).toDateString();
                                    return (
                                        <tr role="row" key={i+1}>
                                            <td>{book.tour.name}</td>
                                            <Link to={"/tour/" + book.tour.slug}>
                                            <td>
                                                <img
                                                    className={"form__user-photo2"}
                                                    src={`http://localhost:5000/img/tours/${book.tour.imageCover}`}
                                                    alt={`The Park Camper Tour ${i+1}`}
                                                />
                                            </td>
                                            </Link>
                                            <td>{book.tour.category === "domestic" ? "Tour trong nước" : "Tour ngoài nước"}</td>
                                            <td>{date}</td>
                                            <td>{paid[i] ? `Thành công` : `Chờ xác nhận`}</td>
                                            <td>
                                                
                                                <button className="btn--primary" onClick={() => openModal(book)}>
                                                    Xem chi tiet
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
        {/* {success && alert("book thanh cong")} */}
    </div>
    )
}

export default MyBookingScreen;

