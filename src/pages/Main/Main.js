import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Main.scss';

function Main() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='main'>
      <div className='mainLeft'>
        <div className='textBox'>
          {currentUser && <p>{currentUser.displayName}님 안녕하세요! 😀</p>}
          <span>건강한 전문가와 함께하는</span>
          <span>건강한 서비스</span>
          <span className='highlight'>​마음연구소가</span>
          <span>함께 만들어나갑니다</span>
        </div>
        {currentUser ? (
          <Link to='/chat'>
            <button className='therapyBtn'>상담하기</button>
          </Link>
        ) : (
          <Link to='/login'>
            <button className='therapyBtn'>상담하기</button>
          </Link>
        )}
      </div>
      <div className='mainRight'></div>
    </div>
  );
}

export default Main;
