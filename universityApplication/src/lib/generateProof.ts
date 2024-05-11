import path from "path";
// @ts-ignore
import * as snarkjs from 'snarkjs';

export const generateProof = async (writing: number, reading: number, listening: number, speaking: number): Promise<any> => {
  console.log(`Generating proof with inputs: ${writing}, ${reading},${listening},${speaking}`);
  
  // We need to have the naming scheme and shape of the inputs match the .circom file
  const inputs = {
    studentMarks: [writing, reading, listening, speaking],
    universityBenchmark: [20,20,20,20],
  }

  // Paths to the .wasm file and proving key
  const wasmPath = path.join(process.cwd(), 'circuits/build/qualificationCheck_js/qualificationCheck.wasm');
  const provingKeyPath = path.join(process.cwd(), 'circuits/build/proving_key.zkey')

  try {
    // Generate a proof of the circuit and create a structure for the output signals
    const { proof, publicSignals } = await snarkjs.plonk.fullProve(inputs, wasmPath, provingKeyPath);

    let value = parseInt(publicSignals[0]);

    // Convert the data into Solidity calldata that can be sent as a transaction
    const calldataBlob = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
    const calldata = calldataBlob.split("][");

    let proofHex = JSON.parse(calldata[0] + "]");
    let signalsHex = JSON.parse("[" + calldata[1]);

    console.log(calldata);

    console.log(`publicSignals: ${publicSignals}, Type: ${typeof publicSignals}`);
    console.log(`proof: ${proof}`);
    console.log(`proofHex: ${proofHex} , Type: ${typeof proofHex}`);
    console.log(`signalHex: ${signalsHex}, Type: ${typeof signalsHex}`);
    console.log(`publicSignalValue: ${value}, Type: ${typeof value}`);

    return {
      proof: proof,
      proofHex: proofHex,
      publicSignals: publicSignals,
      publicSignalsHex: signalsHex,
      publicSignalValue: value,
    }
  } catch (err) {
    console.log(`Error:`, err)
    return {
      proof: "", 
      publicSignals: [],
    }
  }
}