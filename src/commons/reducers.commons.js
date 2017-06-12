// @flow

// TODO UT
export function createReducer<S, A: {type: string}>(initialState: S, handlers: {[action: string]: (state: S, action: A) => S}): (state: S, action: A) => S {
  return function reducer(state: S = initialState, action: A) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export function arrayToDictionary<E: {id: number}>(entitiesArray: Array<E>): { [id: number]: E } {
  let entitiesDictionary = {};
  entitiesArray.forEach(entity => {
    entitiesDictionary = {
      ...entitiesDictionary,
      [entity.id]: entity
    }
  })
  return entitiesDictionary;
}
