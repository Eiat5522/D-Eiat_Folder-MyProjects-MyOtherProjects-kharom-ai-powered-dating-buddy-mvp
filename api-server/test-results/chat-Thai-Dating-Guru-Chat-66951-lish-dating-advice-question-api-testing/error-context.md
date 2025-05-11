# Test info

- Name: Thai Dating Guru Chat Tests >> should respond in Thai to English dating advice question
- Location: D:\Eiat_Folder\MyProjects\MyOtherProjects\kharom-ai-powered-dating-buddy-mvp\api-server\tests\e2e\chat.test.ts:30:7

# Error details

```
Error: expect(received).toBeNull()

Received: "Invalid request to AI service: 400 qwen/qwen1.5-0.5b is not a valid model ID"
    at D:\Eiat_Folder\MyProjects\MyOtherProjects\kharom-ai-powered-dating-buddy-mvp\api-server\tests\e2e\chat.test.ts:33:28
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const API_URL = 'https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat';
   4 |
   5 | // Helper function to check if text is Thai
   6 | function isThaiText(text: string): boolean {
   7 |   // Thai Unicode range: \u0E00-\u0E7F
   8 |   const thaiPattern = /[\u0E00-\u0E7F]/;
   9 |   return thaiPattern.test(text);
  10 | }
  11 |
  12 | // Helper function to check if text contains expected keywords
  13 | function containsKeywords(text: string, keywords: string[]): boolean {
  14 |   return keywords.some(keyword => text.includes(keyword));
  15 | }
  16 |
  17 | async function sendChatRequest(prompt: string) {
  18 |   const response = await fetch(API_URL, {
  19 |     method: 'POST',
  20 |     headers: {
  21 |       'Content-Type': 'application/json',
  22 |     },
  23 |     body: JSON.stringify({ prompt }),
  24 |   });
  25 |
  26 |   return await response.json();
  27 | }
  28 |
  29 | test.describe('Thai Dating Guru Chat Tests', () => {
  30 |   test('should respond in Thai to English dating advice question', async () => {
  31 |     const response = await sendChatRequest("How do I know if someone likes me?");
  32 |     
> 33 |     expect(response.error).toBeNull();
     |                            ^ Error: expect(received).toBeNull()
  34 |     expect(response.reply).toBeDefined();
  35 |     expect(isThaiText(response.reply)).toBeTruthy();
  36 |     
  37 |     // Check for expected Thai keywords about attraction signs
  38 |     expect(containsKeywords(response.reply, ['สังเกต', 'ความสนใจ', 'พฤติกรรม'])).toBeTruthy();
  39 |   });
  40 |
  41 |   test('should give relationship advice in Thai', async () => {
  42 |     const response = await sendChatRequest("แฟนไม่ค่อยมีเวลาให้ ควรทำยังไงดี");
  43 |     
  44 |     expect(response.error).toBeNull();
  45 |     expect(response.reply).toBeDefined();
  46 |     expect(isThaiText(response.reply)).toBeTruthy();
  47 |     
  48 |     // Check for expected Thai keywords about relationship communication
  49 |     expect(containsKeywords(response.reply, ['พูดคุย', 'เข้าใจ', 'เวลา'])).toBeTruthy();
  50 |   });
  51 |
  52 |   test('should provide first date tips in Thai for English query', async () => {
  53 |     const response = await sendChatRequest("First date tips please");
  54 |     
  55 |     expect(response.error).toBeNull();
  56 |     expect(response.reply).toBeDefined();
  57 |     expect(isThaiText(response.reply)).toBeTruthy();
  58 |     
  59 |     // Check for expected Thai keywords about first dates
  60 |     expect(containsKeywords(response.reply, ['นัดแรก', 'พูดคุย', 'สถานที่'])).toBeTruthy();
  61 |   });
  62 |
  63 |   test('should give breakup advice in Thai', async () => {
  64 |     const response = await sendChatRequest("เพิ่งเลิกกับแฟน ทำใจไม่ได้");
  65 |     
  66 |     expect(response.error).toBeNull();
  67 |     expect(response.reply).toBeDefined();
  68 |     expect(isThaiText(response.reply)).toBeTruthy();
  69 |     
  70 |     // Check for expected Thai keywords about healing from breakup
  71 |     expect(containsKeywords(response.reply, ['เวลา', 'ดูแลตัวเอง'])).toBeTruthy();
  72 |   });
  73 |
  74 |   test('should provide dating profile advice in Thai', async () => {
  75 |     const response = await sendChatRequest("How to make a good dating profile?");
  76 |     
  77 |     expect(response.error).toBeNull();
  78 |     expect(response.reply).toBeDefined();
  79 |     expect(isThaiText(response.reply)).toBeTruthy();
  80 |     
  81 |     // Check for expected Thai keywords about dating profiles
  82 |     expect(containsKeywords(response.reply, ['รูปภาพ', 'ข้อมูล', 'ความสนใจ'])).toBeTruthy();
  83 |   });
  84 |
  85 |   test('should maintain formal Thai language in sensitive topics', async () => {
  86 |     const response = await sendChatRequest("What if my date wants to get physical too quickly?");
  87 |     
  88 |     expect(response.error).toBeNull();
  89 |     expect(response.reply).toBeDefined();
  90 |     expect(isThaiText(response.reply)).toBeTruthy();
  91 |     
  92 |     // Check for appropriate, respectful language
  93 |     expect(containsKeywords(response.reply, ['เคารพ', 'ขอบเขต', 'พูดคุย'])).toBeTruthy();
  94 |   });
  95 | });
  96 |
```