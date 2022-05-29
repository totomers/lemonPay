/**
         * Uppercase letters: A-Z
           Lowercase letters: a-z
           Numbers: 0-9
           Symbols: ~`!@#$%^&*()_-+={[}]|\:;“‘’“<,>.?/
         * 
         */

export const isAlphaNumericalWithSpecialChar = (str: string) => {
  let code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 32 && code < 127)) {
      return false;
    }
  }
  return true;
};
