type EnumLiteralsOf<T extends object> = T[keyof T];

export type GroupPrivacy = EnumLiteralsOf<typeof GroupPrivacy>;

export const GroupPrivacy = Object.freeze({
  Invisible: 2 as 2,
  Private: 0 as 0,
  Public: 1 as 1,
});

export const getGroupPrivacyName = (groupPrivacy: GroupPrivacy) => {
  let result = '';
  switch (groupPrivacy) {
    case GroupPrivacy.Invisible:
      result = 'Invisible';
      break;
    case GroupPrivacy.Private:
      result = 'Private';
      break;
    case GroupPrivacy.Public:
      result = 'Public';
      break;
    default:
      break;
  }
  return result;
};
