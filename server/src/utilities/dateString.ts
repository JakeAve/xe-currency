const dateString = (str: string): string => {
  const d = new Date(str)
  d.setUTCHours(0, 0, 0, 0)
  return d.toISOString().replace(/:|\./g, '-')
}

export default dateString
