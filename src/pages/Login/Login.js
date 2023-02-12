import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import './Login.scss';

function Login() {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });

  const { email, password } = account;
  const navigate = useNavigate();
  const goToMain = () => navigate('/');
  const onChangeAccount = e => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const login = async e => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        goToMain();
      })
      .catch(error => {
        alert('이메일과 비밀번호를 확인해주세요!');
      });
  };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <img src='images/logo.png' alt='logo' />
        <form onSubmit={login}>
          <input
            type='text'
            name='email'
            className='email'
            placeholder='아이디(이메일)을 입력해주세요'
            onChange={onChangeAccount}
          ></input>
          <input
            type='password'
            name='password'
            className='password'
            placeholder='비밀번호'
            onChange={onChangeAccount}
          ></input>
          <button type='submit' className='submit'>
            로그인하기
          </button>
          <Link className='link' to='/signup'>
            <span>회원가입 하기</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
