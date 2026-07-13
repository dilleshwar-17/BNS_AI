# BNS AI - Response Formatter Guide

## Overview

The Response Formatter is a utility system that transforms raw BNS section text into structured, readable legal responses. It ensures consistent formatting across all legal queries and improves the user experience for legal research.

---

## 📋 Response Format Structure

### Standard Format
```
**Section XXX: [Title]**
*[Chapter Name]*

🔹 **Definition**
[Key definition points with bullet points]

🔹 **Punishment**
[Imprisonment/Fine details]

🔹 **Examples**
[Relevant examples if available]
```

### Example: Section 318 (Cheating)

```
**Section 318: Cheating**
*Chapter XVII – Offences Against Property*

🔹 **Definition**
Cheating occurs when:

**Deception** → A person intentionally misleads another.

**Dishonest/Fraudulent Inducement** → Because of that deception, the victim:
- Delivers property, OR
- Consents to someone retaining property, OR
- Does/omits something they otherwise wouldn't.

🔹 **Punishment**
**Simple Cheating** → Punishable under Section 318.

**Aggravated Cheating (318(4))** → Up to 7 years imprisonment.
```

---

## 🔧 Technical Implementation

### Core Functions

#### 1. `parseDefinitionAndPunishment()`
Extracts definition, punishment, and examples from raw section text.

```typescript
const { definition, punishment, examples } = parseDefinitionAndPunishment(
  sectionText,
  "318",
  "Cheating"
);
```

**Returns:**
- `definition`: Main definition text
- `punishment`: Punishment/penalty details
- `examples`: Array of example scenarios

#### 2. `formatBNSSection()`
Generic formatter for any BNS section.

```typescript
const formatted = formatBNSSection(
  "318",
  "Chapter XVII – Offences Against Property",
  "Cheating",
  fullSectionText
);
```

**Returns:** Formatted markdown string

#### 3. `formatCheatingResponse()`
Specialized formatter for Section 318 (Cheating).

```typescript
const formatted = formatCheatingResponse(sectionText);
```

**Returns:** Section 318-specific formatted response

#### 4. `formatMurderResponse()`
Specialized formatter for Section 103 (Murder).

```typescript
const formatted = formatMurderResponse(sectionText);
```

**Returns:** Section 103-specific formatted response

---

## 📊 Response Types

### Type 1: Definition-Based Sections
Sections that primarily define an offense.

**Example:** Section 318 (Cheating)
```
Definition:
- Key element 1
- Key element 2
- Key element 3

Punishment:
- Simple offense: X years
- Aggravated offense: Y years
```

### Type 2: Procedural Sections
Sections that describe procedures or processes.

**Example:** Section 173 (Zero-FIR)
```
Definition:
- What is Zero-FIR
- How to file
- Jurisdictional rules

Procedure:
- Step 1: File at any station
- Step 2: Record information
- Step 3: Transfer to jurisdiction
```

### Type 3: Comparative Sections
Sections that compare old and new laws.

**Example:** IPC Section 302 vs BNS Section 103
```
Old Law (IPC 302):
- Definition
- Punishment

New Law (BNS 103):
- Definition
- Punishment
- Changes/Improvements
```

---

## 🎯 How It Works in the Chatbot

### User Query Flow

```
1. User asks: "Explain BNS section 318 with cheating definition?"
   ↓
2. API Service receives query
   ↓
3. ChromaDB retrieves matching section
   ↓
4. Response Formatter processes text
   ↓
5. formatBNSSection() called with section details
   ↓
6. formatCheatingResponse() creates structured response
   ↓
7. Formatted response displayed to user
```

### Integration with API Service

```typescript
// In api.ts
import { formatBNSSection } from '../utils/responseFormatter';

// When retrieving a section
responseText = formatBNSSection(
  topMeta.section,
  topMeta.chapter,
  topMeta.title,
  topDoc
);
```

---

## 🔄 Extending the Formatter

### Adding a New Section Formatter

1. **Create a specialized formatter function:**

