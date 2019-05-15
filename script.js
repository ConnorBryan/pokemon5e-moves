const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  let raw = await readFile("./src/data/raw-data.txt", "utf8");
  raw = raw.replace(/\\columnbreak/g, "");
  raw = raw.replace(/\\pagebreakNum/g, "");

  const rawArray = raw.split("#### ");
  const data = rawArray.reduce((prev, next) => {
    const [title, rest] = next.split("\n___\n-");

    if (rest) {
      let fields = rest.split("\n-");
      fields = fields.map(field =>
        field
          .replace(/\*/g, "")
          .trimLeft()
          .trimRight()
      );
      fields = fields.reduce((prev, next) => {
        const [name, value] = next.split(": ");
        prev[name] = value;
        return prev;
      }, {});

      prev[title] = fields;
    }

    return prev;
  }, {});

  await writeFile("./src/data/data.json", JSON.stringify(data, null, 2));
})();
