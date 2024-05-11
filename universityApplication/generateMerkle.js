const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
const fs = require('fs');

// Example data
const data = [
    { Id: 87165, Writing: 22, Reading: 22, Listening: 22, Speaking: 22 },
    { Id: 86737, Writing: 22, Reading: 23, Listening: 22, Speaking: 22 },
    { Id: 97309, Writing: 22, Reading: 23, Listening: 23, Speaking: 22 }
];

// Function to convert object to string for hashing
const objectToString = (obj) => Object.values(obj).join(',');

// Calculate Merkle root for each row
const merkleProofs = data.map(row => {
    const rowString = objectToString(row);
    const leaf = SHA256(rowString).toString();
    return {
        ...row,
        LeafHash: leaf
    };
});

// Write to CSV file
const csvContent = "Id,Writing,Reading,Listening,Speaking,LeafHash\n" + merkleProofs.map(row => {
    return `${row.Id},${row.Writing},${row.Reading},${row.Listening},${row.Speaking},${row.LeafHash}`;
}).join('\n');

fs.writeFileSync('merkle_leaf_data.csv', csvContent);
console.log("CSV file created successfully!");
