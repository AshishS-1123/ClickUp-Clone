export function makeStringConsize(str, len) {
  const consize = str.slice(0, len);

  if (consize.length == str.length) {
    return consize;
  }

  return str.slice(0, len - 3) + '...';
}
