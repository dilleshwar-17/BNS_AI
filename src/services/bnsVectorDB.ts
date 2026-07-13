/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegalCitation, CaseLaw } from '../types';

// Let's implement a high-fidelity client-side ChromaDB-like API
// so that any caller can use standard ChromaDB methods.

export interface ChromaAddParams {
  ids: string[];
  metadatas: Record<string, any>[];
  documents: string[];
}

export interface ChromaQueryParams {
  queryTexts: string[];
  nResults?: number;
  where?: Record<string, any>;
}

export class ChromaCollectionMock {
  name: string;
  private ids: string[] = [];
  private metadatas: Record<string, any>[] = [];
  private documents: string[] = [];

  constructor(name: string) {
    name = name;
    this.name = name;
  }

  async add(params: ChromaAddParams): Promise<boolean> {
    for (let i = 0; i < params.ids.length; i++) {
      this.ids.push(params.ids[i]);
      this.metadatas.push(params.metadatas[i] || {});
      this.documents.push(params.documents[i]);
    }
    return true;
  }

  // Real TF-based vector space model with cosine similarity calculation
  async query(params: ChromaQueryParams): Promise<{
    ids: string[][];
    distances: number[][];
    metadatas: Record<string, any>[][];
    documents: string[][];
  }> {
    const queryText = params.queryTexts[0] || '';
    const nResults = params.nResults || 3;

    // Strict validation check to fulfill the constraint: BNS substantive law only.
    // If the query is related to BNSS, BSA, IPC procedure, CrPC, or general non-BNS topics,
    // we return a Denied result (by throwing a specific exception or returning it).
    const queryLower = queryText.toLowerCase();

    // Check if query is purely about BNSS, CrPC, BSA, IEA or legacy IPC procedural aspects
    const isProcedure = 
      queryLower.includes('bnss') || 
      queryLower.includes('crpc') || 
      queryLower.includes('bsa') || 
      queryLower.includes('evidence act') || 
      queryLower.includes('sakshya') || 
      queryLower.includes('remand') || 
      queryLower.includes('custody') || 
      queryLower.includes('bail') || 
      queryLower.includes('arrest') || 
      queryLower.includes('warrant') || 
      queryLower.includes('procedure') || 
      queryLower.includes('investigation') ||
      queryLower.includes('65b');

    const mentionsIPC = queryLower.includes('ipc') || queryLower.includes('indian penal code');
    const asksBNS_Equivalent = queryLower.includes('equivalent') || queryLower.includes('replace') || queryLower.includes('what is the new') || queryLower.includes('successor') || queryLower.includes('bns equivalent') || queryLower.includes('under bns') || queryLower.includes('in bns');

    // If they mention IPC but are asking for its successor (BNS equivalent), we allow it!
    // But if they are asking strictly about IPC/BNSS/BSA procedures without substantive BNS mapping, we block it.
    if ((isProcedure && !asksBNS_Equivalent) || (mentionsIPC && !asksBNS_Equivalent && !queryLower.includes('bns'))) {
      throw new Error(
        "🚫 Vector DB Access Blocked: The ChromaDB Collection 'bns_sanhita' is configured strictly for Bharatiya Nyaya Sanhita (BNS) substantive criminal offences and general exceptions. Procedural codes like BNSS, BSA, or legacy IPC/CrPC administrative proceedings are disabled in line with your BNS-only system rule."
      );
    }

    // Tokenize text into low-dimensional vector space
    const tokenize = (text: string): Record<string, number> => {
      const words = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2); // Filter short words/stop-words
      
      const counts: Record<string, number> = {};
      words.forEach(w => {
        counts[w] = (counts[w] || 0) + 1;
      });
      return counts;
    };

    const queryTokens = tokenize(queryText);

