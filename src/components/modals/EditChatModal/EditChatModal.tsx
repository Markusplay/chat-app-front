import { FormEvent, useState } from 'react';
import { api } from '../../../../api';
import { IChat } from '../../../../interfaces/chat.interface';
import Input from '../../Input';

interface EditChatModalProps {
  initChats: IChat[];
  chat: IChat;
  open: boolean;
  setChatList: (chats: IChat[]) => void;
  setModalOpen: (isOpen: boolean) => void;
}

const EditChatModal = ({
  initChats,
  chat,
  open,
  setChatList,
  setModalOpen,
}: EditChatModalProps) => {
  const [firstName, setFirstName] = useState(chat.firstName);
  const [lastName, setLastName] = useState(chat.lastName);

  const handleUpdateChat = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }
    api
      .put(`/chats/${chat._id}`, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })
      .then(res => {
        setChatList(initChats.map(c => (c._id === chat._id ? res.data : c)));
      });
  };

  return (
    <dialog open={open} onClose={() => setModalOpen(false)}>
      <h2>Edit Chat</h2>
      <form onSubmit={handleUpdateChat}>
        <Input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <div className="btn_container">
          <button type="submit">Update</button>
          <button type="button" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default EditChatModal;
