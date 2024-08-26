import { FC, useEffect, useState } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Input from '../../components/Input/Input';
import styles from './Sidebar.module.css';
import { api } from '../../../api';
import { IChat } from '../../../interfaces/chat.interface';
import EditChatModal from '../../components/modals/EditChatModal';
import AddChatModal from '../../components//modals/AddChatModal';
import { useStore } from 'zustand';
import { store } from '../../../zustand/store';
import DeleteChatModal from '../../components/modals/DeleteChatModal/DeleteChatModal';

const Sidebar: FC = () => {
  const { setChat } = useStore(store);

  const [searchChat, setSearchChat] = useState('');
  const [chats, setChats] = useState<IChat[]>([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    api.get('/chats').then(res => {
      setChats(res.data);
    });
  }, []);

  const filteredChats = chats.filter(chat => {
    return (
      chat.firstName.toLowerCase().includes(searchChat.toLowerCase()) ||
      chat.lastName.toLowerCase().includes(searchChat.toLowerCase())
    );
  });

  const handleLogout = () => {
    api.post('/logout').then(res => {
      console.log(res.data);
    });
  };

  const handleDeleteChat = (id: string) => {
    setSelectedChatId(id);
    setDeleteModalOpen(true);
  };

  const handleEditChat = (id: string) => {
    setSelectedChatId(id);
    setEditModalOpen(true);
  };

  return (
    <>
      {addModalOpen && (
        <AddChatModal
          setChatList={setChats}
          initChats={chats}
          open={addModalOpen}
          setModalOpen={setAddModalOpen}
        />
      )}
      <div className={styles.sidebar}>
        <div className={styles.head}>
          <Avatar src="" alt="avatar" />
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className={styles.search_input}>
          <Input
            placeholder="Search or start a new chat"
            value={searchChat}
            onChange={e => setSearchChat(e.target.value)}
            leftIcon={<img style={{ width: '15px' }} src="search.svg" />}
          />
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '20px',
          }}
        >
          <h2>Chats</h2>
          <button onClick={() => setAddModalOpen(true)}>Add Chat</button>
        </div>
        <br />
        {filteredChats.map(chat => {
          const date = new Date(chat.createdAt);

          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return (
            <div
              className={styles.chatItem}
              onClick={() => setChat(chat._id)}
              key={chat._id}
            >
              <Avatar src="" alt="avatar" />
              <div className="info">
                <p>
                  {chat.firstName} {chat.lastName}
                </p>
                <p>{chat.messages[chat.messages.length -1].message}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 'auto',
                }}
              >
                <p>{formattedDate}</p>
                <div className={styles.btn_container}>
                  <button onClick={() => handleEditChat(chat._id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteChat(chat._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {editModalOpen && selectedChatId && (
          <EditChatModal
            setChatList={setChats}
            initChats={chats}
            chat={chats.find(chat => chat._id === selectedChatId)!}
            open={editModalOpen}
            setModalOpen={setEditModalOpen}
          />
        )}

        {deleteModalOpen && selectedChatId && (
          <DeleteChatModal
            open={deleteModalOpen}
            setModalOpen={setDeleteModalOpen}
            setChatList={setChats}
            initChats={chats}
            selectedChatId={selectedChatId}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
