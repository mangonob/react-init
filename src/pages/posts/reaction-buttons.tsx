import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { Post, Reaction, reactionPost } from './post-slice';

const reactionEmojis: [Reaction, string][] = [
  ['thumbsUp', '👍'],
  ['hooray', '🎉'],
  ['heart', '❤️'],
  ['rocket', '🚀'],
  ['eyes', '👀'],
];

export default function ReactionButtons(props: { postId: string }) {
  const { postId } = props;

  const post = useSelector<RootState, Post | undefined>((s) =>
    s.posts.find((p) => p.id === postId)
  );
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
