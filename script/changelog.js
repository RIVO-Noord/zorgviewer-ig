const { GoogleGenerativeAI } = require("@google/generative-ai");
const { execSync } = require("child_process");
const fs = require("fs");

async function generateChangelog() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  try {
    // 1. Get diff
    // const SINCE = '3 weeks ago';
    const SINCE = '2026-08-11';
    let changes = execSync(`git diff 'HEAD@{${SINCE}}'`).toString();

    // Generate fo-diff using in the Zorgviewer.wiki git folder, which is a separate repository.
    // `git pull`
    // `git diff 'HEAD@{2026-08-11}' -- Functionele-Ontwerpen-\(FO\'s\) > /tmp/fo-diff.log`
    // and move to zorgviewer-ig/temp/fo-diff.log
    if (fs.existsSync('temp/fo-diff.log')) {
      console.log("Including FO diff.")
      const foChanges = fs.readFileSync('temp/fo-diff.log', 'utf-8');
      changes = foChanges + '\n' + changes;
    }
    
    if (!changes.trim()) {
      console.log("No commits found this week.");
      return;
    }

    // 2. Craft the Agent's Prompt
    const prompt = `
      Generate a list of changes from the git diff at the end.
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