import Web3 from "web3"

export const isAddress = (address) => Web3.utils.isAddress(address)
