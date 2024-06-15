// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {

    struct Campaign {
        string title;
        uint256 target;
        string description;
        uint256 deadline;
        address[] donators;
        uint256[] donations;
        uint256 amountCollected;
        address owner;
        string image;
    }
    
    //mapping to public
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberofCampaigns = 0;

    function createCampaign(address _owner,string memory _title, uint256  _target, string memory _description, uint256  _deadline, string memory _image) public returns
    (uint256) {
        Campaign storage campaign = campaigns[numberofCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.target = _target;
        campaign.title = _title;
        campaign.description = _description;
        campaign.deadline = _deadline;
        campaign.image = _image;

        campaign.amountCollected = 0;

        numberofCampaigns++;

        return numberofCampaigns - 1 ;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{
            value: amount
        }("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory){
        return(campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() view public returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberofCampaigns);
        for (uint256 i = 0; i < numberofCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

}