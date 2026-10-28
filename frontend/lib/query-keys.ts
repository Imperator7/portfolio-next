// One place for every TanStack Query key, so invalidation never guesses.
export const contactKeys = {
  all: ['contact'] as const,
  send: () => [...contactKeys.all, 'send'] as const,
}
