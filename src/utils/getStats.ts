const getStats = async () => {
  const res = await fetch(
    "https://organic-badger-43.hasura.app/api/rest/stats"
  );
  const stats = await res.json();
  return stats.stats[0];
};

export { getStats };
