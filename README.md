# <p align="center">🛋️ Private Counselling Chat project 💭</p>

<p align="center">📆 2023.02.8 ~ </p>

### ⚒️ 사용 기술

```
React, Firebase, git, SASS, Figma
```

### ⚙️ 기능 구현 목록

- [x] 🙋‍♂️ 회원가입
- [x] 🔐 로그인
- [x] 📑 유저목록
- [x] 📱 1:1 채팅
- [ ] 👯‍♀️ 그룹 채팅

### ✨ 팀 구성원

- 개인 프로젝트

---

### 🌳 나를 성장하게 한 코드

- `useContext`
- useContext를 활용하여 네비게이션, 메인, 로그인 등 로그인 유무를 확인

```javascript
import { createContext, useEffect, useState } from 'react';
import { auth } from '../pages/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

- `로그인한 유저 uid + 대화상대 uid` 일치하는 파일 불러오기

```javascript
useEffect(() => {
  const getMessages = async () => {
    let unsub;

    try {
      unsub = onSnapshot(doc(db, 'chats', combinedId), doc => {
        setMatchedMessages(doc.data());
      });
    } catch (error) {
      console.log('Error fetching messages:', error);
    } finally {
      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  };

  combinedId && getMessages();
}, [combinedId]);
```

- `where(db, chats, == combinedId)`로 쿼리를 `get`시도 실패
- `onSnapshot`으로 해결
- 파이어베이스 문법이 익숙하지 않아, 많이 헤맨 파트다. 🥲
