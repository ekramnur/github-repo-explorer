import type { Repository } from "../types";

type RepoCardProps = {
  repo: Repository;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-xl font-bold text-blue-600 hover:underline"
        >
          {repo.name}
        </a>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold">
          ⭐ {repo.stargazers_count}
        </span>
      </div>

      <p className="mb-4 text-gray-600">
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <span>
          Language: {repo.language ?? "Not specified"}
        </span>

        <span>
          Updated:{" "}
          {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
}