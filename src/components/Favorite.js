export default function Favorite({ launchId, isFavorite, toggleFavorite }) {
  return (
    <button
      className="favorite-btn mb-8  py-2 px-4 rounded-full border border-solid border-gray-300 text-white font-semibold text-sm transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:text-white"
      onClick={() => toggleFavorite(launchId)}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
