import { useRef, useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { RepoCard } from "./components/RepoCard";
import { SortDropdown, type SortOption } from "./components/SortDropdown";
import type { Repository } from "./types";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState<SortOption>("stars");
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchRepositories = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter a GitHub username.");
      setRepos([]);
      setSearched(true);
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError("");
    setRepos([]);
    setSearched(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${trimmedUsername}/repos`,
        {
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("GitHub user not found.");
        }

        throw new Error("Failed to fetch repositories.");
      }

      const data: Repository[] = await response.json();
      setRepos(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  const sortedRepos = [...repos].sort((a, b) => {
    if (sort === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }

    if (sort === "recent") {
      return (
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
      );
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            GitHub Repo Explorer
          </h1>

          <p className="text-gray-600">
            Search for a GitHub username and explore their repositories.
          </p>
        </header>

        <SearchForm
          username={username}
          onUsernameChange={setUsername}
          onSearch={searchRepositories}
        />

        {loading && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold">Loading repositories...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-lg font-bold">Something went wrong</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && searched && repos.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-bold">No repositories found</h2>
            <p className="text-gray-600">
              This GitHub user does not have any public repositories.
            </p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <SortDropdown sort={sort} onSortChange={setSort} />

            <div className="grid gap-4">
              {sortedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;