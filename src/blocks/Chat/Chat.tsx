import { useState, useEffect, useMemo } from 'react';
import { IMessage } from '../../../interfaces/message.interface';
import Input from '../../components/Input/Input';
import Avatar from '../../components/Avatar/Avatar';
import { store } from '../../../zustand/store';
import { useStore } from 'zustand';
import { api } from '../../../api';
import { IChat } from '../../../interfaces/chat.interface';
import { formatDate } from '../../../helpers/formatDate';
import styles from './Chat.module.css';
import io from 'socket.io-client';
import { useToastStore } from '../../../zustand/toastStore';

const socket = io('http://localhost:8080');

const Chat = () => {
  const { currentChat: chatId } = useStore(store);

  const { addToast } = useToastStore();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatInfo, setChatInfo] = useState<IChat>();

  useEffect(() => {
    api.get(`/chats/${chatId}`).then(res => {
      setChatInfo(res.data);
    });
  }, [chatId]);

  useEffect(() => {
    api.get(`/chats/${chatId}/messages`).then(res => {
      setMessages(res.data);
    });

    const handleReceiveMessage = (data: {
      chatId: string;
      message: IMessage;
    }) => {
      if (data.chatId === chatId) {
        if (data.message.sender === 'bot') {
          addToast('New message received', 'info');
        }
        setMessages(prevMessages => [...prevMessages, data.message]);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [chatId, addToast]);

  const handleSendMessage = () => {
    const message = newMessage;

    socket.emit('sendMessage', { chatId, message });
    setNewMessage('');
  };

  const sortedMessages = useMemo(() => {
    return messages.slice().sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [messages]);

  return (
    <>
      <section className={styles.chatWrapper}>
        <div
          className={styles.userWrapper}
          style={{ display: 'flex', gap: '10px' }}
        >
          <Avatar src="" alt="Avatar" />
          <p>
            {chatInfo?.firstName} {chatInfo?.lastName}
          </p>
        </div>
        <br />
        <section className={styles.chat}>
          {sortedMessages.map(message => {
            const date = formatDate(message.createdAt);
            return (
              <div
                key={message._id}
                className={styles.messageWrapper}
                style={{
                  justifyContent: message.sender === 'bot' ? 'start' : 'end',
                }}
              >
                {message.sender === 'bot' && <Avatar src="" alt="Avatar" />}
                <div className={styles.message}>
                  <p
                    style={{
                      backgroundColor:
                        message.sender === 'bot' ? '#464491' : '#d7d7d7',
                      color: message.sender === 'bot' ? 'white' : 'black',
                    }}
                  >
                    {message.message}
                  </p>
                  <p
                    style={{
                      display: 'flex',
                      justifyContent:
                        message.sender === 'bot' ? 'start' : 'end',
                    }}
                  >
                    {date}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
        <div
          style={{
            width: '100%',
            alignSelf: 'end',
            borderTop: '1px solid black',
            padding: '2rem',
          }}
        >
          <Input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            rightIcon={
              <img
                onClick={handleSendMessage}
                style={{ cursor: 'pointer', width: '15px', height: '15px' }}
                src="send.svg"
              />
            }
          />
        </div>
      </section>
    </>
  );
};

export default Chat;
