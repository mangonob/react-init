export interface ChatUserModel {
  userId: string;
  name?: string;
  avatar?: string;
}

export const SELF_USER_ID = '__SELF__';
