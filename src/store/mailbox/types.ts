import createActionTypes from "../../utils/createActionTypes";

// Redux Action Types
export const [GET_MAILBOXES, GET_MAILBOXES_SUCCESS, GET_MAILBOXES_FAILURE] =
  createActionTypes("mailbox/get_mailboxes");
export const [GET_MAIL, GET_MAIL_SUCCESS, GET_MAIL_FAILURE] =
  createActionTypes("mailbox/get_mail");
export const [POST_MAILBOX, POST_MAILBOX_SUCCESS, POST_MAILBOX_FAILURE] =
  createActionTypes("mailbox/post_mailbox");

export type GetMailBoxQuery = {
  id: string;
  query: {
    page?: number;
  };
};

// Store Types
export type Track = {
  trackId: string;
  trackName: string;
  artistIds: string;
  artistNames: string;
  image: string;
  duration: number;
};

export type Coord = {
  x: number;
  y: number;
};

export type Mail = {
  _id: string;
  mailBoxId: string;
  tracks: Track[];
  visualImage: string;
  ecv: number;
  createdAt: string;
};

export type MailBox = {
  _id: string;
  title: string;
  description: string;
  imagePath?: string;
  tracks: Track[];
  point?: Coord;
  createdAt: string;
  updatedAt: string;
};
