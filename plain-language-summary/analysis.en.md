# RIVO Noord Zorgviewer IG: Analysis

### 1. What is this IG trying to achieve, in what context, and for whom?

This Implementation Guide (IG) defines the technical and functional specifications for the "Zorgviewer," a system designed to give healthcare providers in the Noord-Nederland region (RIVO-Noord) fast, secure, and clear access to a patient's current medical information, regardless of which healthcare organization's system it is stored in.

Its main objective is to create a complete, unified view of a patient's data to support "netwerkzorg" (network care), where multiple organizations collaborate on a patient's treatment. The IG is primarily written for a technical audience—architects, developers, IT specialists, and project managers—who are responsible for implementing and connecting EHR systems (from vendors like Epic, Chipsoft, Nexus) to the Zorgviewer platform (`index.md`).

### 2. How does this IG improve upon previous approaches?

The IG improves upon previous initiatives by shifting the focus from just "registration at the source" (as seen in programs like VIPP and MedMij/PGO) to providing "good technical support for care providers" (`index.md`). It achieves this through several key principles:

*   **Data remains at the source:** Unlike systems that might replicate data into a central repository, the Zorgviewer architecture specifies that information is queried directly from the source systems in real-time. This minimizes data duplication and ensures the data is current (`requirements.md`).
*   **Centralized Consent Management:** It addresses the problem of fragmented patient consent where permission must be given at each institution. The IG outlines a move towards a regional (and eventually national, like Mitz) service where patients can manage their data-sharing permissions in one place. It includes technical mappings from legacy HL7v2 consent messages to the new FHIR-based system (`design-toestemming.md`, `ConceptMap-patient-toestemming-intro.md`).
*   **Pragmatic Data Handling:** The IG takes a practical approach to real-world data issues. For example, it explicitly allows the use of `Condition.onsetPeriod` for "vague" problem start dates (e.g., "sometime in 2020"), an exception coordinated with Nictiz to reflect actual use in EHRs like Epic, which is more flexible than stricter profile interpretations (`must-support.md`, `StructureDefinition-Condition-intro.md`).

### 3. What are the key features and technical approaches of this IG?

*   **Modular Architecture:** The system is designed with a "bouwblokken" (building blocks) approach, featuring distinct, reusable components for functions like Consent, Authentication, Authorization, Logging, and Data Source Connection (`design.md`).
*   **Standards-Based Integration:** It mandates the use of open standards, with specific technical choices:
    *   **Data Exchange:** HL7 FHIR STU3, based on the Dutch "zibs" (Zorginformatiebouwstenen) 2017 publication (`requirements.md`).
    *   **App Integration & Auth:** A hybrid approach using **SMART-on-FHIR 1.0.0** for EHR launch and authentication with specific OAuth2 scopes for frontend and backend apps (`CapabilityStatement-ZorgviewerHost-intro.md`, `CapabilityStatement-OntsluitenBronsysteem-intro.md`), and **SAML** for other systems like Chipsoft and VIPLive (`design-autorisatie.md`).
    *   **API Queries:** The IG provides exact `GET` request examples for each data type, including required parameters like `patient=<id>`, `category`, and `status`, to ensure consistent queries across all connected systems (e.g., `StructureDefinition-AllergyIntolerance-intro.md`).
*   **Federated Data Model:** The core dataset is the Dutch "Basisgegevensset Zorg (BgZ)," including 28 zibs and correspondence. The Zorgviewer queries this data from various source systems without storing it centrally (`datasets.md`, `requirements.md`).
*   **Distributed Logging:** To ensure end-to-end auditability, it specifies the use of `X-Correlation-Id` and `X-Request-Id` HTTP headers to trace a user's actions from the Zorgviewer to the source EHR, a requirement for NEN 7513 compliance (`design-logging.md`).
*   **UI-Linked Definitions:** For many profiles, the IG includes a `ViewDefinition` JSON object. This provides a direct link between the FHIR data elements and their intended presentation in a user interface, guiding developers on how to render the information meaningfully (e.g., `StructureDefinition-AllergyIntolerance-intro.md`).

### 4. How does this IG relate to broader healthcare standards and regulations?

The IG is explicitly designed to comply with Dutch and international healthcare standards and regulations.

*   **NEN Standards:** It directly maps its building blocks to Dutch NEN norms, including **NEN 7510/7512/7513** for information security and logging (linking the `AuditEvent` profile directly to NEN 7513), **NEN 7540** for BgZ data exchange, and future alignment with standards for consent (NEN 7517) and authentication (NEN 7518) (`nen-normen.md`, `StructureDefinition-AuditEvent-intro.md`).
*   **Legal & Professional Compliance:** It is built to operate within the legal frameworks of privacy (AVG/GDPR) and medical practice ("Wet Geneeskundige BehandelOvereenkomst - WGBO"). Furthermore, it incorporates guidelines from professional medical societies, such as the "FMS Adequate Registratie," to define `must-support` flags and UI guidance (`design-toestemming.md`, `StructureDefinition-AllergyIntolerance-intro.md`).
*   **Interoperability Standards:** The architecture's "bouwblokken" are mapped to corresponding actor roles from **IHE** (Integrating the Healthcare Enterprise) profiles. It also specifies mappings from older standards like **HL7v2** to the modern FHIR resources, ensuring backward compatibility (`design.md`, `ConceptMap-patient-toestemming-intro.md`).
*   **National Programs:** The IG aligns with national data exchange programs and standards, including MedMij, VIPP, zibs, and the Mitz national consent service (`datasets.md`, `design-toestemming.md`).

### 5. Who are the primary users or beneficiaries of this IG?

*   **Primary Users (of the IG):** The guide is written for a technical audience responsible for implementation: regional architects, developers, IT specialists, functional designers, and project managers (`index.md`). The highly detailed technical content in the `intro-notes` section (e.g., specific API requests, scopes, and mappings) confirms this audience.
*   **Primary Beneficiaries (of the Zorgviewer):**
    *   **Healthcare Providers:** They are the main end-users. The Zorgviewer aims to provide them with a complete and clear view of patient data, leading to better collaboration, fewer errors, faster decisions, and reduced administrative burden (`index.md`).
    *   **Patients:** Patients are key beneficiaries. The architecture is founded on patient consent, giving them control over who can view their data. By enabling better-informed decisions, the ultimate goal is to provide the patient with "the right care at the right time" (`requirements.md`, `index.md`).
