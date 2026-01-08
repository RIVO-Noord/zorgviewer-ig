https://github.com/HL7/plain-language/blob/main/README.md 

Extracted the prompts from https://github.com/HL7/plain-language/blob/main/process_repo.ts
and used them on gemini-cli on our Zorgviewer-IG repo.

Prompt 1:
```
# FHIR IG Analysis 
Given the FHIR Implementation Guide (IG) source files @input/pagecontent and @input/intro-notes , provide a structured analysis addressing the following questions: 

1. What is this IG trying to achieve, in what context, and for whom? Explain its objectives in simple terms. 
2. How does this IG improve upon previous approaches? (Use only information from the input files; avoid speculation.) 
3. What are the key features and technical approaches of this IG? 
4. How does this IG relate to broader healthcare standards and regulations? 
5. Who are the primary users or beneficiaries of this IG, including patients if applicable? 

Provide concise, factual responses to each question based on the content of the IG. Aim for clarity and precision in your analysis. Begin with "# RIVO Noord Zorgviewer IG: Analysis" and do not output anything other than the analysis.
```

Prompt 2:
```
In the file @analysis.md is the analysis of a FHIR Implementation Guide. 

Use the analysis to create a plain language summary of the guide that adheres to these guidelines: 
1. Explain the IG's purpose, country of use (if applicable), and context of use  / use cases, and key features / how it works. Avoid explaining what standards are in general. 
2. Write ~200 words in short paragraphs for a general audience. 
3. Use clear, jargon-free language. 
4. Write in third-person perspective. 
5. Maintain an objective, informative tone. 
6. Present information factually. 
7. Highlight any key stakeholder benefits. 
8. Mention how the IG relates to other standards or regulations, if this is direct and relevant. Otherwise omit this. 
9. Avoid promotional language or unverified claims. 

Please revise this summary to adhere to the following revision guideline: 
- Rather than referring to an "IG" or "Implementation Guide", just call it a "standard". 
- Remove any explanation that healthcare standards are like a common language or that they help computers talk to each other. That's common knowledge. 
- Remove any explanation of what FHIR is; do not expand the acronym FHIR; just call it FHIR. 
- Remove any explanation of what an API is; do not expand the acronym API; just call it an API. 
- Remove any explanation of what an EHR is; do not expand the acronym EHR; just call it an EHR. 
- Eliminate any speculative or indirect information about benefits. 
- Remove any redundancy in the summary.  
- Remove any mention of things you don't know or aren't sure about this IG 
- Remove any mention that this IG builds on FHIR; that is common knowledge. 
```

Prompt 3:
```
And now in Dutch.
```

Put the result in a fork of https://github.com/HL7/plain-language under summaries/hl7.fhir.nl.zorgviewer.md (<packageId>.md) and create a PR.