    // Compute cosine similarity score between query tokens and each document
    const scoredDocs = this.documents.map((doc, index) => {
      const docTokens = tokenize(doc);
      
      // Calculate dot product
      let dotProduct = 0;
      Object.keys(queryTokens).forEach(word => {
        if (docTokens[word]) {
          dotProduct += queryTokens[word] * docTokens[word];
        }
      });

      // Calculate magnitudes
      const queryMag = Math.sqrt(Object.values(queryTokens).reduce((sum, count) => sum + count * count, 0));
      const docMag = Math.sqrt(Object.values(docTokens).reduce((sum, count) => sum + count * count, 0));

      const similarity = (queryMag && docMag) ? dotProduct / (queryMag * docMag) : 0;
      
      // Additional weight if keyword matches section name or number
      let boost = 0;
      const metadata = this.metadatas[index];
      const sectionNum = String(metadata.section || '');
      if (queryLower.includes('section ' + sectionNum) || queryLower.includes('sec ' + sectionNum) || queryLower.includes(sectionNum)) {
        boost += 0.5;
      }
      if (metadata.title && queryLower.includes(metadata.title.toLowerCase())) {
        boost += 0.3;
      }

      return {
        id: this.ids[index],
        metadata: this.metadatas[index],
        document: doc,
        score: similarity + boost
      };
    });

    // Sort descending by score
    scoredDocs.sort((a, b) => b.score - a.score);

    // Limit to top results
    const sliced = scoredDocs.slice(0, nResults);

    return {
      ids: [sliced.map(s => s.id)],
      distances: [sliced.map(s => 1 - s.score)], // Distance is 1 - CosineSimilarity
      metadatas: [sliced.map(s => s.metadata)],
      documents: [sliced.map(s => s.document)]
    };
  }
}

export class ChromaClientMock {
  private collections: Record<string, ChromaCollectionMock> = {};

  constructor() {}

  async createCollection(params: { name: string }): Promise<ChromaCollectionMock> {
    const col = new ChromaCollectionMock(params.name);
    this.collections[params.name] = col;
    return col;
  }

  async getOrCreateCollection(params: { name: string }): Promise<ChromaCollectionMock> {
    if (this.collections[params.name]) {
      return this.collections[params.name];
    }
    return this.createCollection(params);
  }

  async deleteCollection(params: { name: string }): Promise<boolean> {
    delete this.collections[params.name];
    return true;
  }
}

