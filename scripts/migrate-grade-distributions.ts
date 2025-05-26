import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../public/data");
// const PG_CONNECTION_STRING = process.env.PG_CONNECTION_STRING as string;

function extractTerm(filename: string): string {
  // Example: RadGridExport-Fall-2024.csv or RadGridExport-Spring-2021-GC.csv
  const match = filename.match(/RadGridExport-([A-Za-z]+)-(\d{4})(-GC)?/);
  if (match) {
    return match[1] + " " + match[2] + (match[3] ? match[3] : "");
  }
  throw new Error(`Could not extract term from filename: ${filename}`);
}

function parseIntOrNull(val: string | undefined): number {
  const n = parseInt(val ?? "", 10);
  return isNaN(n) ? 0 : n;
}

export async function migrate(): Promise<void> {
  const supabaseClient = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Ensure the table exists
  // await supabaseClient.query(`
  //   CREATE TABLE IF NOT EXISTS grade_distributions (
  //     id SERIAL PRIMARY KEY,
  //     term TEXT NOT NULL,
  //     crs_subj_cd TEXT,
  //     crs_nbr TEXT,
  //     crs_subj_desc TEXT,
  //     crn TEXT,
  //     sched_type_cd TEXT,
  //     sched_type_desc TEXT,
  //     itype TEXT,
  //     sess_cd TEXT,
  //     crs_title TEXT,
  //     dept_cd TEXT,
  //     dept_name TEXT,
  //     a INTEGER,
  //     ah INTEGER,
  //     b INTEGER,
  //     bh INTEGER,
  //     c INTEGER,
  //     d INTEGER,
  //     f INTEGER,
  //     adv INTEGER,
  //     cr INTEGER,
  //     dfr INTEGER,
  //     i INTEGER,
  //     ng INTEGER,
  //     nr INTEGER,
  //     o INTEGER,
  //     pr INTEGER,
  //     ps INTEGER,
  //     s INTEGER,
  //     sh INTEGER,
  //     u INTEGER,
  //     w INTEGER,
  //     primary_instructor TEXT,
  //     name2 TEXT,
  //     name3 TEXT,
  //     grade_regs INTEGER
  //   );
  // `);

  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".csv"));
  console.log(`Found ${files.length} CSV files to migrate.`);
  console.log(`Files are: ${files}`);
  console.log("Starting migration...");

  for (const file of files) {
    const term = extractTerm(file);
    const filePath = path.join(DATA_DIR, file);
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({ columns: true, skip_empty_lines: true, bom: true }));

    for await (const record of parser) {
      const { data, error } = await supabaseClient
        .from("grade_distributions")
        .insert([
          {
            term: term,
            crs_subj_cd: record["CRS SUBJ CD"],
            crs_nbr: record["CRS NBR"],
            crs_subj_desc: record["CRS SUBJ DESC"],
            crn: record["CRN"],
            sched_type_cd: record["SCHED TYPE CD"],
            sched_type_desc: record["SCHED TYPE DESC"],
            itype: record["ITYPE"],
            sess_cd: record["SESS CD"],
            crs_title: record["CRS TITLE"],
            dept_cd: record["DEPT CD"],
            dept_name: record["DEPT NAME"],
            a: parseIntOrNull(record["A"]),
            ah: parseIntOrNull(record["AH"]),
            b: parseIntOrNull(record["B"]),
            bh: parseIntOrNull(record["BH"]),
            c: parseIntOrNull(record["C"]),
            d: parseIntOrNull(record["D"]),
            f: parseIntOrNull(record["F"]),
            adv: parseIntOrNull(record["ADV"]),
            cr: parseIntOrNull(record["CR"]),
            dfr: parseIntOrNull(record["DFR"]),
            i: parseIntOrNull(record["I"]),
            ng: parseIntOrNull(record["NG"]),
            nr: parseIntOrNull(record["NR"]),
            o: parseIntOrNull(record["O"]),
            pr: parseIntOrNull(record["PR"]),
            ps: parseIntOrNull(record["PS"]),
            s: parseIntOrNull(record["S"]),
            sh: parseIntOrNull(record["SH"]),
            u: parseIntOrNull(record["U"]),
            w: parseIntOrNull(record["W"]),
            primary_instructor: record["Primary Instructor"],
            name2: record["Name2"],
            name3: record["Name3"],
            grade_regs: parseIntOrNull(record["Grade Regs"]),
          },
        ])
        .select();
    }
    console.log(`Migrated: ${file}`);
  }

  // await supabaseClient.end();
  console.log("Migration complete!");
}

async function main() {
  await migrate();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
