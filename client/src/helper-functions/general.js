export const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i)

export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str
}
