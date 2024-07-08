
export const checkEmailValid = (value: string) => {
  let regex = new RegExp('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$');
  return !!(value && regex.test(value));
}

export const checkTokenValid = (value: string) => {
  let regex = new RegExp('^[a-zA-Z0-9-]{4,40}$');
  return !!(value && regex.test(value));
}

export const checkNameValid = (value: string) => {
  let regex = new RegExp('^[a-zA-Z\\s]*$');
  return !!(value && regex.test(value));
}

export const checkPasswordValid = (value: string) => {
  let regex = new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,10}$');
  return !!(value && regex.test(value));
}

