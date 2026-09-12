import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "rsvp.json");

export interface RsvpEntry {
  name: string;
  side: "groom" | "bride";
  attending: "yes" | "no";
  guests: number;
  submittedAt: string;
}

/** Read all stored RSVP entries (empty array if none yet). */
export async function readEntries(): Promise<RsvpEntry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as RsvpEntry[];
  } catch {
    return [];
  }
}

/** Append one RSVP entry to the JSON store, creating it if needed. */
export async function addEntry(entry: RsvpEntry): Promise<void> {
  const entries = await readEntries();
  entries.push(entry);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(entries, null, 2), "utf8");
}
