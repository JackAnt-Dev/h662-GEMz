// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // 확장된 ERC721
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintGem is ERC721Enumerable, Ownable { // Ownable: Opensea 상에서 내 컨트랙의 판매정보를 수정할 수 있도록 함
    string uri;
    constructor(string memory _name, string memory _symbol, string memory _uri) ERC721(_name, _symbol) {
        uri = _uri;
    }

    struct GemData {
        uint gemRank;
        uint gemType;
    }

    mapping(uint => GemData) public gemData;

    // 1 klay
    uint gemPrice = 100000000000000000; // 10^18

    function tokenURI(uint _tokenId) override public view returns (string memory) {  // 이미 ERC721에 존재하는 함수. Opensea에서 인식하게 만드려면 이 이름으로 꼭 정의해야한다고.
        string memory gemRank = Strings.toString(gemData[_tokenId].gemRank);
        string memory gemType = Strings.toString(gemData[_tokenId].gemType);
        
        return string(
            abi.encodePacked(uri, '/', gemRank, '/', gemType, '.json')
        );
    }

    function mintGem() public payable {
        require(gemPrice <= msg.value, "Not enough Klay."); // minting 은 가격 지불해야만 가능

        uint tokenId = totalSupply() + 1;
        uint randomNonce = tokenId;

        uint randomRank = uint(keccak256(abi.encodePacked(blockhash(block.timestamp), msg.sender, randomNonce))) % 10;
        randomNonce++;
        uint randomType = uint(keccak256(abi.encodePacked(blockhash(block.timestamp), msg.sender, randomNonce))) % 10;

        uint gemRank;
        uint gemType;

        if (randomRank < 4) {
            gemRank = 1;
        } else if (4 <= randomRank && randomRank < 7) {
            gemRank = 2;
        } else if (7 <= randomRank && randomRank < 9) {
            gemRank = 3;
        } else {
            gemRank = 4;
        }

        if (randomType < 4) {
            gemType = 1;
        } else if (4 <= randomType && randomType < 7) {
            gemType = 2;
        } else if (7 <= randomType && randomType < 9) {
            gemType = 3;
        } else {
            gemType = 4;
        }

        payable(owner()).transfer(msg.value);    // owner(): Owner에서 사용 가능, 이 컨트랙을 발행한 지갑의 주소를 출력

        gemData[tokenId] = GemData(gemRank, gemType);

        _mint(msg.sender, tokenId);
    }
}