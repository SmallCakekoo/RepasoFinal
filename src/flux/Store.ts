import { AppDispatcher, Action } from "./Dispatcher";
import { LikeActionTypes, StoreActionTypes } from "./Actions";

export type User = {
  name: string;
  age: number;
};

export type State = {
  count: number;
  user: User | null;
  likedAgents: string[]; // Array de UUIDs de agentes con like
};

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
    count: 0,
    user: null,
    likedAgents: [],
  };
  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
  }

  load() {
    const savedState = localStorage.getItem("appState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        this._myState = {
          ...this._myState,
          ...parsedState,
        };
        this._emitChange();
      } catch (error) {
        console.error("Error loading state:", error);
      }
    }
  }

  getState() {
    return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {
      case LikeActionTypes.TOGGLE_LIKE:
        if (typeof action.payload === "string") {
          const agentId = action.payload;
          const isLiked = this._myState.likedAgents.includes(agentId);
          this._myState = {
            ...this._myState,
            likedAgents: isLiked
              ? this._myState.likedAgents.filter((id) => id !== agentId)
              : [...this._myState.likedAgents, agentId],
          };
        }
        this._emitChange();
        break;
      case StoreActionTypes.LOAD_STATE:
        if (typeof action.payload === "object") {
          this._myState = {
            ...this._myState,
            ...action.payload,
          };
        }
        this._emitChange();
        break;
    }
  }

  private _emitChange(): void {
    const state = this.getState();
    localStorage.setItem("appState", JSON.stringify(state));
    for (const listener of this._listeners) {
      listener(state);
    }
  }

  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState());
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }
}

export const store = new Store();
