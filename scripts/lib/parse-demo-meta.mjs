#!/usr/bin/env node
/**
 * 解析 demo 头注释中的分段 bullet 列表。
 * 供 build-index、validate、enhance-demo-notes 共用。
 */

const SECTION_KEYS = ["分类", "主题", "难度", "前置", "相关", "要点", "面试"];

export function parseHeaderBlock(content) {
  const beforeDoctype = content.split(/<!DOCTYPE/i)[0];
  const comment = beforeDoctype.match(/<!--\s*([\s\S]*?)\s*-->/);
  return comment?.[1] || "";
}

export function extractBullets(block, startKey) {
  const startIdx = block.indexOf(`${startKey}:`);
  if (startIdx === -1) return [];
  const after = block.slice(startIdx + startKey.length + 1);
  let end = after.length;
  for (const k of SECTION_KEYS) {
    if (k === startKey) continue;
    const m = after.match(new RegExp(`^\\s*${k}:`, "m"));
    if (m && m.index < end) end = m.index;
  }
  const section = after.slice(0, end);
  return [...section.matchAll(/^\s*-\s*(.+)$/gm)].map((item) => item[1].trim());
}

export function parseDemoMetaFromContent(content) {
  const block = parseHeaderBlock(content);
  const theme = (block.match(/主题:\s*(.+)/) || [])[1]?.trim() || "";
  const category = (block.match(/分类:\s*(.+)/) || [])[1]?.trim() || "";
  const difficulty = (block.match(/难度:\s*(.+)/) || [])[1]?.trim() || "";
  const prerequisite = (block.match(/前置:\s*(.+)/) || [])[1]?.trim() || "";
  const relatedRaw = (block.match(/相关:\s*(.+)/) || [])[1]?.trim() || "";
  const related = relatedRaw
    ? relatedRaw.split(/[,，]/).map((s) => s.trim()).filter(Boolean)
    : [];
  const points = extractBullets(block, "要点");
  const interviewPoints = extractBullets(block, "面试");
  const keywords = [
    difficulty,
    prerequisite,
    related.join(" "),
    points.join(" "),
    interviewPoints.join(" "),
  ]
    .filter(Boolean)
    .join(" ");
  return {
    theme,
    category,
    difficulty,
    prerequisite,
    related,
    points,
    interviewPoints,
    keywords,
  };
}
