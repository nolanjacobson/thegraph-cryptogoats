// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoGoat is ERC721, VRFConsumerBase, Ownable {
    using SafeMath for uint256;
    using Strings for string;

    event NewGoat(uint256 goatId, string name, uint256 randomness);
    event UpdatedGoatMetadata(uint256 goatId, string goatMetadata);

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;
    // rinkeby: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
    address public LinkToken;
    // rinkeby: 0x01BE23585060835E02B77ef475b0Cc51aA1e0709a

    struct Goat {
        uint256 strength;
        uint256 greed;
        uint256 savageness;
        uint256 privacy;
        uint256 wisdom;
        uint256 wealth;
        uint256 experience;
        string name;
    }

    Goat[] public goats;

    mapping(bytes32 => string) requestToGoat;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyhash
    )
        public
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("CryptoGoat", "CG")
    {
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function requestNewRandomGoat(
        uint256 userProvidedSeed,
        string memory name
    ) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToGoat[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
        emit UpdatedGoatMetadata(tokenId, _tokenURI);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 newId = goats.length;
        uint256 strength = (randomNumber % 100);
        uint256 greed = ((randomNumber % 10000) / 100);
        uint256 savageness = ((randomNumber % 1000000) / 10000);
        uint256 privacy = ((randomNumber % 100000000) / 1000000);
        uint256 wisdom = ((randomNumber % 10000000000) / 100000000);
        uint256 wealth = ((randomNumber % 1000000000000) / 10000000000);
        uint256 experience = 0;
        string memory name = requestToGoat[requestId];
        goats.push(
            Goat(
                strength,
                greed,
                savageness,
                privacy,
                wisdom,
                wealth,
                experience,
                name
            )
        );
        _safeMint(requestToSender[requestId], newId);
        emit NewGoat(newId, name, randomNumber);
    }

    function getLevel(uint256 tokenId) public view returns (uint256) {
        return sqrt(goats[tokenId].experience);
    }

    function getNumberOfGoats() public view returns (uint256) {
        return goats.length;
    }

    function getGoatOverView(uint256 tokenId)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            goats[tokenId].name,
            goats[tokenId].strength +
            goats[tokenId].greed +
            goats[tokenId].savageness +
            goats[tokenId].privacy +
            goats[tokenId].wisdom +
            goats[tokenId].wealth,
            getLevel(tokenId),
            goats[tokenId].experience
        );
    }

    function getGoatStats(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            goats[tokenId].strength,
            goats[tokenId].greed,
            goats[tokenId].savageness,
            goats[tokenId].privacy,
            goats[tokenId].wisdom,
            goats[tokenId].wealth,
            goats[tokenId].experience
        );
    }

    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
