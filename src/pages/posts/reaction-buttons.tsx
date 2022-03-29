import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { usePost } from './hooks';
import { Reaction, reactionPost } from './post-slice';

const reactionEmojis: [Reaction, string][] = [
  ['thumbsUp', '👍'],
  ['hooray', '🎉'],
  ['heart', '❤️'],
  ['rocket', '🚀'],
  ['eyes', '👀'],
];

export default function ReactionButtons(props: { postId: string }) {
  const { postId } = props;

  const post = usePost(postId);
  const dispatch = useDispatch<AppDispatch>();

  return post ? (
    <Button.Group>
      {reactionEmojis.map(([reaction, emoji]) => {
        const count = (post.reactions && post.reactions[reaction]) || 0;
        return (
          <Button
            key={reaction}
            onClick={() => dispatch(reactionPost(reaction, postId))}
          >{`${emoji} ${count}`}</Button>
        );
      })}
    </Button.Group>
  ) : (
    <></>
  );
}
