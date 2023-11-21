// This function is the original one from the exercise

// I have noticed that code also capitalizes the rest of the words
export function getCapitalizeFirstWord(name: string): string {
  if (name == null) {
    throw new Error('Failed to capitalize first word with null')
  }
  if (!name) {
    return name
  }
  return name
    .split(' ')
    .map((n) =>
      n.length > 1
        ? n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()
        : n,
    )
    .join(' ')
}
