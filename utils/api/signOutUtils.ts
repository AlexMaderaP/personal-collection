export function checkRequireSignOut(
  userId: string | null,
  id: string,
): boolean {
  return userId === id;
}
