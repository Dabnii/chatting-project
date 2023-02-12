import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from 'firebase/storage';
import { auth, db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import './Signup.scss';

function Signup() {
  const [account, setAccount] = useState({
    displayName: '',
    email: '',
    gender: '',
    password: '',
    passwordCheck: '',
  });
  const [image, setImage] = useState(null);
  const [displayUserImg, setDisplayUserImg] = useState(null);

  const [isValid, setIsValid] = useState({
    nameValid: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const { email, password, displayName } = account;
  const { passwordConfirm } = isValid;
  const storage = getStorage();

  const navigate = useNavigate();
  const goToMain = () => navigate('/');

  const firstNameRex = /^[A-Za-z가-하]{2,}/;
  const emailRex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const passwordRex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$*])[a-zA-Z\d!@#$*]{8,}$/;

  const handleUserInfo = e => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = e => {
    setImage(e.target.files[0]);
    setDisplayUserImg(URL.createObjectURL(e.target.files[0]));
  };

  const resetFile = e => {
    setImage('');
    setDisplayUserImg('');
  };

  const signup = async e => {
    e.preventDefault();
    const file = image;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef) //
          .then(async downloadURL => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'userChats', res.user.uid), {});
              goToMain();
            } catch (err) {
              console.log(err);
            }
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signUp'>
      <div className='signUpContainer'>
        <form onSubmit={signup}>
          <div className='name'>
            <p className='signupTitle'>SIGNUP</p>
            <div className='avatar'>
              {displayUserImg ? (
                <>
                  <label htmlFor='file' onClick={resetFile}>
                    <img src={displayUserImg} alt='selected' />
                    <p>Change new image</p>
                  </label>
                </>
              ) : (
                <>
                  <input required type='file' id='file' onChange={handleFile} />
                  <label htmlFor='file'>
                    <img src='images/upload.png' alt='' />
                    <p>Upload profile picture</p>
                  </label>
                </>
              )}
              {image === null && (
                <div className='warning'>* 프로필 사진을 등록해주세요</div>
              )}
            </div>
            <p className='inputInfo'>Name</p>
            <input
              required
              type='text'
              name='displayName'
              className='displayName'
              placeholder='김익명'
              value={account.displayName}
              onChange={handleUserInfo}
              onBlur={() =>
                setIsValid({
                  ...isValid,
                  nameValid: firstNameRex.test(account.displayName) && true,
                })
              }
            ></input>
          </div>
          <div className='emailWrapper'>
            <p className='inputInfo'>e-mail</p>
            <input
              required
              type='text'
              name='email'
              className='email'
              placeholder='sample@email.com'
              onChange={handleUserInfo}
              valuetype={'email'}
              onBlur={() =>
                setIsValid({
                  ...isValid,
                  email: emailRex.test(account.email) && true,
                })
              }
            ></input>
            {email.includes('@') ? null : (
              <p className='warning'>* 올바른 이메일 형식을 입력해주세요</p>
            )}
          </div>
          <div className='passwordInput'>
            <p className='inputInfo'>Password</p>
            <input
              required
              type='password'
              name='password'
              className='password'
              placeholder='8자 이상, 대소문자+숫자+특수문자(@#$*) 포함 '
              onChange={handleUserInfo}
              onBlur={() =>
                setIsValid({
                  ...isValid,
                  password: passwordRex.test(account.password) && true,
                })
              }
            ></input>

            <input
              required
              type='password'
              name='passwordCheck'
              className='password'
              placeholder='8자 이상, 대소문자+숫자+특수문자(@#$*) 포함 '
              onChange={handleUserInfo}
              onKeyUp={() =>
                setIsValid({
                  ...isValid,
                  passwordConfirm:
                    passwordRex.test(account.passwordCheck) && true,
                })
              }
            ></input>
            {account.password === account.passwordCheck ? null : (
              <p className='warning'>"비밀번호가 일치하지 않습니다!"</p>
            )}
          </div>

          <button
            type='submit'
            className='submit'
            disabled={!passwordConfirm ? true : false}
          >
            회원가입하기
          </button>

          <div>
            <Link to='/login' className='link'>
              <span> 이미 회원이신가요? | 로그인하기</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
