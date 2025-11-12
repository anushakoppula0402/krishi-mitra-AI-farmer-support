// Simple script to check for duplicate images in machinery data
const machinery = [
  { name: 'Rotary Tiller (Rotavator)', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop&crop=center' },
  { name: 'Plough', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop&crop=center' },
  { name: 'Disc Harrow', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop&crop=center' },
  { name: 'Seed Drill', image: 'https://images.unsplash.com/photo-1595863045629-e10b1e0c50b8?w=500&h=300&fit=crop&crop=center' },
  { name: 'Transplanter', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop&crop=center' },
  { name: 'Combine Harvester', image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=500&h=300&fit=crop&crop=center' },
  { name: 'Reaper', image: 'https://images.unsplash.com/photo-1581092335878-5b32d3793d2c?w=500&h=300&fit=crop&crop=center' },
  { name: 'Drip Irrigation System', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop&crop=center' },
  { name: 'Sprinkler System', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop&crop=center' },
  { name: 'Thresher', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop&crop=center' },
  { name: 'Grain Cleaner', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop&crop=center' },
  { name: 'Drying Machine', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop&crop=center' },
  { name: 'Knapsack Sprayer', image: 'https://images.unsplash.com/photo-1595863045629-e10b1e0c50b8?w=500&h=300&fit=crop&crop=center' },
  { name: 'Power Sprayer', image: 'https://images.unsplash.com/photo-1581092335878-5b32d3793d2c?w=500&h=300&fit=crop&crop=center' }
];

// Group machines by image
const imageGroups = {};

machinery.forEach(machine => {
  if (!imageGroups[machine.image]) {
    imageGroups[machine.image] = [];
  }
  imageGroups[machine.image].push(machine.name);
});

// Show results
console.log('=== MACHINERY IMAGE ANALYSIS ===\n');

let duplicateCount = 0;
Object.entries(imageGroups).forEach(([image, names]) => {
  if (names.length > 1) {
    duplicateCount++;
    console.log(`⚠️  SAME IMAGE USED BY MULTIPLE MACHINES:`);
    console.log(`   Image: ${image}`);
    console.log(`   Machines: ${names.join(', ')}`);
    console.log('');
  }
});

if (duplicateCount === 0) {
  console.log('✅ No duplicate images found.');
} else {
  console.log(`Found ${duplicateCount} image(s) used by multiple machines.`);
}

console.log('\n=== ALL IMAGES ===');
Object.entries(imageGroups).forEach(([image, names]) => {
  console.log(`\nImage: ${image}`);
  console.log(`Machines: ${names.join(', ')}`);
});