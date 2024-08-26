import { FC, FormEvent, useState } from 'react';
import { api } from '../../../../api';
import { IChat } from '../../../../interfaces/chat.interface';
import Input from '../../Input';

interface AddChatModalProps {
  open: boolean;
  initChats: IChat[];
  setChatList: (chats: IChat[]) => void;
  setModalOpen: (isOpen: boolean) => void;
}

const AddChatModal: FC<AddChatModalProps> = ({
  open,
  initChats,
  setChatList,
  setModalOpen,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCreateChat = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }
    formData.append('firstName', firstName.trim());
    formData.append('lastName', lastName.trim());

    api.post('/chats', formData).then(res => {
      if (res.status !== 200) {
        return;
      }
      setChatList([...initChats, res.data]);
    });
  };

  return (
    <dialog open={open} onClose={() => setModalOpen(false)}>
      <h2>Add chat</h2>
      <form onSubmit={handleCreateChat}>
        <Input
          type="text"
          id="name"
          value={firstName}
          placeholder="First Name"
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          id="name"
          value={lastName}
          placeholder="Last Name"
          onChange={e => setLastName(e.target.value)}
        />
        <div className="btn_container">
          <button type="submit">Create</button>
          <button type="button" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default AddChatModal;
