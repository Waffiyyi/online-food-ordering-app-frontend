export const isPresentInFavorites = (favorites, restaurant,
) => {
  console.log("favorites", favorites)
  for (let item of favorites) {
    if (restaurant.id === item.id) {
      return true
    }
  }
  return false;
}