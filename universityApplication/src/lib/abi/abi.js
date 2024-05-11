export const ContractABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "plonkVerifierAddress",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "merkleRootOfScoreTree",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "result",
                    "type": "bool"
                }
            ],
            "name": "merkleVerificationResult",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "result",
                    "type": "bool"
                }
            ],
            "name": "zkVerificationResult",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "Id",
                    "type": "uint256"
                }
            ],
            "name": "getQualificationStatus",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "merkleRoot",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "root",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "leaf",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "proof",
                    "type": "bytes32[]"
                }
            ],
            "name": "merkleVerify",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "qualificationMapping",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "s_plonkVerifierAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "Id",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "leaf",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32[]",
                    "name": "merkleProof",
                    "type": "bytes32[]"
                },
                {
                    "internalType": "bytes",
                    "name": "zkProof",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256[]",
                    "name": "pubSignals",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint16",
                    "name": "publicSignalValue",
                    "type": "uint16"
                }
            ],
            "name": "submitProof",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "proof",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256[]",
                    "name": "pubSignals",
                    "type": "uint256[]"
                }
            ],
            "name": "verifyZKProof",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
];