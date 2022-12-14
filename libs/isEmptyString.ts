const isEmptyString = (input: string): boolean =>
  !input || input?.replace(/\s|/gi, '') === '';
export default isEmptyString;
