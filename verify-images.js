// Script to verify that all machinery images are unique
import fs from 'fs';

// Read the machinery data file
const data = fs.readFileSync('./data/machineryData.ts', 'utf8');

// Extract all image URLs
const imageUrls = [];
const lines = data.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('image:')) {
    const url = line.match(/'([^']+)'/)[1];
    imageUrls.push(url);
  }
}

// Count occurrences of each URL
const urlCounts = {};
imageUrls.forEach(url => {
  urlCounts[url] = (urlCounts[url] || 0) + 1;
});

// Find duplicates
const duplicates = Object.entries(urlCounts).filter(([url, count]) => count > 1);

console.log('=== MACHINERY IMAGE VERIFICATION ===\n');
console.log('Total machines:', imageUrls.length);
console.log('Unique images:', Object.keys(urlCounts).length);

if (duplicates.length === 0) {
  console.log('\n✅ SUCCESS: All machinery images are unique!');
} else {
  console.log('\n❌ ISSUES FOUND:');
  duplicates.forEach(([url, count]) => {
    console.log(`  - Image used ${count} times: ${url}`);
  });
}

console.log('\n=== ALL IMAGES ===');
Object.entries(urlCounts).forEach(([url, count]) => {
  console.log(`[${count}x] ${url}`);
});