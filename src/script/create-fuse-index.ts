/* eslint-disable @typescript-eslint/no-explicit-any */
import Fuse from "fuse.js";

import fs from "fs";

const dictionary = JSON.parse(
  fs.readFileSync("./public/characters.json", "utf-8")
);

const indexData = Object.values(dictionary).map((entry: any) => {
  return {
    character: entry.character,
    definition: entry.definition
      ? entry.definition
          .replace("for", "")
          .replace("to", "")
          .split(/[,;]\s*/)
          .map((d: string) => d.trim())
      : [],
    pinyin: [
      ...entry.pinyin,
      ...entry.pinyin.map((p: string) =>
        p
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // remove diacritics
          .replace(/\d/g, "")
      ),
    ],
  };
});

const fuseIndex = Fuse.createIndex(
  ["character", "pinyin", "definition"],
  indexData
);

fs.writeFileSync(
  "./public/fuse-index.json",
  JSON.stringify(fuseIndex.toJSON())
);
console.log("Fuse index created and saved to public/fuse-index.json");
