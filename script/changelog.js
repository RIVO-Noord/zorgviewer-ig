const { GoogleGenerativeAI } = require("@google/generative-ai");
const { execSync } = require("child_process");
const fs = require("fs");

async function generateChangelog() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // 1. Get logs and diff
    const SINCE = '3 weeks ago';
    var commits = execSync(`git log --since='${SINCE}' --pretty=format:'- %s'`).toString();
    commits += execSync(`git diff --since='${SINCE}'`).toString();

    if (!commits.trim()) {
      console.log("No commits found this week.");
      return;
    }

    // 2. Craft the Agent's Prompt
    // const prompt = `
    //   You are a technical product manager. Summarize these GitHub commits into a 3 weekly changelog:
    //   ${commits}

    //   Format with:
    //   ## 🚀 New Features
    //   ## 🛠️  Bug Fixes
    //   ## 🧹 Maintenance & Refactoring

    //   Keep it professional and highlight the 'value' to the user where possible.
    // `;
    const prompt = `
      Generate a list of changes for the following commits and diff:
      ${commits}

      Format as a bullet list no intro and grouped by:

      #### 🚀 Nieuw
      #### 🛠️ Gewijzigd
      #### 🧹 Onderhoud

      Write it for analyst and developers of the solution.
      Write in Dutch.
    `;

    // 3. Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const finalOutput = response.text();

    fs.writeFileSync("../input/includes/generated-changelog.md", finalOutput);
    console.log("Changelog generated successfully.");

  } catch (error) {
    console.error("Error generating changelog:", error);
    process.exit(1);
  }
}

generateChangelog();