import { Button } from 'antd';
import React, { useState } from 'react';

export default function Playground() {
  const [events, setEvents] = useState<string[]>([]);

  return (
    <div>
      <h1>Playground</h1>
      <Button
        onClick={async () => {
          const result = await window.runnerPush<string>('/posts');
          if (result) {
            setEvents([result, ...events]);
          } else {
            setEvents(['pop with out data', ...events]);
          }
        }}
      >
        To
      </Button>
      {events.length > 0 && <h2>Events:</h2>}
      <ul>
        {events.map((e, index) => {
          return <li key={index}>{e}</li>;
        })}
      </ul>
    </div>
  );
}
