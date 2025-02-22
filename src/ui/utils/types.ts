export type PickUnion<T extends PropertyKey, U extends T> = keyof Pick<
  Record<T, string>,
  U
>;

export type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
