import { doc, onSnapshot } from 'firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { db } from '../pages/Firebase';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [senderInfo, setSenderInfo] = useState({});
  const [matchedMessages, setMatchedMessages] = useState({});

  const { currentUser } = useContext(AuthContext);

  const currentUserUid = currentUser?.uid;
  const userUid = senderInfo?.uid;
  const userDisplayName = senderInfo?.displayName;
  const combinedId = currentUserUid + userUid;

  const getSenderId = data => {
    setSenderInfo(data);
  };

  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

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

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{
        getSenderId,
        senderInfo,
        combinedId,
        currentUserUid,
        userDisplayName,
        matchedMessages,
        data: state,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
