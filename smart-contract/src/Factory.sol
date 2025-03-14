// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/tokens/Owo.sol";
import "./tokens/Nft.sol";

contract ERC20Factory {
    address[] public createdTokens;
    address[] public createdERC721Tokens;

    uint256 public erc20TokenCount;
    uint256 public erc721TokenCount;

    event TokenCreated(
        address tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply
    );
    event ERC721TokenCreated(address tokenAddress, string name, string symbol);

    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public {
        BaseERC20 token = new BaseERC20(
            name,
            symbol,
            initialSupply,
            msg.sender
        );
        createdTokens.push(address(token));
        erc20TokenCount++;
        emit TokenCreated(address(token), name, symbol, initialSupply);
    }

    function createERC721(string memory name, string memory symbol) public {
        MyNFT token = new MyNFT(name, symbol);
        createdERC721Tokens.push(address(token));
        erc721TokenCount++;
        emit ERC721TokenCreated(address(token), name, symbol);
    }

    function getDeployedTokens() public view returns (address[] memory) {
        return createdTokens;
    }

    function getDeployedERC721Tokens() public view returns (address[] memory) {
        return createdERC721Tokens;
    }
}
