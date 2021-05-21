type EnumLiteralsOf<T extends object> = T[keyof T];

export type PostType = EnumLiteralsOf<typeof PostType>;

export const PostType = Object.freeze({
  Request: 0 as 0,
  Offer: 1 as 1,
  Handover: 2 as 2,
});

export const getPostTypeName = (postType: PostType) => {
  let result = '';
  switch (postType) {
    case PostType.Request:
      result = 'requests help';
      break;
    case PostType.Offer:
      result = 'offers help';
      break;
    case PostType.Handover:
      result = 'handovers an item';
      break;
    default:
      break;
  }
  return result;
};
