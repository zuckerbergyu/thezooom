const isProperPassword = (input: string): boolean => {
  const pattern1 = /[a-zA-Z]/;
  const pattern2 = /[~!@\\#$%<>^&*]/; // 원하는 특수문자 추가 제거
  if (input === '') return false;
  if (!pattern1.test(input) || !pattern2.test(input) || input.length < 8)
    return false;
  return true;
};

export default isProperPassword;
