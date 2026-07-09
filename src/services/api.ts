/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChatMessage, DeepResearchSession, CompareResult, DraftDocument, LegalCitation, CaseLaw, ResearchPlanStep, EvidenceTimelineEvent } from '../types';

// Standard lag utility to simulate real network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockHistory: ChatMessage[] = [
  {
    id: 'h1',
    sender: 'user',
    text: 'What is the new provision for mob lynching under Bharatiya Nyaya Sanhita (BNS)?',
    timestamp: new Date(Date.now() - 3600000 * 24),
  },
  {
    id: 'h2',
    sender: 'assistant',
    text: 'Under the Bharatiya Nyaya Sanhita (BNS), 2023, mob lynching is specifically addressed under **Section 103(2)**. It prescribes the death penalty or life imprisonment where a group of five or more persons acts in concert, committing murder on grounds of race, caste, community, sex, place of birth, language, or personal belief.',
    timestamp: new Date(Date.now() - 3600000 * 24 + 5000),
    citations: [
      {
        act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
        section: 'Section 103(2)',
        title: 'Punishment for Murder by Group',
        relevance: 'Directly penalizes mob lynching with death penalty or life imprisonment.',
        type: 'BNS'
      }
    ],
    confidence: 98,
    thinkingTime: 1.8
  }
];

export const mockCompareData: CompareResult[] = [
  {
    title: 'Murder / Mob Lynching',
    oldAct: 'Indian Penal Code (IPC), 1860',
    oldSection: 'Section 302',
    newAct: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    newSection: 'Section 103',
    similarities: 'Both define and penalize the act of murder with death or imprisonment for life.',
    differences: 'BNS Section 103(2) explicitly introduces codification for mob lynching/murder committed by a group of 5 or more on grounds of caste, race, community, language, etc., carrying death penalty or life imprisonment.',
    implication: 'Provides a distinct statutory classification for hate-motivated group killings, ensuring targeted prosecution rather than general murder trials.',
    punishmentChange: 'Maintains death/life imprisonment but imposes minimum fines and removes loopholes for joint liability.'
  },
  {
    title: 'Electronic / Digital Records',
    oldAct: 'Indian Evidence Act (IEA), 1872',
    oldSection: 'Section 65B',
    newAct: 'Bharatiya Sakshya Adhiniyam (BSA), 2023',
    newSection: 'Section 61 & 62',
    similarities: 'Requires certification and validation of integrity for admissibility of digital materials.',
    differences: 'BSA elevates electronic records to primary evidence status (Section 57, 61) under specific safeguards. It expands definitions to include server logs, cloud storage, smartphones, and active database transcripts.',
    implication: 'Drastically simplifies direct admission of digital evidence, recognizing modern technological ecosystems without tedious secondary proof stages.',
    punishmentChange: 'N/A (Evidentiary procedural upgrade)'
  },
  {
    title: 'Police Custody Durations',
    oldAct: 'Code of Criminal Procedure (CrPC), 1973',
    oldSection: 'Section 167(2)',
    newAct: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
    newSection: 'Section 187',
    similarities: 'Retains judicial oversight on remand extensions and fundamental liberties.',
    differences: 'BNSS Section 187 permits police custody of up to 15 days, but allows this custody to be taken in tranches spread across the first 40 days (for lesser offences) or 60 days (for major crimes). Under CrPC, the 15-day custody had to be completed in the very first 15 days.',
    implication: 'Gives investigative authorities greater leverage to re-examine accused after fresh forensic or co-accused data emerges, but raises civil liberties debates.',
    punishmentChange: 'Flexible tranche allocation instead of contiguous initial duration.'
  },
  {
    title: 'Cheating / Fraudulent Inducement',
    oldAct: 'Indian Penal Code (IPC), 1860',
    oldSection: 'Section 420',
    newAct: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    newSection: 'Section 318',
    similarities: 'Deals with cheating and dishonestly inducing delivery of property.',
    differences: 'Section 318 is highly modernized to address digital transactions, online impersonations, and systemic digital escrow fraud.',
    implication: 'Easier to frame charges for modern UPI frauds, online retail scams, and dark-pattern baiting.',
    punishmentChange: 'Imprisonment up to 7 years and fine.'
  },
  {
    title: 'Sedition vs. Acts Endangering Sovereignty',
    oldAct: 'Indian Penal Code (IPC), 1860',
    oldSection: 'Section 124A',
    newAct: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    newSection: 'Section 152',
    similarities: 'Deals with security of the State and speech/actions that threaten state integrity.',
    differences: 'The archaic word "Sedition" is repealed. BNS Section 152 penalizes acts endangering sovereignty, unity, and integrity of India, explicitly targeting secession, armed rebellion, or subversive activities through words, signs, or digital channels.',
    implication: 'Broadens the scope from "bringing hatred/disaffection" to material acts undermining physical sovereignty, adding digital and financial warfare to definitions.',
    punishmentChange: 'Increases minimum punishment from 3 years to 7 years, up to life imprisonment.'
  }
];

