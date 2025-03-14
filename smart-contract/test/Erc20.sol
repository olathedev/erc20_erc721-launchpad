// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "../src/tokens/Owo.sol";

contract Erc20test is Test {
    BaseERC20 public erc20;

    address creator = address(0x123);
    address user = address(0x456);

    function setUp() public {
        erc20 = new BaseERC20("BeeToken", "BTK", 1000 ether, creator);
    }

    function testTokenDeployment() public view {
        assertEq(erc20.name(), "BeeToken");
        assertEq(erc20.symbol(), "BTK");
        assertEq(erc20.totalSupply(), 1000 ether);
    }

    function testCreatorGetsInitialSupply() public view {
        assertEq(erc20.balanceOf(creator), 1000 ether);
    }
}
