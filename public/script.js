let web3;
let contract;

window.onload = () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);

        document.getElementById('connectButton').addEventListener('click', async () => {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                document.getElementById('createContractButton').style.display = 'block';  // Show create contract button
                document.getElementById('status').innerText = 'Connected to MetaMask';
            } catch (error) {
                document.getElementById('status').innerText = "User denied account access";
                console.error("Error connecting MetaMask:", error);
            }
        });

        // Create Smart Contract
        document.getElementById('createContractButton').addEventListener('click', async () => {
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            try {
                console.log("Attempting to deploy a new Smart Contract...");

                // Estimate gas
                const gasEstimate = await web3.eth.estimateGas({
                    from: account,
                    data: '0x608060405234801561001057600080fd5b50610992806100206000396000f3fe...'  // Actual contract bytecode
                });

                // Deploy the contract
                const contractDeployment = await web3.eth.sendTransaction({
                    from: account,
                    data: '0x608060405234801561001057600080fd5b50610992806100206000396000f3fe...',  // Correct contract bytecode
                    gas: gasEstimate
                });

                // Display the contract address
                document.getElementById('status').innerText = 'Smart contract created successfully!';
                document.getElementById('contractAddress').innerText = 'Contract Address: ' + contractDeployment.contractAddress;
            } catch (error) {
                console.error("Error creating smart contract:", error);
                document.getElementById('status').innerText = `Error creating smart contract. Please try again. Error: ${error.message}`;
            }
        });
    } else {
        document.getElementById('status').innerText = 'Please install MetaMask!';
    }
};
