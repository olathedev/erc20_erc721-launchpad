// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Factory.sol";

contract DeployFactory is Script {
    function run() external {
        vm.startBroadcast();
        ERC20Factory factory = new ERC20Factory();
        vm.stopBroadcast();
        console.log("Factory deployed at:", address(factory));
    }
}
