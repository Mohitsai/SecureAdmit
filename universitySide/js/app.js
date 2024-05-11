// app.js
const contractAddress = '0x4FA30dB7F628BD10CF25De96aeA124F991394817'; // Replace with your contract's address

let contract;
let signer;

async function initApp() {
    const provider = await detectEthereumProvider();
    if(provider) {
        startApp(provider); // Initialize your app
    } else {
        console.log('Please install MetaMask!');
    }
}

function startApp(provider) {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = web3Provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        displayAllStudents(); // Call displayAllStudents after contract initialization
    }).catch(function (error) {
        console.error(error);
    });
}

async function displayAllStudents() {
    try {
        const allStudents = await contract.getAllStudents();

        const tableBody = document.querySelector("#studentsTable tbody");

        // Loop through each student and create table rows
        allStudents.forEach(student => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${student.Id}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.examDate}</td>
                <td>${student.isQualified ? 'Yes' : 'No'}</td>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initApp();
});
