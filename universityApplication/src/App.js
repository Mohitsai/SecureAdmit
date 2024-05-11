import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Stack, Text, Title, Grid, Input, Button, Group, Space } from '@mantine/core';
import axios from 'axios';
import { notifications } from "@mantine/notifications";
import { ethers } from 'ethers';
// import { ConnectWalletButton } from '@/components/ConnectWalletButton';
// import { executeTransaction } from '@/lib/executeTransaction';

function App() {

    const [walletAddress, setWalletAddress] = useState("");
    const [writing, setWriting] = useState("");
    const [reading, setReading] = useState("");
    const [listening, setListening] = useState("");
    const [speaking, setSpeaking] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [examDate, setExamDate] = useState("");
    const [Id, setId] = useState("");
    // const [isConnected, setIsConnected] = useState(false);

    // This function is called to connect to the user's MetaMask wallet
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

  // Effect hook to automatically connect to wallet when the page loads
  useEffect(() => {
      connectWallet();
  }, []);

    const handleGenerateProofSendTransaction = async (any) => {
        e.preventDefault();

        // We will send an HTTP request with our inputs to our next.js backend to 
        // request a proof to be generated.
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

        // Send the HTTP request
        try {
            const res = await axios.post("/api/generate_proof", data, config);
            notifications.show({
            message: "Proof generated successfully! Submitting transaction...",
            color: "green",
            });

            console.log(res.data);
    
            // Split out the proof and public signals from the response data
            const { proof, publicSignals } = res.data;

            console.log({ proof, publicSignals });
    
            // Write the transaction
            // const txResult = await executeTransaction(proof, publicSignals);
            // const txHash = txResult.transactionHash;
    
            // notifications.show({
            // message: `Transaction succeeded! Tx Hash: ${txHash}`,
            // color: "green",
            // autoClose: false,
            // });
        } catch (err) {
            const statusCode = err?.response?.status;
            const errorMsg = err?.response?.data?.error;
            notifications.show({
            message: `Error ${statusCode}: ${errorMsg}`,
            color: "red",
            });
        }
    }

    // Only allow submit if the user first connects their wallet
    const renderSubmitButton = () => {
    // if (!isConnected) {
    //     return <ConnectWalletButton />
    // }
    return (
        <Button type="submit">Generate Proof & Send Transaction</Button>
    )
    }

    return (
        <div className="bg">
        <>
            <div className="container">

        { (
            <div>
            <h1>A UNIVERISTY APPLICATION</h1>
            <Button onClick={connectWallet} style={{ position: 'fixed', top: 20, right: 20 }}>
                        {walletAddress ? "Connected" : "Connect Wallet"}
                    </Button>
            <div>
            <form onSubmit={handleGenerateProofSendTransaction}>
                <label>
                Nation Identity:{" "}
                <input
                    name="nationalId"
                    className="wide-input"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    defaultValue="0"
                />
                </label>
                <hr />
                <label>
                Date:{" "}
                <input
                    name="date"
                    className="wide-input"
                    value={formData.beneficiary}
                    onChange={handleChange}
                    defaultValue="0"
                />
                </label>
                <hr />
                <label>
                Writing:{" "}
                <input
                    name="writing"
                    className="wide-input"
                    value={formData.activity}
                    onChange={handleChange}
                    defaultValue="0"
                />
                </label>
                <hr />
                <label>
                Reading:{" "}
                <input
                    name="reading"
                    // placeholder="Enter a number of times"
                    className="wide-input"
                    value={formData.numTimes}
                    defaultValue="1"
                    onChange={handleChange}
                />
                </label>
                <hr />
                <label>
                Listening:{" "}
                <input
                    name="listening"
                    // placeholder="Enter a total of times"
                    className="wide-input"
                    value={formData.totalTimes}
                    defaultValue="1"
                    onChange={handleChange}
                />
                </label>
                <hr />
                <label>
                Speaking:{" "}
                <input
                    name="speaking"
                    // placeholder="Enter a condition 1"
                    className="wide-input"
                    value={formData.condition1}
                    defaultValue="10"
                    onChange={handleChange}
                />
                </label>
                <hr />
                <Space h={10} />
            { renderSubmitButton() }
            </form>
            <Space h={20} />
              <form onSubmit={handleGenerateProofSendTransaction}>
                <Stack spacing="sm">
                  <Input.Wrapper label="Writing">
                    <Input 
                      placeholder="Number between 0 and 5" 
                      value={writing} 
                      onChange={(e) => setWriting(e.currentTarget.value)}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Reading">
                    <Input 
                      placeholder="Number between 0 and 5" 
                      value={reading} 
                      onChange={(e) => setReading(e.currentTarget.value)}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Listening">
                    <Input 
                      placeholder="Number between 0 and 5" 
                      value={listening} 
                      onChange={(e) => setListening(e.currentTarget.value)}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Speaking">
                    <Input 
                      placeholder="Number between 0 and 5" 
                      value={speaking} 
                      onChange={(e) => setSpeaking(e.currentTarget.value)}
                    />
                  </Input.Wrapper>
                  <Space h={10} />
                  { renderSubmitButton() }
                </Stack>
              </form>
            </div>
            </div>
        )}
    
        </div>
        <div className="container"></div>

        </>
        </div>
    );
}

export default App;