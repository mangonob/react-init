import { createContext } from 'react';
import { Observable } from 'src/foundation/observer';
import { SubwayItemEvent } from './model';

export const SubwayFlowContext = createContext<Observable<SubwayItemEvent>>(
  void 0 as unknown as Observable<SubwayItemEvent>
);

export const SubwayFlowProvider = SubwayFlowContext.Provider;
