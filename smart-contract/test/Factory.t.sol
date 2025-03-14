// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Factory.sol";
import "../src/tokens/Owo.sol";
import "../src/tokens/Nft.sol";

contract ERC20FactoryTest is Test {
    ERC20Factory factory;
    address deployer = address(0x123);
    address user = address(0x456);

    event TokenCreated(
        address tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply
    );

    event ERC721TokenCreated(address tokenAddress, string name, string symbol);

    function setUp() public {
        vm.prank(deployer);
        factory = new ERC20Factory();
    }

    function testCreateToken() public {
        string memory name = "MyToken";
        string memory symbol = "MTK";
        uint256 initialSupply = 1000 * 10 ** 18;

        // vm.expectEmit(true, true, true, true);
        // emit TokenCreated(address(0), name, symbol, initialSupply);
        vm.prank(user);
        factory.createToken(name, symbol, initialSupply);

        address[] memory tokens = factory.getDeployedTokens();
        address tokenAddress = tokens[tokens.length - 1];

        BaseERC20 token = BaseERC20(tokenAddress);
        assertEq(token.name(), name, "Token name mismatch");
        assertEq(token.symbol(), symbol, "Token symbol mismatch");
        assertEq(
            token.balanceOf(user),
            initialSupply,
            "Initial supply mismatch"
        );
        assertEq(token.owner(), user, "Token owner mismatch");

        assertEq(factory.erc20TokenCount(), 1, "Token count mismatch");
        assertEq(tokens.length, 1, "Deployed tokens array length mismatch");
    }

    function testGetDeployedTokens() public {
        vm.startPrank(user);
        factory.createToken("Token1", "T1", 1000 * 10 ** 18);
        factory.createToken("Token2", "T2", 2000 * 10 ** 18);
        factory.createToken("Token3", "T3", 3000 * 10 ** 18);
        vm.stopPrank();

        address[] memory tokens = factory.getDeployedTokens();

        assertEq(tokens.length, 3, "Deployed tokens array length mismatch");
        assertEq(factory.erc20TokenCount(), 3, "Token count mismatch");

        BaseERC20 token1 = BaseERC20(tokens[0]);
        assertEq(token1.name(), "Token1", "Token1 name mismatch");
        assertEq(token1.symbol(), "T1", "Token1 symbol mismatch");
        assertEq(
            token1.balanceOf(user),
            1000 * 10 ** 18,
            "Token1 initial supply mismatch"
        );

        BaseERC20 token2 = BaseERC20(tokens[1]);
        assertEq(token2.name(), "Token2", "Token2 name mismatch");
        assertEq(token2.symbol(), "T2", "Token2 symbol mismatch");
        assertEq(
            token2.balanceOf(user),
            2000 * 10 ** 18,
            "Token2 initial supply mismatch"
        );

        BaseERC20 token3 = BaseERC20(tokens[2]);
        assertEq(token3.name(), "Token3", "Token3 name mismatch");
        assertEq(token3.symbol(), "T3", "Token3 symbol mismatch");
        assertEq(
            token3.balanceOf(user),
            3000 * 10 ** 18,
            "Token3 initial supply mismatch"
        );
    }

    function testCreateERC721() public {
        string memory name = "MyNFT";
        string memory symbol = "MNFT";

        // vm.expectEmit(true, true, true, true);
        // emit ERC721TokenCreated(address(0), name, symbol);

        vm.prank(user);
        factory.createERC721(name, symbol);

        address[] memory tokens = factory.getDeployedERC721Tokens();
        address tokenAddress = tokens[tokens.length - 1];

        MyNFT token = MyNFT(tokenAddress);
        assertEq(token.name(), name, "Token name mismatch");
        assertEq(token.symbol(), symbol, "Token symbol mismatch");

        assertEq(factory.erc721TokenCount(), 1, "Token count mismatch");
        assertEq(tokens.length, 1, "Deployed tokens array length mismatch");
    }

    // Test minting and burning ERC721 tokens
    function testMintAndBurnERC721() public {
        // Deploy a new ERC721 token
        vm.prank(user);
        factory.createERC721("MyNFT", "MNFT");

        // Get the deployed token address
        address[] memory tokens = factory.getDeployedERC721Tokens();
        address tokenAddress = tokens[tokens.length - 1];
        MyNFT token = MyNFT(tokenAddress);

        // Mint a new token
        string memory tokenURI = "https://example.com/token/1";
        uint256 tokenId = token.mint(user, tokenURI);

        // Verify the token was minted
        assertEq(token.ownerOf(tokenId), user, "Token owner mismatch");
        assertEq(token.tokenURI(tokenId), tokenURI, "Token URI mismatch");

        // Burn the token
        vm.prank(user);
        token.burn(tokenId);

        // Verify the token was burned
        vm.expectRevert("ERC721: owner query for nonexistent token");
        token.ownerOf(tokenId);
    }

    // Test multiple ERC721 token deployments
    function testGetDeployedERC721Tokens() public {
        vm.startPrank(user);
        factory.createERC721("NFT1", "N1");
        factory.createERC721("NFT2", "N2");
        factory.createERC721("NFT3", "N3");
        vm.stopPrank();

        address[] memory tokens = factory.getDeployedERC721Tokens();

        assertEq(tokens.length, 3, "Deployed tokens array length mismatch");
        assertEq(factory.erc721TokenCount(), 3, "Token count mismatch");

        MyNFT token1 = MyNFT(tokens[0]);
        assertEq(token1.name(), "NFT1", "Token1 name mismatch");
        assertEq(token1.symbol(), "N1", "Token1 symbol mismatch");

        MyNFT token2 = MyNFT(tokens[1]);
        assertEq(token2.name(), "NFT2", "Token2 name mismatch");
        assertEq(token2.symbol(), "N2", "Token2 symbol mismatch");

        MyNFT token3 = MyNFT(tokens[2]);
        assertEq(token3.name(), "NFT3", "Token3 name mismatch");
        assertEq(token3.symbol(), "N3", "Token3 symbol mismatch");
    }
}
