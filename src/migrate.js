import {mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {DatabaseSync} from "node:sqlite";

const path = resolve(process.env.DATABASE_PATH ?? "data/water_race_command.sqlite3");
mkdirSync(dirname(path), {recursive: true});
const database = new DatabaseSync(path);
database.exec(readFileSync(new URL("../migrations/001_init.sql", import.meta.url), "utf8"));
database.close();
writeFileSync(path + ".ready", "迁移完成\n", "utf8");
console.log(path);