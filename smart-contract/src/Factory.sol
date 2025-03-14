// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/tokens/Owo.sol";
import "./tokens/Nft.sol";

contract ERC20Factory {
    struct TokenDetails {
        string name;
        string symbol;
        address tokenAddress;
    }

    struct ERC721TokenDetails {
        string name;
        string symbol;
        address tokenAddress;
    }

    mapping(address => TokenDetails[]) public userTokens;

    mapping(address => ERC721TokenDetails[]) public userERC721Tokens;

    uint256 public erc20TokenCount;
    uint256 public erc721TokenCount;

    event TokenCreated(
        address tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply
    );

    event ERC721TokenCreated(
        address indexed creator,
        string name,
        string symbol,
        address tokenAddress
    );

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

        userTokens[msg.sender].push(
            TokenDetails({
                name: name,
                symbol: symbol,
                tokenAddress: address(token)
            })
        );
        erc20TokenCount++;
        emit TokenCreated(address(token), name, symbol, initialSupply);
    }

    function createERC721(string memory name, string memory symbol) public {
        MyNFT token = new MyNFT(name, symbol);
        userERC721Tokens[msg.sender].push(
            ERC721TokenDetails({
                name: name,
                symbol: symbol,
                tokenAddress: address(token)
            })
        );
        erc721TokenCount++;
        emit ERC721TokenCreated(msg.sender, name, symbol, address(token));
    }

    function getTokensByUser(
        address user
    ) public view returns (TokenDetails[] memory) {
        return userTokens[user];
    }

    function getERC721TokensByUser(
        address user
    ) public view returns (ERC721TokenDetails[] memory) {
        return userERC721Tokens[user];
    }
}
