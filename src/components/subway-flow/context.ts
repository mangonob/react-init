import { createContext } from 'react';
import { Observable } from 'src/foundation/observer';
import { SubwayItemDimensionEvent } from './model';

const SubwayFlowContext = createContext<Observable<SubwayItemDimensionEvent>>(
  void 0 as unknown as Observable<SubwayItemDimensionEvent>
);

export const SubwayFlowProvider = SubwayFlowContext.Provider;