export const mockDraftTemplates = {
  notice: `LEGAL NOTICE

To,
[Recipient Name]
[Recipient Address]

SUBJECT: LEGAL NOTICE FOR BREACH OF CONTRACT AND OUTSTANDING DUES

Dear Sir/Madam,

Under instructions from and on behalf of my client, [Client Name], resident of [Client Address], I hereby serve you with this Legal Notice under relevant provisions of the Bharatiya Nyaya Sanhita (BNS), 2023 and the Indian Contract Act, 1872:

1. That my client entered into an agreement dated [Agreement Date] for the provision of services as detailed in the contract terms.
2. That in compliance with the terms of the said agreement, my client duly executed their obligations and raised Invoice No. [Invoice Details] for a sum of INR [Amount Dues].
3. That despite repeated reminders, you have failed, neglected, and defaulted in clearing the outstanding payments, thereby committing a material breach of trust and causing wrongful loss to my client.

Therefore, I hereby call upon you to pay the sum of INR [Amount Dues] along with interest at 18% per annum from the date of default within 15 days of receipt of this notice, failing which my client shall be constrained to initiate appropriate civil and criminal proceedings under Section 318 (Cheating) and Section 316 (Criminal Breach of Trust) of the Bharatiya Nyaya Sanhita (BNS), 2023.

Yours faithfully,

[Advocate Name]
Advocate, High Court`,

  complaint: `IN THE COURT OF THE METROPOLITAN MAGISTRATE, NEW DELHI
CRIMINAL COMPLAINT NO. _______ OF 2026

IN THE MATTER OF:
[Client Name]                                             ... COMPLAINANT

VERSUS

[Accused Name]                                            ... ACCUSED

COMPLAINT UNDER SECTION 223 OF THE BHARATIYA NAGARIK SURAKSHA SANHITA (BNSS), 2023 FOR OFFENCES UNDER SECTIONS 316, 318, AND 319 OF THE BHARATIYA NYAYA SANHITA (BNS), 2023.

MOST RESPECTFULLY SHOWETH:

1. That the Complainant is a law-abiding citizen residing at [Client Address], engaged in business.
2. That the Accused approached the Complainant in [Month, Year] representing themselves as an authorized agent for [Business Scheme Name] and dishonestly induced the Complainant to transfer funds.
3. That the Complainant, trusting the representations, transferred INR [Amount] via electronic banking on [Transaction Date].
4. That the representations made by the Accused were false, fabricated, and designed specifically to deceive the Complainant, constituting fraud.

PRAYER:
In light of the above facts, it is most respectfully prayed that this Hon'ble Court may be pleased to:
a) Summon the accused under Sections 316 and 318 of the BNS, 2023.
b) Direct police investigation under Section 175(3) of the BNSS, 2023.
c) Direct restitution of the defrauded sum of INR [Amount].

COMPLAINANT
THROUGH ADVOCATE`,

  petition: `IN THE HIGH COURT OF JUDICATURE AT BOMBAY
WRIT PETITION NO. _______ OF 2026

(UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA)

IN THE MATTER OF:
[Petitioner Name]                                         ... PETITIONER

VERSUS

STATE OF MAHARASHTRA & ANR.                               ... RESPONDENTS

PETITION FOR ISSUANCE OF A WRIT OF MANDAMUS OR ANY OTHER APPROPRIATE WRIT FOR PROTECTION OF LIFE AND LIBERTY IN CONJUNCTION WITH SECTION 172 OF BNSS, 2023.

TO THE HON'BLE CHIEF JUSTICE AND OTHER COMPANION JUSTICES OF THE HIGH COURT:

THE HUMBLE PETITION OF THE PETITIONER ABOVE NAMED:

1. That the Petitioner is a permanent resident of Mumbai, seeking emergency directions for protective custody and fair investigation.
2. That on [Incident Date], Respondent No. 2 registered a false FIR No. [FIR Details] under Section 115 (Voluntarily causing hurt) of the BNS, 2023 without complying with preliminary inquiry procedures as mandated under Section 173(3) of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.
3. That the actions of the state authorities are in direct violation of the Petitioner's fundamental rights guaranteed under Articles 14 and 21 of the Constitution of India.

PRAYER:
The Petitioner therefore prays:
a) Issue a Writ of Mandamus directing Respondents to produce case diaries as per Section 172 of the BNSS, 2023.
b) Grant ad-interim stay on all coercive actions against the petitioner.

PETITIONER
THROUGH ADVOCATE`,

  agreement: `SERVICE AND NON-DISCLOSURE AGREEMENT

This Agreement is executed on this [Day] day of [Month], 2026 at [City, State] by and between:

[Company Name], a corporate entity incorporated under the Companies Act, 2013, having its registered office at [Company Address] (hereinafter referred to as the "Client") of the FIRST PART;

AND

[Provider Name], an individual contractor residing at [Provider Address] (hereinafter referred to as the "Service Provider") of the SECOND PART.

WHEREAS:
1. The Client requires premium consultation and drafting services under Indian Law.
2. The Service Provider agrees to perform these services as per scheduled timelines.

NOW THEREFORE, IT IS AGREED AS FOLLOWS:

1. SCOPE OF SERVICES:
The Service Provider shall execute drafting, case law analyses, and compliance reports in line with the Bharatiya Nyaya Sanhita (BNS), 2023.

2. CONFIDENTIALITY:
The Service Provider shall not disclose any trade secrets or case files. Any breach of confidentiality shall invite action for Criminal Breach of Trust under Section 316 of the BNS, 2023, in addition to civil damages.

3. JURISDICTION:
This Agreement shall be governed by Indian Law. All disputes shall be subject to exclusive jurisdiction of courts in [City, State].

IN WITNESS WHEREOF, the parties hereto have signed this Agreement.

__________________                          __________________
CLIENT                                      SERVICE PROVIDER`
};

