// Strips Mongoose-specific types (ObjectId, Date) so lean() documents can be
// passed from Server Components to Client Components as plain serializable data.
export function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}
