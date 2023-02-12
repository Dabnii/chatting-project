import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../pages/Firebase';
import { AuthContext } from '../../context/AuthContext';
import './Nav.scss';

function Nav() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const goToMain = () => navigate('/');

  const logout = () => {
    try {
      auth.signOut();
      goToMain();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className='nav'>
      <Link to='/'>
        <img src='/images/logo.png' alt='logo' />
      </Link>
      <ol>
        {currentUser ? (
          <>
            <li>
              <img
                className='userImg'
                src={currentUser.photoURL}
                alt='user profile'
              />
              {currentUser.displayName} 님
            </li>
            <li>
              <button className='logout' onClick={logout}>
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>로그인</Link>
            </li>
            <li>
              <Link to='/signup'>회원가입</Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

export default Nav;
