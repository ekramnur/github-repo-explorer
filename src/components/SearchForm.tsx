type SearchFormProps = {
  username: string;
  onUsernameChange: (username: string) => void;
  onSearch: () => void;
};

export function SearchForm({
  username,
  onUsernameChange,
  onSearch,
}: SearchFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
      className="mb-6 flex gap-3"
    >
      <input
        type="text"
        value={username}
        onChange={(event) => onUsernameChange(event.target.value)}
        placeholder="Enter GitHub username"
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}