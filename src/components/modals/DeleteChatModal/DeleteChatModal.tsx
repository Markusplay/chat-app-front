import { FC } from 'react';
import { api } from '../../../../api';
import { IChat } from '../../../../interfaces/chat.interface';

interface DeleteChatModalProps {
  initChats: IChat[];
  selectedChatId: string;
  open: boolean;
  setChatList: (chats: IChat[]) => void;
  setModalOpen: (isOpen: boolean) => void;
}

const DeleteChatModal: FC<DeleteChatModalProps> = ({
  initChats,
  selectedChatId,
  open,
  setChatList,
  setModalOpen,
}) => {
  const handleDeleteChat = () => {
    api.delete(`/chats/${selectedChatId}`).then(res => {
      if (res.status !== 200) {
        return;
      }
      setChatList(initChats.filter(chat => chat._id !== selectedChatId));
    });
  };

  return (
    <dialog open={open} onClose={() => setModalOpen(false)}>
      <h2>Are you sure you want to remove this chat?</h2>
      <form onSubmit={handleDeleteChat}>
        <div className="btn_container">
          <button
            type="submit"
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
          <button type="button" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteChatModal;
