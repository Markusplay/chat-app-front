import {IMessage} from "./message.interface.ts";

export interface IChat {
  _id: string;
  firstName: string;
  messages: IMessage[];
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
