import { test, expect } from '@playwright/test';

const API_URL = 'https://d-eiat-folder-my-projects-my-other-projects-eiat5522s-projects.vercel.app/api/chat';

// Helper function to check if text is Thai
function isThaiText(text: string): boolean {
  // Thai Unicode range: \u0E00-\u0E7F
  const thaiPattern = /[\u0E00-\u0E7F]/;
  return thaiPattern.test(text);
}

// Helper function to check if text contains expected keywords
function containsKeywords(text: string, keywords: string[]): boolean {
  return keywords.some(keyword => text.includes(keyword));
}

async function sendChatRequest(prompt: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  return await response.json();
}

test.describe('Thai Dating Guru Chat Tests', () => {
  test('should respond in Thai to English dating advice question', async () => {
    const response = await sendChatRequest("How do I know if someone likes me?");
    
    expect(response.error).toBeNull();
    expect(response.reply).toBeDefined();
    expect(isThaiText(response.reply)).toBeTruthy();
    
    // Check for expected Thai keywords about attraction signs
    expect(containsKeywords(response.reply, ['สังเกต', 'ความสนใจ', 'พฤติกรรม'])).toBeTruthy();
  });

  test('should give relationship advice in Thai', async () => {
    const response = await sendChatRequest("แฟนไม่ค่อยมีเวลาให้ ควรทำยังไงดี");
    
    expect(response.error).toBeNull();
    expect(response.reply).toBeDefined();
    expect(isThaiText(response.reply)).toBeTruthy();
    
    // Check for expected Thai keywords about relationship communication
    expect(containsKeywords(response.reply, ['พูดคุย', 'เข้าใจ', 'เวลา'])).toBeTruthy();
  });

  test('should provide first date tips in Thai for English query', async () => {
    const response = await sendChatRequest("First date tips please");
    
    expect(response.error).toBeNull();
    expect(response.reply).toBeDefined();
    expect(isThaiText(response.reply)).toBeTruthy();
    
    // Check for expected Thai keywords about first dates
    expect(containsKeywords(response.reply, ['นัดแรก', 'พูดคุย', 'สถานที่'])).toBeTruthy();
  });

  test('should give breakup advice in Thai', async () => {
    const response = await sendChatRequest("เพิ่งเลิกกับแฟน ทำใจไม่ได้");
    
    expect(response.error).toBeNull();
    expect(response.reply).toBeDefined();
    expect(isThaiText(response.reply)).toBeTruthy();
    
    // Check for expected Thai keywords about healing from breakup
    expect(containsKeywords(response.reply, ['เวลา', 'ดูแลตัวเอง'])).toBeTruthy();
  });

  test('should provide dating profile advice in Thai', async () => {
    const response = await sendChatRequest("How to make a good dating profile?");
    
    expect(response.error).toBeNull();
    expect(response.reply).toBeDefined();
    expect(isThaiText(response.reply)).toBeTruthy();
    
    // Check for expected Thai keywords about dating profiles
    expect(containsKeywords(response.reply, ['รูปภาพ', 'ข้อมูล', 'ความสนใจ'])).toBeTruthy();
  });

  test('should maintain formal Thai language in sensitive topics', async () => {
    const response = await sendChatRequest("What if my date wants to get physical too quickly?");
    
    expect(response.error).toBeNull();
    expect(response.reply).toBeDefined();
    expect(isThaiText(response.reply)).toBeTruthy();
    
    // Check for appropriate, respectful language
    expect(containsKeywords(response.reply, ['เคารพ', 'ขอบเขต', 'พูดคุย'])).toBeTruthy();
  });
});
