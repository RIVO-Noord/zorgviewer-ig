const { GoogleGenerativeAI } = require("@google/generative-ai");
const { execSync } = require("child_process");
const fs = require("fs");

async function generateChangelog() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  try {
    // 1. Get logs and diff
    const SINCE = '3 weeks ago';
    // var changes = execSync(`git log --since='${SINCE}' --pretty=format:'- %s'`).toString();
    var changes = execSync(`git diff 'HEAD@{${SINCE}}'`).toString();

    if (!changes.trim()) {
      console.log("No commits found this week.");
      return;
    }

    // 2. Craft the Agent's Prompt
    const prompt = `
      Generate a list of changes from the git log and diff at the end.
      Make sure to also summarize changes per file.
      Format as a bullet list no intro and grouped by:

      #### 🚀 Nieuw
      #### 🛠️ Gewijzigd
      #### 🧹 Onderhoud

      Write it for Zorgviewer analyst and developers of the implementation.
      Write in Dutch.

      <changes>
      ${changes}
      </changes>
    `;

    // 3. Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const finalOutput = response.text();

    fs.writeFileSync("input/includes/generated-changelog.md", finalOutput);
    console.log("Changelog generated successfully.");

  } catch (error) {
    console.error("Error generating changelog:", error);
    process.exit(1);
  }
}

generateChangelog();