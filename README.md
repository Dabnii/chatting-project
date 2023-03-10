# <p align="center">๐๏ธ Private Counselling Chat project ๐ญ</p>

<p align="center">๐ 2023.02.8 ~ </p>

### โ๏ธ ์ฌ์ฉ ๊ธฐ์ 

```
React, Firebase, git, SASS, Figma
```

### โ๏ธ ๊ธฐ๋ฅ ๊ตฌํ ๋ชฉ๋ก

- [x] ๐โโ๏ธ ํ์๊ฐ์
- [x] ๐ ๋ก๊ทธ์ธ
- [x] ๐ ์ ์ ๋ชฉ๋ก
- [x] ๐ฑ 1:1 ์ฑํ
- [ ] ๐ฏโโ๏ธ ๊ทธ๋ฃน ์ฑํ

### โจ ํ ๊ตฌ์ฑ์

- ๊ฐ์ธ ํ๋ก์ ํธ

---

### ๐ณ ๋๋ฅผ ์ฑ์ฅํ๊ฒ ํ ์ฝ๋

- `useContext`
- useContext๋ฅผ ํ์ฉํ์ฌ ๋ค๋น๊ฒ์ด์, ๋ฉ์ธ, ๋ก๊ทธ์ธ ๋ฑ ๋ก๊ทธ์ธ ์ ๋ฌด๋ฅผ ํ์ธ

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

- `๋ก๊ทธ์ธํ ์ ์  uid + ๋ํ์๋ uid` ์ผ์นํ๋ ํ์ผ ๋ถ๋ฌ์ค๊ธฐ

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

- `where(db, chats, == combinedId)`๋ก ์ฟผ๋ฆฌ๋ฅผ `get`์๋ ์คํจ
- `onSnapshot`์ผ๋ก ํด๊ฒฐ
- ํ์ด์ด๋ฒ ์ด์ค ๋ฌธ๋ฒ์ด ์ต์ํ์ง ์์, ๋ง์ด ํค๋งจ ํํธ๋ค. ๐ฅฒ
