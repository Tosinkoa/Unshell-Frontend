export const formatProductName = (str) => {
  if (str) {
    if (!str) return
    return (str = str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()))
  }
}
