import { Setter, Getter, State, Getters, Setters } from './types'
import { store } from './store'

/* eslint-disable  @typescript-eslint/no-unused-vars */
type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Tail
  : never
type InjectedGetters = {
  [P in keyof Getters]: () => ReturnType<Getters[P]>
}
type InjectedSetters = {
  [P in keyof Setters]: (...args: Tail<Parameters<Setters[P]>>) => void
}
interface InjectedStore {
  state: State
  getters: InjectedGetters
  setters: InjectedSetters
}

const createStore = (): InjectedStore => {
  const { getters, setters } = store

  const injectStateToGetter = <T extends Getter>(
    getter: T
  ): (() => ReturnType<T>) => {
    /* eslint-disable  @typescript-eslint/no-unsafe-return */
    return () => getter(store.state)
  }
  const gettersKeys = Object.getOwnPropertyNames(getters) as Array<
    keyof Getters
  >
  const injectedGetters = gettersKeys.reduce((obj, key) => {
    return {
      ...obj,
      [key]: injectStateToGetter(getters[key])
    }
  }, {}) as InjectedGetters

  const injectStateToSetter = <T extends Setter>(
    setter: T
  ): ((...args: Tail<Parameters<T>>) => void) => {
    return (...args) => {
      store.state = setter(store.state, ...args)
    }
  }
  const settersKeys = Object.getOwnPropertyNames(setters) as Array<
    keyof Setters
  >
  const injectedSetters = settersKeys.reduce((obj, key) => {
    return {
      ...obj,
      [key]: injectStateToSetter(setters[key])
    }
  }, {}) as InjectedSetters

  return {
    state: store.state,
    getters: injectedGetters,
    setters: injectedSetters
  }
}

export { createStore }
