const gitlog = require("gitlog").default;
const fs = require("fs");
console.log(process.argv);

const repo = process.argv[2];

if (!repo) return console.log("No Repo, to use supply repo as arg");

const options = {
  repo: repo,
  number: 1000,
  //   author: "Dom Harrington",
  fields: [
    "hash",
    "abbrevHash",
    "subject",
    "authorName",
    "authorDateRel",
    "body",
  ],
  execOptions: { maxBuffer: 1000 * 1024 },
};

const commitTypes = {
  feature: "feature",
  bugFix: "bugFix",
};

const commits = gitlog(options);
console.log(commits);
let htmlText = "<h1>Change Log</h1>";

const parseText = (text) => {
  if (text.includes("bf:")) {
    return [commitTypes.bugFix, text.substring(text.indexOf("bf:") + 3)];
  }
  if (text.includes("bugfix:")) {
    return [commitTypes.bugFix, text.substring(text.indexOf("bugfix:") + 7)];
  }
  if (text.includes("feat:")) {
    console.log("text", text);
    return [commitTypes.feature, text.substring(text.indexOf("feat:") + 5)];
  }
  if (text.includes("feature:")) {
    return [commitTypes.feature, text.substring(text.indexOf("feature:") + 8)];
  }
  return [null, null];
};
commits.forEach((commit) => {
  const features = [];
  const bugfixes = [];
  const notes = commit.subject.split(";");
  notes.forEach((note) => {
    const [type, mess] = parseText(note);
    if (type === commitTypes.feature) {
      features.push({ message: mess, commit });
    } else if (type === commitTypes.bugFix) {
      bugfixes.push({ message: mess, commit });
    }
  });
  if (features.length > 0 || bugfixes.length > 0) {
    htmlText = `${htmlText} <h2>${commit.abbrevHash} - ${commit.authorName}</h2>`;
    if (features.length > 0) {
      htmlText = `${htmlText} <h4>Features</h4>`;
      features.forEach((feat) => {
        htmlText = `${htmlText} <p>${feat.message}</p>`;
      });
    }
    if (bugfixes.length > 0) {
      htmlText = `${htmlText} <h5>Bug Fixes</h5>`;
      bugfixes.forEach((bf) => {
        htmlText = `${htmlText} <p>${bf.message}</p>`;
      });
    }
  }
  //   htmlText = `${htmlText}<p>${commit.subject} - ${commit.authorName} - ${commit.abbrevHash}</p>`;
});

fs.writeFileSync("./change-log.html", htmlText);
