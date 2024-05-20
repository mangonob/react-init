export type ChatMessage = (
  | {
      type: 'text';
      content?: string;
    }
  | {
      type: 'image';
      url?: string;
    }
) & {
  sender: string;
  id: string;
  createdAt?: number;
};

export const ChatMessageTypes = ['text', 'image'] as const;
export type ChatMessageType = (typeof ChatMessageTypes)[number];

export function chatMessageTypeDescription(type: ChatMessageType): string {
  switch (type) {
    case 'image':
      return '图片';
    case 'text':
      return '文本';
  }
}