// Simulated Database / Cache State
let chatSessions: ChatMessage[] = [...mockHistory];
let activeResearch: DeepResearchSession | null = null;
let savedDrafts: DraftDocument[] = [
  {
    id: 'd1',
    title: 'Standard Notice for UPI Payment Failure',
    type: 'notice',
    content: mockDraftTemplates.notice,
    lastUpdated: new Date(),
    meta: {
      parties: 'Kumar Exports vs. Mehta Pay',
      jurisdiction: 'New Delhi',
      applicableActs: 'BNS Sec 318, Indian Contract Act Sec 73'
    }
  }
];

export const APIService = {
  // Simulate POST /ask
  async askQuestion(question: string): Promise<ChatMessage> {
    await delay(1800); // simulate real deep processing lag
    const textLower = question.toLowerCase();

    let responseText = `I have analyzed your query regarding Indian Law. Under the recently enacted legal codes—the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA)—this query touches on key procedural and substantive frameworks.`;
    let citations: LegalCitation[] = [];
    let cases: CaseLaw[] = [];
    let confidence = 94;

    if (textLower.includes('murder') || textLower.includes('lynch') || textLower.includes('killing') || textLower.includes('103')) {
      responseText = `Under the Bharatiya Nyaya Sanhita (BNS), 2023, the law regarding **murder** has been consolidated under **Section 103** (replacing the old Section 302 of the IPC). 

Notably, **Section 103(2)** introduces a landmark amendment specifically penalizing **mob lynching**:
* **Definition**: When a group of five or more persons acts in concert to commit murder on grounds of race, caste, community, sex, place of birth, language, personal belief, or any other similar ground.
* **Punishment**: Each member of such a group is punishable with the **death penalty** or **imprisonment for life**, and shall also be liable to a substantial fine.
* **Legal Precedent**: This provision directly incorporates the directives issued by the Supreme Court in *Tehseen S. Poonawalla v. Union of India (2018)*.`;
      
      citations = [
        {
          act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
          section: 'Section 103(1)',
          title: 'Punishment for Murder',
          relevance: 'Standard charge for murder replacing IPC 302.',
          type: 'BNS'
        },
        {
          act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
          section: 'Section 103(2)',
          title: 'Murder by Group (Mob Lynching)',
          relevance: 'Introduces life imprisonment or death penalty for hate-motivated group murder.',
          type: 'BNS'
        }
      ];

      cases = [
        {
          title: 'Tehseen S. Poonawalla v. Union of India',
          citation: '(2018) 9 SCC 501',
          year: 2018,
          court: 'Supreme Court of India',
          summary: 'The apex court issued comprehensive guidelines to prevent, deter, and penalize mob violence and lynching, which led directly to the codification of BNS Section 103(2).'
        }
      ];
      confidence = 98;
    } else if (textLower.includes('electronic') || textLower.includes('digital') || textLower.includes('65b') || textLower.includes('whatsapp') || textLower.includes('evidence')) {
      responseText = `The admissibility of **electronic and digital evidence** has been highly modernized under the **Bharatiya Sakshya Adhiniyam (BSA), 2023**, which repeals and replaces the Indian Evidence Act (IEA), 1872.

Under **Section 61** of the BSA, electronic records are given equal status to paper documents. 
**Section 63** replaces the controversial Section 65B of the old IEA, detailing the conditions for admissibility:
* **Scope Expansion**: Digital evidence explicitly covers data stored in servers, active databases, cloud containers, smartphones, laptops, server logs, GPS logs, and encrypted messaging platforms like WhatsApp or Signal.
* **Certificate Requirement**: A certificate signed by a person in charge of the device or a certified forensic expert is still required to prove integrity (Section 63(4)), but the process has been streamlined to prevent arbitrary rejections.`;

      citations = [
        {
          act: 'Bharatiya Sakshya Adhiniyam (BSA), 2023',
          section: 'Section 61 & 62',
          title: 'Admissibility of Electronic Records',
          relevance: 'Elevates digital records to primary evidence, replacing archaic IEA provisions.',
          type: 'BSA'
        },
        {
          act: 'Bharatiya Sakshya Adhiniyam (BSA), 2023',
          section: 'Section 63',
          title: 'Certificate of Electronic Evidence Integrity',
          relevance: 'Lays down strict criteria and templates for validating digital storage logs (replacing old 65B certificates).',
          type: 'BSA'
        }
      ];

      cases = [
        {
          title: 'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal',
          citation: '(2020) 7 SCC 1',
          year: 2020,
          court: 'Supreme Court of India',
          summary: 'Ruled that a Section 65B certificate is a condition precedent to the admissibility of secondary electronic records. BSA Section 63 codifies this by providing standard form templates in its Schedule.'
        }
      ];
      confidence = 96;
    } else if (textLower.includes('cheating') || textLower.includes('fraud') || textLower.includes('420') || textLower.includes('318')) {
      responseText = `In the **Bharatiya Nyaya Sanhita (BNS), 2023**, the offence of **cheating** is categorized under **Section 318**, which fully replaces the iconic **Section 420** of the Indian Penal Code (IPC).

* **Substantive Offence (Section 318(1))**: Defines cheating as inducing any person to deliver property or commit acts they would not otherwise do.
* **Aggravated Cheating (Section 318(4))**: If cheating is done with knowledge that wrongful loss may ensue to a person whose interest the offender was bound to protect, or involves fraudulent delivery of valuable security, the punishment is up to **7 years imprisonment** along with a fine.
* **Digital Fraud Integration**: Section 318 specifically integrates modern modes of cyber-fraud, digital baiting, UPI credential spoofing, and fictitious digital escrow accounts within its scope of prosecution.`;

      citations = [
        {
          act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
          section: 'Section 318(4)',
          title: 'Cheating and Dishonestly Inducing Delivery of Property',
          relevance: 'The direct successor to IPC Section 420. Carries up to 7 years in prison.',
          type: 'BNS'
        }
      ];

      cases = [
        {
          title: 'State of Haryana v. Bhajan Lal',
          citation: '1992 Supp (1) SCC 335',
          year: 1992,
          court: 'Supreme Court of India',
          summary: 'Established principles for quashing FIRs including those of cheating where no prima facie case exists. Applicable to charges brought under the new BNS Section 318.'
        }
      ];
      confidence = 97;
    } else if (textLower.includes('promise of marriage') || textLower.includes('69') || textLower.includes('sexual')) {
      responseText = `The **Bharatiya Nyaya Sanhita (BNS), 2023** introduces a brand new, highly debated statutory offence under **Section 69**, which has no direct standalone equivalent in the old IPC.

* **The Provision**: Penalizes any person who, by **deceitful means** or by making a **promise to marry** without any intention of fulfilling it, has sexual intercourse with a woman.
* **Deceitful Means Defined**: Explicitly includes false promises of employment, promotion, inducement, or marrying under a false identity.
* **Punishment**: Imprisonment of either description for a term which may extend to **10 years** and shall also be liable to a fine.
* **Legal Context**: Previously, such cases were prosecuted under Section 375 (Rape) claiming "consent was obtained under misconception of fact" (Section 90 IPC). Section 69 creates a distinct category, explicitly stating it does not amount to rape, but carries severe penal consequences.`;

      citations = [
        {
          act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
          section: 'Section 69',
          title: 'Sexual Intercourse on False Promise of Marriage',
          relevance: 'Brand new distinct statutory offence carrying up to 10 years in prison.',
          type: 'BNS'
        }
      ];
      confidence = 99;
    } else if (textLower.includes('custody') || textLower.includes('police remand') || textLower.includes('167') || textLower.includes('187')) {
      responseText = `The timeline and rules for **Police Remand and Custody** have undergone a massive shift under **Section 187** of the **Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023** (which replaces CrPC Section 167).

Key changes include:
* **The Tranche Clause**: Under the old CrPC, police custody was capped at 15 days, and it *had* to be authorized within the first 15 days of arrest. Under BNSS Section 187, police custody can still be granted for up to 15 days, but this custody can be sought in **tranches/intervals** spread across the first **40 days** (for offences punishable up to 10 years) or **60 days** (for major offences carrying life or death penalties).
* **Implication**: This significantly assists investigative agencies in complex corporate frauds, terrorist activities, or multi-state cartels where fresh evidence or co-accused arrests take weeks to materialize.
* **Debate**: This has drawn focus from human rights legal experts who argue that intermittent police custody leaves the accused vulnerable to custodial coercion over a prolonged initial investigation period.`;

      citations = [
        {
          act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
          section: 'Section 187(2)',
          title: 'Procedure when investigation cannot be completed in twenty-four hours',
          relevance: 'Replaces CrPC 167. Allows flexible tranching of 15-day custody over a 40/60 day bracket.',
          type: 'BNSS'
        }
      ];
      confidence = 95;
    } else {
      // General response
      responseText = `Based on the parameters of Indian Jurisprudence (including the newly integrated BNS, BNSS, and BSA criminal codes of 2023), I have performed a semantic search across our vector database of statutory acts, legislative commentaries, and High Court/Supreme Court precedents.

To give you an accurate, citation-backed response, please let me know which specific branch or act you are addressing. You can ask me to:
1. **Analyze Substantive Offences** (e.g., Mob Lynching under BNS Sec 103, Sexual Intercourse on promise of marriage under BNS Sec 69, Cheating under BNS Sec 318).
2. **Review Criminal Procedure & Remand** (e.g., BNSS Sec 187 police custody, preliminary inquiry rules under BNSS Sec 173).
3. **Consult Evidentiary Admissibility** (e.g., Admitting WhatsApp chat history as primary evidence under BSA Sec 61-63).

How would you like to structure our legal consultation?`;
      citations = [
        {
          act: 'Constitution of India',
          section: 'Article 21',
          title: 'Protection of Life and Personal Liberty',
          relevance: 'Overriding constitutional mandate governing all procedure and penalties.',
          type: 'IPC'
        }
      ];
      confidence = 92;
    }

    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'assistant',
      text: responseText,
      timestamp: new Date(),
      citations: citations.length > 0 ? citations : undefined,
      cases: cases.length > 0 ? cases : undefined,
      confidence,
      thinkingTime: parseFloat((1.2 + Math.random() * 1.5).toFixed(1))
    };

    chatSessions.push(newMsg);
    return newMsg;
  },

  // Simulate POST /voice-chat
  async streamVoiceInteraction(userUtterance: string): Promise<{ transcript: string; replyText: string; audioDurationSec: number }> {
    await delay(1200);
    const textLower = userUtterance.toLowerCase();
    let replyText = "Understood. I am accessing the Bharatiya Nyaya Sanhita repository to match your vocal inquiry.";
    let duration = 4.5;

    if (textLower.includes('murder') || textLower.includes('103')) {
      replyText = "Section 103 of the BNS governs murder. Sub-clause two specifically penalizes group killings, or mob lynching, with death or life imprisonment.";
      duration = 6.2;
    } else if (textLower.includes('evidence') || textLower.includes('whatsapp') || textLower.includes('63')) {
      replyText = "Under Section 63 of the new Bharatiya Sakshya Adhiniyam, digital logs, servers, and WhatsApp chats require an electronic certificate to prove data integrity.";
      duration = 7.8;
    }

    return {
      transcript: userUtterance,
      replyText,
      audioDurationSec: duration
    };
  },

  // Simulate POST /research
  async startDeepResearch(goal: string, updateProgress: (step: string, percent: number) => void): Promise<DeepResearchSession> {
    updateProgress("Parsing research goal and extracting statutory concepts...", 15);
    await delay(1000);
    
    updateProgress("Generating tactical legal research planner...", 35);
    const planner: ResearchPlanStep[] = [
      { id: 'p1', title: 'Identify core statutory offences under BNS 2023', status: 'completed', sourcesFound: 3 },
      { id: 'p2', title: 'Cross-reference procedural mandates under BNSS 187', status: 'completed', sourcesFound: 2 },
      { id: 'p3', title: 'Audit admissibility parameters under BSA Section 63', status: 'processing', sourcesFound: 5 },
      { id: 'p4', title: 'Sift Supreme Court precedents (2018-2025)', status: 'pending', sourcesFound: 0 }
    ];
    await delay(1000);

    updateProgress("Ingesting evidentiary artifacts and mapping timelines...", 60);
    const timeline: EvidenceTimelineEvent[] = [
      {
        date: '2026-05-10',
        title: 'Initial Contract Execution',
        description: 'Parties sign the Cloud Hosting SLA in Mumbai.',
        factType: 'undisputed',
        source: 'Exhibit A - SLA PDF'
      },
      {
        date: '2026-06-15',
        title: 'Server Log Spikes & UPI Outage',
        description: 'Payment gateway fails during peak transit, trigger electronic breach.',
        factType: 'critical',
        source: 'Exhibit B - AWS CloudTrail Logs'
      },
      {
        date: '2026-06-18',
        title: 'Disputed WhatsApp Correspondence',
        description: 'Accused promises refund of INR 45 Lakhs but later blocks the phone.',
        factType: 'disputed',
        source: 'Exhibit C - WhatsApp Chat Export'
      }
    ];
    await delay(1200);

    updateProgress("Synthesizing final legal intelligence report...", 90);
    await delay(800);

    const reportMarkdown = `# LEGAL INTELLIGENCE BRIEF: CONTRACTUAL ESCROW FRAUD
**Prepared by**: BNS AI Deep Research Engine
**Focus Statutes**: BNS, 2023 (Sec 316, 318) | BNSS, 2023 (Sec 173, 187) | BSA, 2023 (Sec 63)

## 1. Substantive Liability Assessment
The transaction log dated June 15, combined with the WhatsApp logs dated June 18, prima facie satisfies the criteria for **Cheating and Dishonestly Inducing Delivery of Property** under **Section 318(4) of the Bharatiya Nyaya Sanhita (BNS), 2023** (formerly Section 420 IPC). 

The deliberate omission to refund despite holding liquid assets establishes *fraudulent intent at inception*, which is a vital prerequisite to criminalize a civil contract breach.

## 2. Evidentiary Admissibility (Digital Assets)
To successfully introduce the AWS server logs and WhatsApp chat snapshots, the prosecution must strictly satisfy **Section 63 of the Bharatiya Sakshya Adhiniyam (BSA), 2023**:
1. **Forensic Integrity**: Provide a digital certificate signed by the IT Administrator conforming to the BSA Schedule.
2. **Device Custody**: Confirm that the mobile handset and server node operated continuously without unauthorized access.

## 3. Defense Sifting & Weakness Profile
* **Defense Pitch**: The counterparty will argue that the UPI server outage was an "Act of God" / force majeure, attempting to re-route this to a standard commercial arbitration chamber.
* **Counter-Strategy**: Rely on the WhatsApp logs of June 18 which show they actively diverted funds to alternate personal accounts rather than attempting to retry the failed transaction pipeline.`;

    const session: DeepResearchSession = {
      goal,
      planner: planner.map(p => ({ ...p, status: 'completed', sourcesFound: p.sourcesFound || 4 })),
      timeline,
      acts: [
        { act: 'BNS 2023', section: 'Section 318', title: 'Cheating', relevance: 'Governs escrow diversion.', type: 'BNS' },
        { act: 'BSA 2023', section: 'Section 63', title: 'Admissibility of electronic logs', relevance: 'Governs server backups.', type: 'BSA' }
      ],
      judgments: [
        { title: 'Sushil Sethi v. State of Arunachal Pradesh', citation: '(2020) 3 SCC 240', year: 2020, court: 'Supreme Court', summary: 'Distinguished between simple breach of contract and criminal cheating, demanding proof of dishonest intent at inception.' }
      ],
      reportMarkdown,
      status: 'done'
    };

    activeResearch = session;
    return session;
  },

  // Simulate POST /draft
  async generateLegalDraft(type: 'notice' | 'complaint' | 'petition' | 'agreement', variables: Record<string, string>): Promise<string> {
    await delay(1500);
    let template = mockDraftTemplates[type];
    
    // Replace placeholder tags like [Client Name] with user values
    Object.entries(variables).forEach(([key, val]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      template = template.replace(regex, val);
    });

    // Replace standard defaults if some are missing
    const defaultReplacements = {
      'Client Name': 'Amit Verma',
      'Client Address': 'C-45, Vasant Vihar, New Delhi - 110057',
      'Recipient Name': 'ICICI Merchants Private Ltd.',
      'Recipient Address': 'Bandra Kurla Complex, Mumbai - 400051',
      'Agreement Date': '12th January, 2025',
      'Amount Dues': '15,50,000/-',
      'Amount': '15,50,000/-',
      'Advocate Name': 'Sanjay K. Roy, Senior Counsel',
      'Accused Name': 'Rakesh Jhunjhunwala (CEO)',
      'Transaction Date': '15th June, 2025',
      'Petitioner Name': 'Devika Sen',
      'Incident Date': '3rd March, 2026',
      'FIR Details': 'FIR No. 104 of 2026 at Saket PS',
      'Company Name': 'Sovereign Tech India Pvt. Ltd.',
      'Company Address': 'Outer Ring Road, Bengaluru',
      'Provider Name': 'Dr. Alok Nath, Forensic Specialist',
      'Provider Address': 'Sector 15, Noida',
      'Day': '9th',
      'Month': 'July',
      'City, State': 'New Delhi'
    };

    Object.entries(defaultReplacements).forEach(([key, val]) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g');
      template = template.replace(regex, val);
    });

    // Save draft to local cache
    savedDrafts.push({
      id: Math.random().toString(36).substring(7),
      title: `Generated ${type.toUpperCase()} - ${variables.parties || 'Client Case'}`,
      type,
      content: template,
      lastUpdated: new Date(),
      meta: {
        parties: variables.parties || 'Confidential Parties',
        jurisdiction: variables.jurisdiction || 'High Court of Delhi',
        applicableActs: type === 'notice' || type === 'complaint' ? 'BNS Sec 318, 316' : 'BNSS Sec 187'
      }
    });

    return template;
  },

  // Get current list of generated drafts
  getDrafts(): DraftDocument[] {
    return savedDrafts;
  },

  // Save/Update draft content
  updateDraft(id: string, content: string): void {
    const draft = savedDrafts.find(d => d.id === id);
    if (draft) {
      draft.content = content;
      draft.lastUpdated = new Date();
    }
  }
};
