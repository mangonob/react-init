export type ChatMessage = (
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'image';
      url: string;
    }
) & {
  sender: string;
};
