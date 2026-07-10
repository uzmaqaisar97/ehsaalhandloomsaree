"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

import { SareeCard } from "@/components/saree/saree-card";
import type { Saree } from "@/types/saree";

type SearchPageProps = {
  sarees: Saree[];
};

export function SearchPageClient({ sarees }: SearchPageProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(sarees, {
        keys: ["title", "fabric", "tags", "category", "color"],
        threshold: 0.35,
        minMatchCharLength: 2,
      }),
    [sarees],
  );

  const results =
    query.trim().length < 2
      ? []
      : fuse.search(query.trim()).map((result) => result.item);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
          Search
        </p>
        <h1 className="mt-3 font-heading text-3xl text-primary sm:text-4xl">
          Find your perfect saree
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Search by name, fabric, colour, or tags.
        </p>
      </div>

      <div className="mt-8">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try &quot;banarasi&quot;, &quot;silk&quot;, or &quot;wedding&quot;..."
          className="h-12 w-full max-w-xl rounded-lg border border-input bg-card px-4 text-sm outline-none ring-ring focus-visible:ring-2"
          autoFocus
        />
      </div>

      {query.trim().length >= 2 && (
        <p className="mt-4 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;
          {query}&rdquo;
        </p>
      )}

      {query.trim().length >= 2 && results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-heading text-xl text-primary">No matches found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different keyword or{" "}
            <Link href="/collections" className="text-primary hover:underline">
              browse collections
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(query.trim().length < 2 ? sarees.slice(0, 8) : results).map(
            (saree) => (
              <SareeCard key={saree.slug} saree={saree} />
            ),
          )}
        </div>
      )}

      {query.trim().length < 2 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Showing popular picks — start typing to search the full catalogue.
        </p>
      )}
    </div>
  );
}
