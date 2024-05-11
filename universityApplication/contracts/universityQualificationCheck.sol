// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Interface to PlonkVerifier.sol
interface IPlonkVerifier {
    function verifyProof(bytes memory proof, uint[] memory pubSignals) external view returns (bool);
}

contract universityQualificationCheck {

    address public s_plonkVerifierAddress;
    bytes32 public merkleRoot;
    // Mapping to store qualification status for each Id
    mapping(uint256 => bool) public qualificationMapping;

    constructor(address plonkVerifierAddress, bytes32 merkleRootOfScoreTree) {
        s_plonkVerifierAddress = plonkVerifierAddress;
        merkleRoot = merkleRootOfScoreTree;
    }

    event merkleVerificationResult(bool result);

    event zkVerificationResult(bool result);

    function merkleVerify(bytes32 root, bytes32 leaf, bytes32[] memory proof) public returns (bool) {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
        bytes32 proofElement = proof[i];

        if (computedHash <= proofElement) {
            // Hash(current computed hash + current element of the proof)
            computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
        } else {
            // Hash(current element of the proof + current computed hash)
            computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
        }
        }

        bool result = (computedHash == root);

        emit merkleVerificationResult(result);

        return result;
    }

    function verifyZKProof(bytes memory proof, uint256[] memory pubSignals) public returns (bool) {
        bool result = IPlonkVerifier(s_plonkVerifierAddress).verifyProof(proof, pubSignals);
        emit zkVerificationResult(result);
        return result;
    }

    function submitProof(uint256 Id, bytes32 leaf, bytes32[] memory merkleProof, bytes memory zkProof, uint256[] memory pubSignals, uint16 publicSignalValue) public {
        // Check if the student Id exists and is qualified
        require(!qualificationMapping[Id], "Student exists and is qualified");

        // Merkle verification
        require(merkleVerify(merkleRoot, leaf, merkleProof), "Please provide valid results and proofs");

        require(verifyZKProof(zkProof, pubSignals), "Please provide a valid ZK Proof");

        if(publicSignalValue == 0){
            qualificationMapping[Id] = false;
        }else{
            qualificationMapping[Id] = true;
        }
    }

    function getQualificationStatus(uint256 Id) public view returns (bool) {
        return qualificationMapping[Id];
    }


}