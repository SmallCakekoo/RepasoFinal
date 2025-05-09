import { AppDispatcher } from "./Dispatcher";
import { State } from "./Store";

export const LikeActionTypes = {
  TOGGLE_LIKE: "TOGGLE_LIKE",
};

export const StoreActionTypes = {
  LOAD_STATE: "LOAD_STATE",
};

export const LikeActions = {
  toggleLike: (agentId: string) => {
    AppDispatcher.dispatch({
      type: LikeActionTypes.TOGGLE_LIKE,
      payload: agentId,
    });
  },
};

export const StoreActions = {
  loadState: (state: State) => {
    AppDispatcher.dispatch({
      type: StoreActionTypes.LOAD_STATE,
      payload: state,
    });
  },
};