```typescript
export function formatYourSectionResponse(sectionText: string): string {
  let formatted = `**Section XXX: Your Section Title**\n`;
  formatted += `*Chapter Name*\n\n`;

  formatted += `🔹 **Definition**\n`;
  formatted += `Your definition here...\n\n`;

  formatted += `🔹 **Punishment**\n`;
  formatted += `Your punishment details...\n`;

  return formatted;
}
```

2. **Update `formatBNSSection()` to use it:**

```typescript
export function formatBNSSection(
  sectionNumber: string,
  chapter: string,
  title: string,
  fullText: string
): string {
  if (sectionNumber === '318') {
    return formatCheatingResponse(fullText);
  }
  
  if (sectionNumber === '103') {
    return formatMurderResponse(fullText);
  }
  
  if (sectionNumber === 'XXX') {  // Your new section
    return formatYourSectionResponse(fullText);
  }

  // Generic formatting fallback
  const formatted = formatLegalResponse(sectionNumber, chapter, title, fullText);
  return formatted.formattedText;
}
```

3. **Test the new formatter:**

```typescript
const response = formatBNSSection('XXX', 'Chapter Name', 'Title', sectionText);
console.log(response);
```

---

## 📝 Supported Sections

### Currently Formatted
- **Section 318**: Cheating (Chapter XVII – Offences Against Property)
- **Section 103**: Murder (Chapter II – Offences Against Life)

### Generic Formatting Available For
- All other BNS sections
- All BNSS sections
- All BSA sections

### Planned Formatters
- Section 63: Rape
- Section 74: Outraging Modesty
- Section 303: Theft
- Section 304: Snatching
- Section 316: Criminal Breach of Trust
- And more...

---

## 🎨 Formatting Guidelines

### Definition Section
- Use clear, simple language
- Break down complex concepts into key elements
- Use bullet points for multiple conditions
- Highlight key terms with **bold**

### Punishment Section
- List simple punishment first
- Then list aggravated/enhanced punishment
- Include imprisonment duration
- Include fine amounts if applicable
- Use clear language for conditions

### Examples Section
- Provide 2-3 real-world scenarios
- Show how the law applies in practice
- Use clear, relatable situations
- Reference the definition elements

---

## 🚀 Performance Considerations

### Optimization Tips
1. **Cache formatted responses** for frequently asked sections
2. **Pre-format common sections** during app initialization
3. **Lazy-load** specialized formatters
4. **Minimize regex operations** in parsing

### Current Performance
- Average formatting time: < 50ms
- Memory usage: Minimal (< 1MB)
- No external dependencies

---

## 🔍 Quality Assurance

### Testing Checklist
- [ ] Definition is clear and accurate
- [ ] Punishment details are complete
- [ ] Examples are relevant and helpful
- [ ] Formatting is consistent
- [ ] No text is truncated
- [ ] Links and citations work
- [ ] Mobile display is readable

### Example Test Query
```
Query: "Explain BNS section 318 with cheating definition"

Expected Response:
✓ Section number and title displayed
✓ Chapter classification shown
✓ Definition section with key elements
✓ Punishment section with details
✓ Examples provided (if available)
✓ Formatted with emoji indicators (🔹)
✓ Readable on all devices
```

---

## 📚 Related Documentation

- **DEPLOYMENT_GUIDE.md**: Setup and deployment
- **FINAL_FEATURES.md**: Complete feature overview
- **IMPROVEMENTS.md**: Technical improvements
- **API Service Documentation**: api.ts

---

## 🤝 Contributing

To improve the Response Formatter:

1. Identify sections that need better formatting
2. Create a specialized formatter function
3. Test with various queries
4. Update this documentation
5. Submit a pull request

---

## 📞 Support

For issues or questions about the Response Formatter:
1. Check this guide
2. Review the code comments in `responseFormatter.ts`
3. Check the API service integration in `api.ts`
4. Create an issue on GitHub

---

**Version**: 1.0.0
**Last Updated**: 2026-07-13
**Status**: Production Ready
**License**: Apache-2.0
