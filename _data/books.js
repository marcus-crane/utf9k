const fs = require("fs")

const YAML = require("yaml")

module.exports = async function() {
  const contents = fs.readFileSync("_data/books.yml", "utf-8")
  return YAML.parse(contents)
}
