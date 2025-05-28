import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// List of all columns except id
const columns = [
  "term",
  "crs_subj_cd",
  "crs_nbr",
  "crs_subj_desc",
  "crn",
  "sched_type_cd",
  "sched_type_desc",
  "itype",
  "sess_cd",
  "crs_title",
  "dept_cd",
  "dept_name",
  "a",
  "ah",
  "b",
  "bh",
  "c",
  "d",
  "f",
  "adv",
  "cr",
  "dfr",
  "i",
  "ng",
  "nr",
  "o",
  "pr",
  "ps",
  "s",
  "sh",
  "u",
  "w",
  "primary_instructor",
  "name2",
  "name3",
  "grade_regs",
];

// Columns that are text and should be queried with ILIKE
const textColumns = [
  "term",
  "crs_subj_cd",
  "crs_nbr",
  "crs_subj_desc",
  "crn",
  "sched_type_cd",
  "sched_type_desc",
  "itype",
  "sess_cd",
  "crs_title",
  "dept_cd",
  "dept_name",
  "primary_instructor",
  "name2",
  "name3",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exact = searchParams.get("exact") === "true";
  const detailed = searchParams.get("detailed") === "true"; // default: false

  // Columns for GradeDistributionTableSimple
  const simpleColumns = [
    "id",
    "term",
    "crs_subj_cd",
    "crs_nbr",
    "crs_title",
    "dept_cd",
    "dept_name",
    "a",
    "b",
    "c",
    "d",
    "f",
    "adv",
    "cr",
    "dfr",
    "i",
    "ng",
    "nr",
    "o",
    "pr",
    "s",
    "u",
    "w",
    "primary_instructor",
    "grade_regs",
  ];

  let selectCols = "*";
  if (!detailed) {
    selectCols = simpleColumns.join(",");
  }

  let query = supabase
    .from("grade_distributions")
    .select(selectCols, { count: "exact" });

  // For each column except id, if a query param is present, add a filter
  for (const col of columns) {
    const value = searchParams.get(col);
    if (value !== null && value !== "") {
      if (textColumns.includes(col)) {
        if (exact) {
          // Case-insensitive, exact match
          query = query.ilike(col, value);
        } else {
          // Case-insensitive, partial match (default)
          query = query.ilike(col, `%${value}%`);
        }
      } else {
        // Numeric or other types: exact match
        query = query.eq(col, value);
      }
    }
  }

  // Limit results for performance
  query = query.limit(100);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}
