/* eslint-disable  @typescript-eslint/no-explicit-any */
type F = (...ags: any) => any
/* eslint-disable  @typescript-eslint/no-unused-vars */
type Tail<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Tail
  : never

export { F, Tail }
