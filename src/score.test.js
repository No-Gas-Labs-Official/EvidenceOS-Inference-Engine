import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreClaims } from "./score.js";

const files = ["src/score.js", "README.md"];

test("a claim whose path is in the tree is evidence", () => {
  const report = scoreClaims({
    files,
    claims: [{ text: "scorer exists", paths: ["src/score.js"] }],
  });
  assert.equal(report.supported, 1);
  assert.equal(report.gaps.length, 0);
  assert.equal(report.evidence[0].weight, 1);
  assert.equal(report.method, "evidenceos-score/0.1");
});

test("a claim with no cited path is a gap, not a quiet pass", () => {
  const report = scoreClaims({
    files,
    claims: [{ text: "implements flash loans", paths: [] }],
  });
  assert.equal(report.unsupported, 1);
  assert.equal(report.gaps[0].reason, "NO_PATHS_CITED");
});

test("citing a path that is not in the tree is a gap", () => {
  const report = scoreClaims({
    files,
    claims: [{ text: "has a server", paths: ["src/server.js"] }],
  });
  assert.equal(report.gaps[0].reason, "CITED_PATHS_ABSENT");
});
