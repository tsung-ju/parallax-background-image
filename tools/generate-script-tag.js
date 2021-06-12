import * as fs from "fs";
import * as ssri from "ssri";

const version = process.env.npm_package_version;
const scriptFile = "dist/parallax-background-image.js";
const readmeFile = "README.md";

const content = fs.readFileSync(scriptFile);
const integrity = ssri.fromData(content, {
  algorithms: ["sha384"]
});

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
const regex = /(?<=<!-- begin-script-tag -->)[^]*?(?=<!-- end-script-tag -->)/;
readme = readme.replace(regex, markdown);
fs.writeFileSync(readmeFile, readme);
