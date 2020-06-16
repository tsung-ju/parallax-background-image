const fs = require("fs");
const ssri = require("ssri");

const version = require("../package.json").version;
const scriptFile = "dist/parallax-background-image.umd.js";
const readmeFile = "README.md";

const content = fs.readFileSync(scriptFile);
const integrity = ssri.fromData(content, {
  algorithms: ["sha384"]
});

const regex = /<!-- begin-script-tag -->\n(.*)<!-- end-script-tag-->/

const markdown = `
\`\`\`html
<script
  src="https://cdn.jsdelivr.net/gh/ray851107/parallax-background-image@v${version}/${scriptFile}"
  integrity="${integrity.toString()}"
  crossorigin="anonymous"
></script>
\`\`\`
`;

let readme = fs.readFileSync(readmeFile, "utf8");
readme = readme.replace(/(?<=<!-- begin-script-tag -->)[^]*?(?=<!-- end-script-tag -->)/, markdown);
fs.writeFileSync(readmeFile, readme);
