export async function getCategories() {
  try {
    const res = await fetch("/api/collections/categories");
    const categories = await res.json();

    return categories;
  } catch (error) {
    throw new Error("Could not retrieve categories");
  }
}
