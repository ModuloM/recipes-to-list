import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from 'redux';
import type { State } from './State.type';

export type Store = ReduxStore<State, A>;

export type Dispatch =
  & ReduxDispatch<A>
