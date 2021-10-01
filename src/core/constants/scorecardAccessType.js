export default class ScorecardAccessType {
  static READ_WRITE = "rw----";
  static READ_ONLY = "r-----";
  static NO_ACCESS = "------";
}

export const DefaultAuthority = {
  read: false,
  write: false,
  delete: false,
};

export const AccessTypes = {
  USER: "user",
  USER_GROUP: "userGroup",
};
