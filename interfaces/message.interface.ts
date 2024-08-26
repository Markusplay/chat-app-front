export interface IMessage {
  _id: string;
  chatId: string;
  message: string;
  sender: 'user' | 'bot';
  createdAt: Date;
  updatedAt: Date;
}
