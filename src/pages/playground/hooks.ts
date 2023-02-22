import { useEffect, useState } from 'react';
import { EventInfoMap, NativeBindings } from 'runner-bridge';

export function useEventInfo<K extends keyof EventInfoMap>(
  type: K
): EventInfoMap[K] | undefined {
  const [payload, setPayload] = useState<EventInfoMap[K]>();

  useEffect(() => {
    return NativeBindings.instance().listenEvent<K>((event) => {
      if (event.type === type) {
        setPayload(event.payload);
      }
    }).cancel;
  }, [type]);

  return payload;
}
