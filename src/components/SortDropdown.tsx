type SortOption = "stars" | "recent" | "name";

type SortDropdownProps = {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

export function SortDropdown({
  sort,
  onSortChange,
}: SortDropdownProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <label htmlFor="sort" className="font-semibold">
        Sort by:
      </label>

      <select
        id="sort"
        value={sort}
        onChange={(event) =>
          onSortChange(event.target.value as SortOption)
        }
        className="rounded-lg border border-gray-300 bg-white px-4 py-2"
      >
        <option value="stars">Stars</option>
        <option value="recent">Recent</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}

export type { SortOption };