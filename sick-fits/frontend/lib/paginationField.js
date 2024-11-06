import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // is there anything in the cache?
      console.log({ existing, args, cache });
      const { skip, first } = args;
      /* read the number of items on the page from the cache */
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first); // first equals to perPage
      const items = existing.slice(skip, skip + first).filter((x) => x); // retrieves the items of the current page based on pagination parameters. Filters out any undefined or null items from the extracted portion to ensure only valid items are included.
      // if the last page has less items that the perPage is set to then return the items anyway
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }
      // If there are items, just return them from the cache
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache. Gonna send them to Apollo.`
        );
        return items;
      }
      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      // how are we going to put the items to the cache?
      const { skip, first } = args;
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // Finally we return the merged items from the cache
      return merged;
    },
  };
}
