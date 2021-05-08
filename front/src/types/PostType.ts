type EnumLiteralsOf<T extends object> = T[keyof T];

export type PostType = EnumLiteralsOf<typeof PostType>;

export const PostType = Object.freeze({
  Request: 0 as 0,
  Offer: 1 as 1,
  Handover: 2 as 2,
});
