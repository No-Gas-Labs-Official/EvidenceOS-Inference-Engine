/**
 * evidenceos-score/0.1
 * A claim is supported only by paths that exist in the tree.
 * Gaps are first-class. Naming a concept is not evidence.
 */

export const METHOD = "evidenceos-score/0.1";

export function scoreClaims({ claims = [], files = [] } = {}) {
  const present = new Set(files);
  const evidence = [];
  const gaps = [];
  for (const claim of claims) {
    const text = typeof claim === "string" ? claim : claim?.text;
    const paths = Array.isArray(claim?.paths) ? claim.paths : [];
    if (!text) {
      gaps.push({ claim: text ?? null, reason: "EMPTY_CLAIM" });
      continue;
    }
    const hits = paths.filter((p) => present.has(p));
    if (hits.length === 0) {
      gaps.push({
        claim: text,
        reason: paths.length === 0 ? "NO_PATHS_CITED" : "CITED_PATHS_ABSENT",
        cited: paths,
      });
    } else {
      evidence.push({ claim: text, paths: hits, weight: hits.length });
    }
  }
  return {
    method: METHOD,
    claims: claims.length,
    evidence,
    gaps,
    supported: evidence.length,
    unsupported: gaps.length,
  };
}
