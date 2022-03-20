// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VoidNerd is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    uint256 COUNTER;

    uint256 fee = 0.0001 ether;

    struct Void {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Void[] public voids;

    event NewVoid(address indexed owner, uint256 id, uint256 dna);

    // Helpers
    function _createRandomNumber(uint256 _mod) internal view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randomNumber % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Creation
    function _createVoidNerd(string memory _name) internal {
        uint8 randomRarity = uint8(_createRandomNumber(100));
        uint256 randomDna = _createRandomNumber(10**16);
        Void memory newVoid = Void(_name, COUNTER, randomDna, 1, randomRarity);
        voids.push(newVoid);
        _safeMint(msg.sender, COUNTER);
        emit NewVoid(msg.sender, COUNTER, randomDna);
        COUNTER++;
    }

    function createRandomVoidNerd(string memory _name) public payable {
        require(msg.value >= fee, "Amount insufficient");
        _createVoidNerd(_name);
    }

    // Getters
    function getVoidNerds() public view returns (Void[] memory) {
        return voids;
    }

    // Quite Extensive function
    function getOwnerVoidNerd(address _owner)
        public
        view
        returns (Void[] memory)
    {
        Void[] memory result = new Void[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < voids.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = voids[i];
                counter++;
            }
        }
        return result;
    }

    // Actions
    function levelUp(uint256 _voidId) public {
        require(ownerOf(_voidId) == msg.sender, "Unauthorized");
        Void storage void = voids[_voidId];
        void.level++;
    }
}
