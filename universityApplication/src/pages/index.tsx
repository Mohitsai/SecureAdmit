import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Stack, Text, Title, Grid, Input, Button, Group, Space } from '@mantine/core';
import axios from 'axios';
import { notifications } from "@mantine/notifications";
import { ethers } from 'ethers';
import { Addresses } from '@/shared/addresses';
import contractABI  from '@/lib/abi/contractABI.json';
import onlyMerkleABI from '@/lib/abi/onlyMerkle.json';
const keccak256 = require('keccak256');
import { Textarea } from '@mantine/core';

function App() {

    const contractAddress = Addresses.QUALIFIER_ADDRESS;
    const onlyMerkleAddress = Addresses.ONLY_MERKLE_ADDRESS;

    const [walletAddress, setWalletAddress] = useState<string>("");
    const [writing, setWriting] = useState<string>("");
    const [reading, setReading] = useState<string>("");
    const [listening, setListening] = useState<string>("");
    const [speaking, setSpeaking] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [examDate, setExamDate] = useState("");
    const [Id, setId] = useState("");
    const [merkleProof, setMerkleProof] = useState<string>("");
    const [merkleLeafHash, setMerkleLeafHash] = useState<string>("");
    const [valueQualification, setValueQualification] = useState<string>("");

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                setWalletAddress(await signer.getAddress());
            } catch (error) {
                notifications.show({ message: `Error: ${error.message}`, color: 'red' });
            }
        } else {
            notifications.show({ message: "Please install MetaMask!", color: 'red' });
        }
    }

    useEffect(() => {
        connectWallet();
    }, []);

    const concatenateAndHashData = () => {
        const concatenatedData = `${Id}${firstName}${lastName}${examDate}${writing}${reading}${listening}${speaking}`;
        console.log("Concatenated Data:", concatenatedData);
        const hash = keccak256(concatenatedData);
        const hashHex = '0x' + hash.toString('hex')
        setMerkleLeafHash(hashHex);
        console.log("Hash (Hex):", hashHex);
        return hashHex;
    }

    const handleGenerateProofSendTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!Id || !firstName || !lastName || !examDate || !writing || !reading || !listening || !speaking) {
            notifications.show({
                message: "Please fill in all the fields",
                color: "red",
            });
            return;
        }

        const data = {
            writing,
            reading,
            listening,
            speaking
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const hash = concatenateAndHashData();

        try {
            const res = await axios.post("/api/generate_proof", data, config);
            notifications.show({
                message: "Proof generated successfully! Submitting transaction...",
                color: "green",
            });
            
            const { proof, proofHex, publicSignals, publicSignalsHex, publicSignalValue } = res.data;
            setValueQualification(publicSignalValue);

            sendTransaction(proofHex, publicSignalsHex);

        } catch (err) {
            const statusCode = err?.response?.status;
            const errorMsg = err?.response?.data?.error;
            notifications.show({
                message: `Error ${statusCode}: ${errorMsg}`,
                color: "red",
            });
        }
    }

    async function sendTransaction(proofHex: string, publicSignalsHex: string) {
        if (!walletAddress) {
            notifications.show({ message: "Connect to MetaMask first.", color: 'red' });
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const intId = parseInt(Id);
        const intValueQualification = parseInt(valueQualification);
        const parsedMerkleProof = merkleProof.split(',').map(item => item.trim());

        try {
            const response = await contract.submitProof(intId, firstName, lastName, examDate, merkleLeafHash, parsedMerkleProof, proofHex, publicSignalsHex, intValueQualification);
            console.log("Transaction successful:", response);
        } catch (err) {
        console.error("Transaction failed:", err);
        alert("Transaction failed: " + err.message);
    }
  }
        

    const renderSubmitButton = () => {
        return (
            <Button type="submit">Generate Proof & Send Transaction</Button>
        )
    }

    // Validation function to ensure input is in the range 0-30 or empty string
    const validateInput = (value: string) => {
        if (value === "") return true; // Allow empty string
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) return false;
        return parsedValue >= 0 && parsedValue <= 30;
    }

    const validateDate = (dateString: string) => {
        const currentDate = new Date();
        const selectedDate = new Date(dateString);
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
        return selectedDate >= fiveYearsAgo;
    }

    return (
        <>
      <Head>
        <title>Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
        <div>
            <Title order={3} style={{ marginBottom: '20px' }}>
            University Application
            </Title>
            <Button onClick={connectWallet} style={{ position: 'fixed', top: 20, right: 20 }}>
                            {walletAddress ? "Connected" : "Connect Wallet"}
                        </Button>
            <Grid align="center" justify="center" mih="80vh">
            <Grid.Col span={6}>
                <form onSubmit={handleGenerateProofSendTransaction} style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Id</label>
                    <Input 
                        value={Id} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        setId(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>First Name</label>
                    <Input 
                        value={firstName} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        setFirstName(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Last Name</label>
                    <Input 
                        value={lastName} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        setLastName(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Exam Date</label>
                    <Input 
                        type="date"
                        value={examDate}
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        if (validateDate(newValue)) setExamDate(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Writing</label>
                    <Input 
                        placeholder="Number between 0 and 30" 
                        value={writing} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        if (validateInput(newValue)) setWriting(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Reading</label>
                    <Input 
                        placeholder="Number between 0 and 30" 
                        value={reading} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        if (validateInput(newValue)) setReading(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Listening</label>
                    <Input 
                        placeholder="Number between 0 and 30" 
                        value={listening} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        if (validateInput(newValue)) setListening(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Speaking</label>
                    <Input 
                        placeholder="Number between 0 and 30" 
                        value={speaking} 
                        onChange={(e) => {
                        const newValue = e.currentTarget.value;
                        if (validateInput(newValue)) setSpeaking(newValue);
                        }}
                    />
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px' }}>Merkle Proof</label>
                        <Textarea
                            value={merkleProof}
                            onChange={(e) => {
                                const newValue = e.currentTarget.value;
                                setMerkleProof(newValue);
                            }}
                            rows={5} // Adjust the number of rows as needed
                            style={{ minWidth: '300px', maxWidth: '500px' }} // Adjust the width as needed
                        />
                    </div>
                </div>
                { renderSubmitButton() }
                </form>
            </Grid.Col>
            </Grid>
        </div>
    </div>
    </>
  )
}

export default App;