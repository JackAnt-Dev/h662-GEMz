// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // 확장된 ERC721

contract MintGem is ERC721Enumerable {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mintGem() public {
        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);
    }
}