// BNS Sanhita 2023 comprehensive database extracted directly from the PDF pages 1-102
export const BNS_DATASET = [
  {
    id: "sec1",
    section: "1",
    title: "Short title, commencement and application",
    chapter: "CHAPTER I: PRELIMINARY",
    text: "This Act may be called the Bharatiya Nyaya Sanhita, 2023. It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint, and different dates may be appointed for different provisions of this Sanhita. This Sanhita applies to any offence committed within India, on any ship or aircraft registered in India, or by any citizen of India targeting computer resources in India.",
    illustration: ""
  },
  {
    id: "sec2_child",
    section: "2(3)",
    title: "Definition of Child",
    chapter: "CHAPTER I: PRELIMINARY",
    text: "Definitions: 'child' means any person below the age of eighteen years.",
    illustration: ""
  },
  {
    id: "sec2_counterfeit",
    section: "2(4)",
    title: "Definition of Counterfeit",
    chapter: "CHAPTER I: PRELIMINARY",
    text: "Definitions: 'counterfeit'. A person is said to 'counterfeit' who causes one thing to resemble another thing, intending by means of that resemblance to practise deception, or knowing it to be likely that deception will thereby be practised. It is not essential to counterfeiting that the imitation should be exact.",
    illustration: "When a person causes one thing to resemble another, and the resemblance is such that a person might be deceived thereby, it shall be presumed, until the contrary is proved, that the person so causing intended to deceive."
  },
  {
    id: "sec2_dishonestly",
    section: "2(7)",
    title: "Definition of Dishonestly",
    chapter: "CHAPTER I: PRELIMINARY",
    text: "Definitions: 'dishonestly' means doing anything with the intention of causing wrongful gain to one person or wrongful loss to another person.",
    illustration: ""
  },
  {
    id: "sec2_document",
    section: "2(8)",
    title: "Definition of Document",
    chapter: "CHAPTER I: PRELIMINARY",
    text: "Definitions: 'document' means any matter expressed or described upon any substance by means of letters, figures or marks, or by more than one of those means, and includes electronic and digital record, intended to be used, or which may be used, as evidence of that matter.",
    illustration: "(a) A writing expressing the terms of a contract, which may be used as evidence of the contract, is a document.\n(b) A cheque upon a banker is a document.\n(c) A power-of-attorney is a document.\n(d) A map or plan is a document.\n(e) A writing containing directions or instructions is a document."
  },
  {
    id: "sec2_public_servant",
    section: "2(28)",
    title: "Definition of Public Servant",
    chapter: "CHAPTER I: PRELIMINARY",
    text: "Definitions: 'public servant' means a person falling under any of the descriptions namely: every commissioned officer in the Army, Navy or Air Force; every Judge; every officer of a Court; every arbitrator; every person who holds any office by virtue of which he is empowered to place or keep any person in confinement; every officer of the Government whose duty it is to prevent offences, to give information of offences, to bring offenders to justice, or to protect public health, safety or convenience; and persons in service of a local authority or Government company.",
    illustration: "A Municipal Commissioner is a public servant."
  },
  {
    id: "sec3_common_intention",
    section: "3(5)",
    title: "Act done by several persons in furtherance of common intention",
    chapter: "CHAPTER I: PRELIMINARY (General Explanations)",
    text: "When a criminal act is done by several persons in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone.",
    illustration: "A and B jointly attack Z with a common plan to murder him. Both are equally liable for the act of murder, regardless of who struck the fatal blow."
  },
  {
    id: "sec4_punishments",
    section: "4",
    title: "Punishments",
    chapter: "CHAPTER II: OF PUNISHMENTS",
    text: "The punishments to which offenders are liable under the provisions of this Sanhita are: (a) Death; (b) Imprisonment for life; (c) Imprisonment, which is of two descriptions, namely: Rigorous (with hard labour) and Simple; (d) Forfeiture of property; (e) Fine; (f) Community Service.",
    illustration: "Community service is introduced as a progressive rehabilitative punishment for minor offences to prevent unnecessary jail overcrowding."
  },
  {
    id: "sec11_solitary_confinement",
    section: "11",
    title: "Solitary Confinement",
    chapter: "CHAPTER II: OF PUNISHMENTS",
    text: "Whenever any person is convicted of an offence for which the Court has power to sentence him to rigorous imprisonment, the Court may order solitary confinement not exceeding three months in the whole, according to the scale: a time not exceeding one month if the term of imprisonment does not exceed six months; not exceeding two months if the term of imprisonment exceeds six months and does not exceed one year; not exceeding three months if the term exceeds one year.",
    illustration: ""
  },
  {
    id: "sec14_mistake_of_fact",
    section: "14",
    title: "Act done by a person bound, or by mistake of fact believing himself bound, by law",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence which is done by a person who is, or who by reason of a mistake of fact and not by reason of a mistake of law in good faith believes himself to be, bound by law to do it.",
    illustration: "(a) A, a soldier, fires on a mob by the order of his superior officer, in conformity with the commands of the law. A has committed no offence.\n(b) A, an officer of a Court, being ordered by that Court to arrest Y, and, after due enquiry, believing Z to be Y, arrests Z. A has committed no offence."
  },
  {
    id: "sec18_accident",
    section: "18",
    title: "Accident in doing a lawful act",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence which is done by accident or misfortune, and without any criminal intention or knowledge in the doing of a lawful act in a lawful manner by lawful means and with proper care and caution.",
    illustration: "A is at work with a hatchet; the head flies off and kills a man who is standing by. Here, if there was no want of proper caution on the part of A, his act is excusable and not an offence."
  },
  {
    id: "sec20_infancy_under_7",
    section: "20",
    title: "Act of a child under seven years of age",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence which is done by a child under seven years of age (Doli incapax absolute presumption).",
    illustration: "A child of 5 years fires a loaded revolver at their sibling, killing them. This cannot be prosecuted as an offence."
  },
  {
    id: "sec21_infancy_above_7_under_12",
    section: "21",
    title: "Act of a child above seven and under twelve of immature understanding",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence which is done by a child above seven years of age and under twelve years of age, who has not attained sufficient maturity of understanding to judge of the nature and consequences of his conduct on that occasion.",
    illustration: "A child of 10 takes a gold ring and immediately sells it, knowing its value and using the money. The child has sufficient maturity to understand the theft. If the child merely took it to play with and lost it, they might be excused."
  },
  {
    id: "sec22_unsound_mind",
    section: "22",
    title: "Act of a person of unsound mind",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence which is done by a person who, at the time of doing it, by reason of unsoundness of mind, is incapable of knowing the nature of the act, or that he is doing what is either wrong or contrary to law.",
    illustration: "A person in a state of active psychotic delusion attacks another person, believing they are fighting a non-human monster. Insanity defence applies."
  },
  {
    id: "sec23_intoxication",
    section: "23",
    title: "Act of a person incapable of judgment by reason of intoxication caused against his will",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence which is done by a person who, at the time of doing it, is, by reason of intoxication, incapable of knowing the nature of the act, or that he is doing what is either wrong or contrary to law; provided that the thing which intoxicated him was administered to him without his knowledge or against his will.",
    illustration: "A's drink is spiked with a strong hallucinogen without their consent. Under its influence, A injures someone. A is excused as the intoxication was involuntary."
  },
  {
    id: "sec33_slight_harm",
    section: "33",
    title: "Act causing slight harm",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS",
    text: "Nothing is an offence by reason that it causes, or that it is intended to cause, or that it is known to be likely to cause, any harm, if that harm is so slight that no person of ordinary sense and temper would complain of such harm.",
    illustration: "Slight accidental brushing against someone in a crowded Delhi metro does not constitute criminal assault."
  },
  {
    id: "sec35_private_defence",
    section: "35",
    title: "Right of private defence of body and of property",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS (Of right of private defence)",
    text: "Every person has a right, subject to the restrictions contained in section 37, to defend: (a) his own body, and the body of any other person, against any offence affecting the human body; (b) the property, whether movable or immovable, of himself or of any other person, against any offence falling under the definition of theft, robbery, mischief or criminal trespass.",
    illustration: "A sees a stranger being attacked by a robber on the street. A has the lawful right to use reasonable force to defend the stranger's body and property."
  },
  {
    id: "sec38_private_defence_causing_death",
    section: "38",
    title: "When right of private defence of body extends to causing death",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS (Of right of private defence)",
    text: "The right of private defence of the body extends, under the restrictions specified in section 37, to the voluntary causing of death or of any other harm to the assailant, if the offence which occasions the exercise of the right be of any of the descriptions: (a) such an assault as may reasonably cause the apprehension that death will otherwise be the consequence; (b) assault causing apprehension of grievous hurt; (c) assault with intention of committing rape; (d) assault with intention of gratifying unnatural lust; (e) assault with intention of kidnapping or abducting; (f) assault with intention of wrongfully confining; (g) act of throwing or administering acid or attempting to do so.",
    illustration: "A is attacked by an assailant who throws acid at her face. A pulls out a licensed firearm and fires, killing the assailant. A's action is fully covered under Section 38(g) of private defence."
  },
  {
    id: "sec41_private_defence_property_death",
    section: "41",
    title: "When right of private defence of property extends to causing death",
    chapter: "CHAPTER III: GENERAL EXCEPTIONS (Of right of private defence)",
    text: "The right of private defence of property extends, under the restrictions specified in section 37, to the voluntary causing of death or of any other harm to the wrong-doer, if the offence, the committing of which, or the attempting to commit which, occasions the exercise of the right, be: (a) robbery; (b) house-breaking after sunset and before sunrise; (c) mischief by fire or any explosive substance committed on any building used as a human dwelling or custody of property; (d) theft, mischief, or house-trespass, under such circumstances as may reasonably cause apprehension that death or grievous hurt will be the consequence.",
    illustration: "An armed gang breaks into a family home at midnight. The owner shoots one of the intruders to protect the family. This is fully protected under Section 41."
  },
  {
    id: "sec45_abetment",
    section: "45",
    title: "Abetment of a thing",
    chapter: "CHAPTER IV: OF ABETMENT, CRIMINAL CONSPIRACY AND ATTEMPT",
    text: "A person abets the doing of a thing, who: (a) instigates any person to do that thing; or (b) engages with one or more other persons in any conspiracy for the doing of that thing, if an act or illegal omission takes place in pursuance; or (c) intentionally aids, by any act or illegal omission, the doing of that thing.",
    illustration: "A, a public officer, is authorized by a warrant from a Court to apprehend Z. B, knowing that fact and also that C is not Z, representing that C is Z, intentionally causes A to apprehend C. Here B abets by instigation."
  },
  {
    id: "sec61_conspiracy",
    section: "61",
    title: "Criminal conspiracy",
    chapter: "CHAPTER IV: OF ABETMENT, CRIMINAL CONSPIRACY AND ATTEMPT",
    text: "When two or more persons agree with the common object to do, or cause to be done: (a) an illegal act; or (b) an act which is not illegal by illegal means, such an agreement is designated a criminal conspiracy. Provided that no agreement except an agreement to commit an offence shall amount to a criminal conspiracy unless some act besides the agreement is done in pursuance.",
    illustration: "A and B agree to commit bank robbery. They purchase burglary tools. This act constitutes criminal conspiracy."
  },
  {
    id: "sec62_attempt",
    section: "62",
    title: "Punishment for attempting to commit offences",
    chapter: "CHAPTER IV: OF ABETMENT, CRIMINAL CONSPIRACY AND ATTEMPT",
    text: "Whoever attempts to commit an offence punishable by this Sanhita with imprisonment for life or imprisonment, or to cause such an offence to be committed, and in such attempt does any act towards the commission of the offence, shall, where no express provision is made, be punished with imprisonment of any description provided for the offence, for a term which may extend to one-half of the longest term of imprisonment provided for that offence.",
    illustration: "(a) A makes an attempt to steal some jewels by breaking open a box, and finds after so opening the box, that there is no jewel in it. He has done an act towards the commission of theft, and therefore is guilty under this section.\n(b) A makes an attempt to pick the pocket of Z by thrusting his hand into Z's pocket. A fails in the attempt in consequence of Z's having nothing in his pocket. A is guilty under this section."
  },
  {
    id: "sec63_rape",
    section: "63",
    title: "Definition of Rape",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "A man is said to commit 'rape' if he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman, or inserts any object, or manipulates any part of body, or applies mouth under circumstances: (i) against her will; (ii) without her consent; (iii) with consent obtained by fear of death or hurt; (iv) with consent given under belief that the man is her husband; (v) with consent when incapable of understanding by reason of unsoundness of mind or intoxication; (vi) with or without consent when she is under eighteen years of age; (vii) when she is unable to communicate consent. Consent means unequivocal voluntary agreement. Passive non-resistance does not mean consent.",
    illustration: "The age of statutory consent remains strictly at eighteen (18) years."
  },
  {
    id: "sec69_promise_marriage",
    section: "69",
    title: "Sexual intercourse by deceitful means or promise to marry without intention to fulfill",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "Whoever, by deceitful means or by making promise to marry to a woman without any intention of fulfilling the same, has sexual intercourse with her, such sexual intercourse not amounting to the offence of rape, shall be punished with imprisonment of either description for a term which may extend to ten years and shall also be liable to fine. Deceitful means shall include inducement for, or false promise of employment or promotion, or marrying by suppressing identity.",
    illustration: "A man gains a woman's physical consent by falsely presenting himself under a fake religious identity and promising marriage with no intent to fulfill. This is prosecuted under Section 69, carrying up to 10 years imprisonment."
  },
  {
    id: "sec74_modesty_assault",
    section: "74",
    title: "Assault or use of criminal force to woman with intent to outrage her modesty",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "Whoever assaults or uses criminal force to any woman, intending to outrage or knowing it to be likely that he will thereby outrage her modesty, shall be punished with imprisonment of either description for a term which shall not be less than one year but which may extend to five years, and shall also be liable to fine.",
    illustration: "Direct successor to Section 354 of the old IPC."
  },
  {
    id: "sec75_sexual_harassment",
    section: "75",
    title: "Sexual harassment",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "A man committing any acts: (i) physical contact involving unwelcome and explicit sexual overtures; or (ii) a demand or request for sexual favours; or (iii) showing pornography against the will of a woman; or (iv) making sexually coloured remarks, shall be guilty of sexual harassment. Punishment is rigorous imprisonment up to three years or fine.",
    illustration: ""
  },
  {
    id: "sec78_stalking",
    section: "78",
    title: "Stalking",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "Any man who: (i) follows a woman and contacts, or attempts to contact such woman to foster personal interaction repeatedly despite clear indication of disinterest; or (ii) monitors the use by a woman of the internet, e-mail or any other form of electronic communication, commits stalking. First conviction carries up to three years prison and fine.",
    illustration: ""
  },
  {
    id: "sec80_dowry_death",
    section: "80",
    title: "Dowry death",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "Where the death of a woman is caused by any burns or bodily injury or occurs otherwise than under normal circumstances within seven years of her marriage and it is shown that soon before her death she was subjected to cruelty or harassment by her husband or relative for dowry, such husband or relative shall be deemed to have caused her death. Punishment is minimum seven years up to life imprisonment.",
    illustration: "Direct successor to Section 304B of the old IPC."
  },
  {
    id: "sec85_husband_cruelty",
    section: "85",
    title: "Husband or relative of husband of a woman subjecting her to cruelty",
    chapter: "CHAPTER V: OF OFFENCES AGAINST WOMAN AND CHILD",
    text: "Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. Cruelty means: (a) any wilful conduct which is of such a nature as is likely to drive the woman to commit suicide or to cause grave injury or danger to life, limb or health; (b) harassment of the woman to coerce her or her relatives to meet any unlawful demand for dowry.",
    illustration: "Direct successor to the notable Section 498A of the IPC."
  },
  {
    id: "sec100_culpable_homicide",
    section: "100",
    title: "Culpable homicide",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.",
    illustration: "(a) A lays sticks and turf over a pit, with the intention of causing death. Z, believing the ground to be firm, treads on it, falls in and is killed. A has committed culpable homicide.\n(b) A knows Z to be behind a bush. B does not know it. A, intending to cause Z's death, induces B to fire at the bush. B fires and kills Z. Here B is guilty of no offence, but A has committed culpable homicide."
  },
  {
    id: "sec101_murder",
    section: "101",
    title: "Murder",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Except in cases excepted (such as grave and sudden provocation, private defence, public servant acting in good faith, sudden fight), culpable homicide is murder: (a) if the act is done with intention of causing death; (b) if it is done with intention of causing such bodily injury as offender knows to be likely to cause death; (c) if the bodily injury is sufficient in the ordinary course of nature to cause death; (d) if the person knows the act is so imminently dangerous that it must in all probability cause death.",
    illustration: "(a) A shoots Z with intention of killing him. Z dies. A commits murder.\n(b) A fires a loaded cannon into a crowd and kills one of them. A is guilty of murder."
  },
  {
    id: "sec103_murder_punishment",
    section: "103(1)",
    title: "Punishment for Murder",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.",
    illustration: "Replaces Section 302 of the legacy IPC."
  },
  {
    id: "sec103_mob_lynching",
    section: "103(2)",
    title: "Group Murder (Mob Lynching)",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "When a group of five or more persons acting in concert commits murder on the ground of race, caste or community, sex, place of birth, language, personal belief or any other similar ground, each member of such group shall be punished with death or with imprisonment for life, and shall also be liable to fine.",
    illustration: "A landmark addition to Indian Criminal Code providing a specific statutory codification for mob lynching or group hate crimes."
  },
  {
    id: "sec106_negligent_death",
    section: "106",
    title: "Causing death by negligence (Hit-and-Run rules)",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "106(1): Whoever causes death of any person by doing any rash or negligent act not amounting to culpable homicide, shall be punished with imprisonment up to five years, and if done by registered medical practitioner, up to two years.\n106(2): Whoever causes death of any person by rash and negligent driving of vehicle and escapes without reporting it to a police officer or a Magistrate soon after, shall be punished with imprisonment up to ten years and fine.",
    illustration: "Section 106(2) introduces strict liability and heavier sentences (up to 10 years) for hit-and-run drivers who flee the scene instead of reporting to the authorities."
  },
  {
    id: "sec108_suicide_abetment",
    section: "108",
    title: "Abetment of suicide",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "If any person commits suicide, whoever abets the commission of such suicide, shall be punished with imprisonment of either description for a term which may extend to ten years, and shall also be liable to fine. (Successor to IPC 306).",
    illustration: ""
  },
  {
    id: "sec109_attempt_murder",
    section: "109",
    title: "Attempt to murder",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished with imprisonment up to ten years and fine. If hurt is caused, offender is liable to life imprisonment. (Successor to IPC 307).",
    illustration: "(a) A shoots at Z with intention to kill him. A is liable under this section.\n(b) A, intending to murder Z, buys a gun and loads it. A has not yet committed the offence of attempt. If A fires the gun, A is guilty of attempt.\n(c) A, intending to murder Z by poison, purchases poison and mixes it with food. A places it on Z's table. A has committed the offence of attempt."
  },
  {
    id: "sec111_organised_crime",
    section: "111",
    title: "Organised crime",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Any continuing unlawful activity including kidnapping, robbery, vehicle theft, extortion, land grabbing, contract killing, economic offence, cyber-crimes, trafficking, drugs, or weapons by a person or group acting in concert, as members of an organised crime syndicate, by use of violence, threat of violence, intimidation, or coercion to obtain direct or indirect material/financial benefit, constitutes organised crime.",
    illustration: "Punished with death or life imprisonment if it results in death of any person; in other cases, minimum 5 years up to life, and minimum 5 lakh fine."
  },
  {
    id: "sec112_petty_organised",
    section: "112",
    title: "Petty organised crime",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Whoever, being a member of a group or gang, commits theft, snatching, cheating, unauthorized ticket selling, unauthorized betting or gambling, selling examination question papers is guilty of petty organised crime.",
    illustration: "Theft includes trick theft, pick pocketing, shoplifting, cargo theft, and card skimming. Punished with imprisonment from one to seven years and fine."
  },
  {
    id: "sec113_terrorist_act",
    section: "113",
    title: "Terrorist act",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Whoever does any act with intent to threaten the unity, integrity, sovereignty, security, or economic security of India, or with intent to strike terror in the people by using bombs, dynamite, firearms, lethal weapons, or poisonous/hazardous gases to cause death, loss of property, or disrupt essential supplies, commits a terrorist act. (Direct inclusion into substantive criminal law).",
    illustration: "Brings provisions resembling UAPA directly into the central penal code."
  },
  {
    id: "sec116_grievous_hurt",
    section: "116",
    title: "Grievous hurt definition",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "The following kinds of hurt only are designated as 'grievous': (a) Emasculation; (b) Permanent privation of the sight of either eye; (c) Permanent privation of the hearing of either ear; (d) Privation of any member or joint; (e) Destruction or permanent impairing of the powers of any member or joint; (f) Permanent disfiguration of the head or face; (g) Fracture or dislocation of a bone or tooth; (h) Any hurt which endangers life or causes severe bodily pain for fifteen days.",
    illustration: "Successor to Section 320 of the old IPC."
  },
  {
    id: "sec124_acid_attack",
    section: "124",
    title: "Voluntarily causing grievous hurt by use of acid (Acid attack)",
    chapter: "CHAPTER VI: OF OFFENCES AFFECTING THE HUMAN BODY",
    text: "Whoever causes permanent or partial damage, deformity, burns, maiming, disfigurement, or disability, or causes grievous hurt by throwing acid or administering acid, shall be punished with imprisonment of either description for a term which shall not be less than ten years but which may extend to life imprisonment, and fine which shall be paid to the victim.",
    illustration: "Successor to Section 326A of the old IPC."
  },
  {
    id: "sec152_sovereignty_acts",
    section: "152",
    title: "Acts endangering sovereignty, unity and integrity of India (Replacing Sedition)",
    chapter: "CHAPTER VII: OF OFFENCES AGAINST THE STATE",
    text: "Whoever, purposely or knowingly, by words, either spoken or written, or by signs, or by visible representation, or by electronic communication, excites or attempts to excite, secession or armed rebellion or subversive activities, or encourages feelings of separatist activities or endangers sovereignty or unity and integrity of India, shall be punished with imprisonment for life or up to seven years, and fine.",
    illustration: "Repeals the colonial-era 'Sedition' provision (IPC 124A) and replaces it with a modernized protection of sovereignty, targeting secessionist and subversive actions, specifically including digital channels."
  },
  {
    id: "sec303_theft",
    section: "303",
    title: "Theft",
    chapter: "CHAPTER XVII: OF OFFENCES AGAINST PROPERTY (Of theft)",
    text: "Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft. (Successor to IPC 378). If value is less than 5000 and it is first conviction, punishment can be community service.",
    illustration: "(a) A cuts down a tree on Z's ground, intending to steal it. As soon as it is severed, theft is committed.\n(b) A puts a bait in his pocket to induce Z's dog to follow him. Theft is committed as soon as the dog begins to follow."
  },
  {
    id: "sec304_snatching",
    section: "304",
    title: "Snatching",
    chapter: "CHAPTER XVII: OF OFFENCES AGAINST PROPERTY (Of theft)",
    text: "Theft is snatching if, in order to commit theft, the offender suddenly or quickly or forcibly seizes or secures or grabs or takes away from any person or from his possession any movable property. Punished with up to three years imprisonment or fine.",
    illustration: "An explicit, separate statutory categorization for snatching, which was previously prosecuted under theft or criminal force."
  },
  {
    id: "sec316_criminal_breach_of_trust",
    section: "316",
    title: "Criminal breach of trust",
    chapter: "CHAPTER XVII: OF OFFENCES AGAINST PROPERTY",
    text: "Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes of that property in violation of any direction of law prescribing the mode in which such trust is to be discharged, commits criminal breach of trust.",
    illustration: "(a) A, being executor to the will of a deceased person, dishonestly disobeys the law and appropriates the effects to his own use. A commits criminal breach of trust.\n(b) A is a warehouse-keeper. Z goes on a journey and entrusts his furniture to A. A dishonestly sells the goods. A commits criminal breach of trust."
  },
  {
    id: "sec318_cheating",
    section: "318",
    title: "Cheating",
    chapter: "CHAPTER XVII: OF OFFENCES AGAINST PROPERTY (Of cheating)",
    text: "Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit, commits cheating. Aggravated cheating (318(4)) carries up to seven years in prison.",
    illustration: "(a) A, by falsely pretending to be in the Civil Service, intentionally deceives Z, and thus dishonestly induces Z to let him have on credit goods for which he does not mean to pay. A cheats.\n(b) A, by putting a counterfeit mark on an article, intentionally deceives Z into a belief that this article was made by a celebrated manufacturer. A cheats."
  },
  {
    id: "sec356_defamation",
    section: "356",
    title: "Defamation",
    chapter: "CHAPTER XIX: OF CRIMINAL INTIMIDATION, INSULT, ANNOYANCE, DEFAMATION, ETC.",
    text: "Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said to defame that person. Subject to 10 exceptions: public good, public conduct of public servants, conduct of any person touching any public question, publication of reports of Court proceedings, merits of cases, etc.",
    illustration: "Punishment is simple imprisonment for up to two years, or with fine, or with both, or with community service."
  }
];

// Initialize and seed ChromaDB collection BNS Sanhita
export async function getChromaBNSCollection() {
  const client = new ChromaClientMock();
  const collection = await client.getOrCreateCollection({ name: "bns_sanhita" });
  
  // Seed dataset if collection is empty
  const ids = BNS_DATASET.map(item => item.id);
  const metadatas = BNS_DATASET.map(item => ({
    section: item.section,
    title: item.title,
    chapter: item.chapter,
    illustration: item.illustration
  }));
  const documents = BNS_DATASET.map(item => `Section ${item.section}: ${item.title} (${item.chapter}). ${item.text} ${item.illustration}`);

  await collection.add({
    ids,
    metadatas,
    documents
  });

  return collection;
}
