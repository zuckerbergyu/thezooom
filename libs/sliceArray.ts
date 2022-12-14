const sliceArray = (array: unknown[], splitCount: number): unknown => {
  const result = [];
  let i = 0;
  if (array) {
    for (i = 0; i < array.length; i += splitCount)
      result.push(array.slice(i, i + splitCount));
  }
  return result;
};

export default sliceArray;
