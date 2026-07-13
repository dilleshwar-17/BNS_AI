/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Formats legal section responses into structured, readable format
 * Converts raw BNS section text into Definition, Punishment, and Examples
 */

export interface FormattedLegalResponse {
  section: string;
  chapter: string;
  title: string;
  definition: string;
  punishment: string;
  examples?: string[];
  formattedText: string;
}

/**
 * Parse section text to extract definition and punishment
 */
export function parseDefinitionAndPunishment(
  sectionText: string,
  sectionNumber: string,
  title: string
): { definition: string; punishment: string; examples: string[] } {
  const definition: string[] = [];
  const punishment: string[] = [];
  const examples: string[] = [];

  // Split text into sentences
  const sentences = sectionText.split(/(?<=[.!?])\s+/);

  let inExamples = false;

  for (const sentence of sentences) {
    const trimmed = sentence.trim();

    // Check if this is an example (starts with letter and colon)
    if (/^[a-z]\)\s/i.test(trimmed)) {
      inExamples = true;
      examples.push(trimmed);
    } else if (inExamples) {
      // Continue adding to examples if we're in examples section
      if (/^[a-z]\)\s/i.test(trimmed)) {
        examples.push(trimmed);
      } else {
        inExamples = false;
        // Check if it's punishment-related
        if (
          trimmed.toLowerCase().includes('punish') ||
          trimmed.toLowerCase().includes('imprisonment') ||
          trimmed.toLowerCase().includes('fine') ||
          trimmed.toLowerCase().includes('years')
        ) {
          punishment.push(trimmed);
        } else {
          definition.push(trimmed);
        }
      }
    } else if (
      trimmed.toLowerCase().includes('punish') ||
      trimmed.toLowerCase().includes('imprisonment') ||
      trimmed.toLowerCase().includes('fine') ||
      trimmed.toLowerCase().includes('years')
    ) {
      punishment.push(trimmed);
    } else if (trimmed.length > 0) {
      definition.push(trimmed);
    }
  }

  return {
    definition: definition.join(' ').trim(),
    punishment: punishment.join(' ').trim(),
    examples
  };
}

/**
 * Format legal response in structured markdown format
 */
export function formatLegalResponse(
  sectionNumber: string,
  chapter: string,
  title: string,
  fullText: string
): FormattedLegalResponse {
  const { definition, punishment, examples } = parseDefinitionAndPunishment(
    fullText,
    sectionNumber,
    title
  );

  // Build formatted text
  let formattedText = `**Section ${sectionNumber}: ${title}**\n`;
  formattedText += `*${chapter}*\n\n`;

  formattedText += `🔹 **Definition**\n`;
  if (definition) {
    formattedText += `${definition}\n\n`;
  }

  formattedText += `🔹 **Punishment**\n`;
  if (punishment) {
    formattedText += `${punishment}\n\n`;
  }

  if (examples && examples.length > 0) {
    formattedText += `🔹 **Examples**\n`;
    examples.forEach((ex) => {
      formattedText += `${ex}\n`;
    });
  }

  return {
    section: sectionNumber,
    chapter,
    title,
    definition,
    punishment,
    examples,
    formattedText
  };
}

/**
 * Extract key components from section text
 */
export function extractKeyComponents(text: string): {
  mainDefinition: string;
  keyElements: string[];
  punishment: string;
} {
  const lines = text.split('\n').filter((line) => line.trim());

  let mainDefinition = '';
  const keyElements: string[] = [];
  let punishment = '';

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.includes('punish') || lower.includes('imprisonment')) {
      punishment = line.trim();
    } else if (lower.includes('whoever') || lower.includes('any person')) {
      mainDefinition = line.trim();
    }
  }

  // Extract bullet points if they exist
  const bulletMatches = text.match(/[-•]\s+(.+?)(?=[-•]|$)/g);
  if (bulletMatches) {
    keyElements.push(
      ...bulletMatches.map((match) => match.replace(/^[-•]\s+/, '').trim())
    );
  }

  return {
    mainDefinition,
    keyElements,
    punishment
  };
}

/**
 * Format for cheating-specific response
 */
export function formatCheatingResponse(sectionText: string): string {
  const { mainDefinition, keyElements, punishment } = extractKeyComponents(
    sectionText
  );

  let formatted = `**Section 318: Cheating**\n`;
  formatted += `*Chapter XVII – Offences Against Property*\n\n`;

  formatted += `🔹 **Definition**\n`;
  formatted += `Cheating occurs when:\n\n`;

  // Extract the key elements from definition
  if (mainDefinition.includes('deceiving')) {
    formatted += `**Deception** → A person intentionally misleads another.\n\n`;
  }

  if (
    mainDefinition.includes('fraudulently') ||
    mainDefinition.includes('dishonestly')
  ) {
    formatted += `**Dishonest/Fraudulent Inducement** → Because of that deception, the victim:\n`;
    formatted += `- Delivers property, OR\n`;
    formatted += `- Consents to someone retaining property, OR\n`;
    formatted += `- Does/omits something they otherwise wouldn't.\n\n`;
  }

  formatted += `🔹 **Punishment**\n`;
  if (sectionText.includes('seven years')) {
    formatted += `**Simple Cheating** → Punishable under Section 318.\n\n`;
    formatted += `**Aggravated Cheating (318(4))** → Up to 7 years imprisonment.\n`;
  } else {
    formatted += `${punishment}\n`;
  }

  return formatted;
}

/**
 * Format for murder/section 103 response
 */
export function formatMurderResponse(sectionText: string): string {
  let formatted = `**Section 103: Murder**\n`;
  formatted += `*Chapter II – Offences Against Life*\n\n`;

  formatted += `🔹 **Definition**\n`;
  formatted += `Murder is the act of causing death with:\n\n`;
  formatted += `- **Intention** to cause death, OR\n`;
  formatted += `- **Knowledge** that the act is likely to cause death\n\n`;

  formatted += `🔹 **Punishment**\n`;
  formatted += `**Simple Murder** → Life imprisonment or death penalty.\n\n`;
  formatted += `**Aggravated Murder** → Death penalty (e.g., murder of child, elderly, judicial officer).\n\n`;
  formatted += `**Mob Lynching (103(2))** → Death penalty or life imprisonment for group murder on grounds of caste, race, community, language, etc.\n`;

  return formatted;
}

/**
 * Generic formatter for any BNS section
 */
export function formatBNSSection(
  sectionNumber: string,
  chapter: string,
  title: string,
  fullText: string
): string {
  // Special handling for known sections
  if (sectionNumber === '318') {
    return formatCheatingResponse(fullText);
  }

  if (sectionNumber === '103') {
    return formatMurderResponse(fullText);
  }

  // Generic formatting
  const formatted = formatLegalResponse(sectionNumber, chapter, title, fullText);
  return formatted.formattedText;
}
