const fs = require('fs');
const crypto = require('crypto-js');
const csv = require('csv-parser');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const leaf_hash_values = [];
const student_data = [];
const proof_results = [];
const student_proof_in_format = [];

fs.createReadStream('student_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const concatenatedData = Object.values(row).join('');
    console.log(concatenatedData)
    student_data.push(concatenatedData);
  })
  .on('end', () => {
    const leaf_hash_values = student_data.map(v => keccak256(v))
    const tree = new MerkleTree(leaf_hash_values, keccak256, { sort: true })
    const root = tree.getHexRoot();
    console.log(`Root: ${root}`);
    const student_proof = leaf_hash_values.map(x => tree.getHexProof(x));
    console.log(student_proof);
    for (let i = 0; i < student_proof.length; i++) {
        proof_results[i] = tree.verify(student_proof[i], leaf_hash_values[i], root)
        // console.log(leaf_hash_values[i]);
      }
    console.log(proof_results);
    console.log(leaf_hash_values.map(buffer => '0x' + buffer.toString('hex')));
  });
