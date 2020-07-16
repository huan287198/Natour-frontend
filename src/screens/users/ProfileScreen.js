import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { logout, update, updatePassword } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../layouts/NavBar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose new photo');

  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  const submitSetting = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('photo', file);
    dispatch(update(form));
  }
  
  const submitPassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ passwordCurrent, password, passwordConfirm }));
    dispatch(logout());
    props.history.push("/login");
  }

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.data.user.email);
      setName(userInfo.data.user.name);
      setPassword(userInfo.data.user.password);
    }
    return () => {

    };
  }, [success, userInfo])

  return (<div>
      <Header/>
  <main className="main">
  <div className="user-view">
      <NavBar history={props.history}/>
      
      <div className="user-view__content">
          <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
              <form className="form form-user-data" onSubmit={submitSetting}>
                  <div className="form__group">
                      {loading && <div>Loading...</div>}
                      {error && <div>{error}</div>}
                      {success && <div>Profile Saved Successfully.</div>}
                  </div>
                  <div className="form__group">
                      <label className="form__label" htmlFor="name">Name</label>
                      <input onChange={(e) => setName(e.target.value)} className="form__input" id="name" type="text" value={name} required="required" />
                  </div>
                  <div className="form__group ma-bt-md">
                      <label className="form__label" htmlFor="email">Email address</label>
                      <input onChange={(e) => setEmail(e.target.value)} className="form__input" id="email" type="email" value={email} required="required" disabled/>
                  </div>
                  <div className="form__group form__photo-upload">
                      <img
                          src={`http://localhost:5000/img/users/${userInfo.data.user.photo}`}
                          alt='Userphoto'
                          className="form__user-photo"
                          id="output"
                      />
                      <input onChange={onChange} className="form__upload" id="photo" type="file" name="photo" accept='image/*' />
                      <label htmlFor="photo">{fileName}</label>
                  </div>
                  <div className="form__group right">
                      <button className="btn btn-small btn--green" type="submit">Save settings</button>
                  </div>
              </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Password change</h2>
              <form className="form form-user-password" onSubmit={submitPassword}>
                  <div className="form__group ma-bt-md">
                      <label className="form__label" htmlFor="current-password">Current password</label>
                      <input onChange={(e) => setPasswordCurrent(e.target.value)} className="form__input" id="current-password" type="password" placeholder='••••••••' minLength='8' required="required"/>
                  </div>
                  <div className="form__group ma-bt-md">
                      <label className="form__label" htmlFor="new-password">New password</label>
                      <input onChange={(e) => setPassword(e.target.value)} className="form__input" id="new-password" type="password" placeholder='••••••••' minLength='8' required="required"/>
                  </div>
                  <div className="form__group ma-bt-md">
                      <label className="form__label" htmlFor="confirm-password">Confirm password</label>
                      <input onChange={(e) => setPasswordConfirm(e.target.value)} className="form__input" id="confirm-password" type="password" placeholder='••••••••' minLength='8' required="required"  />
                  </div>
                  <div className="form__group right">
                      <button type='submit' className="btn btn-small btn--green btn--save-password">Save password</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</main>
<Footer/>
</div>
)}

export default ProfileScreen;