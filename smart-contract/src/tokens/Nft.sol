// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Erc721.sol";

contract MyNFT is ERC721 {
    uint256 private _tokenIdCounter;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function mint(
        address to,
        string memory tokenURI_
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        _tokenIdCounter++;
        return tokenId;
    }

    function burn(uint256 tokenId) public {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "Not approved to burn this token"
        );
        _burn(tokenId);
    }
}
