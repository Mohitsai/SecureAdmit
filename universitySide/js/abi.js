// The contract ABI
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "plonkVerifierAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_merkleRootContractAddress",
				"type": "address"
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allStudents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "examDate",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isQualified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStudents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "firstName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "examDate",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isQualified",
						"type": "bool"
					}
				],
				"internalType": "struct universityQualificationCheck.Student[]",
				"name": "",
				"type": "tuple[]"
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
		"inputs": [],
		"name": "merkleRootContract",
		"outputs": [
			{
				"internalType": "contract MerkleRootContract",
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
		"inputs": [],
		"name": "owner",
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
				"internalType": "string",
				"name": "_firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_examDate",
				"type": "string"
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
				"internalType": "uint256[24]",
				"name": "_proof",
				"type": "uint256[24]"
			},
			{
				"internalType": "uint256[1]",
				"name": "_pubSignals",
				"type": "uint256[1]"
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
				"internalType": "uint256[24]",
				"name": "_proof",
				"type": "uint256[24]"
			},
			{
				"internalType": "uint256[1]",
				"name": "_pubSignals",
				"type": "uint256[1]"
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
]