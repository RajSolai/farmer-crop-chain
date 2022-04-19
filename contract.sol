// SPDX-License-Identifier: GPL-3.0
/*
    Coded, Tested and Implemented by Solai Raj M
    email : msraj085@gmail.com
    github: github.com/RajSolai
    Licnesed unded GNU Public License v3
    Freely Distributed
*/


pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Strings.sol";

library StringUtils {
    /// @dev Does a byte-by-byte lexicographical comparison of two strings.
    /// @return a negative number if `_a` is smaller, zero if they are equal
    /// and a positive numbe if `_b` is smaller.
    function compare(string memory _a, string memory _b) pure private returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string memory _a, string memory _b) pure public returns (bool) {
        return compare(_a, _b) == 0;
    }
    /// @dev Finds the index of the first occurrence of _needle in _haystack
    function indexOf(string memory _haystack, string memory _needle) pure private returns (int)
    {
    	bytes memory h = bytes(_haystack);
    	bytes memory n = bytes(_needle);
    	if(h.length < 1 || n.length < 1 || (n.length > h.length)) 
    		return -1;
    	else if(h.length > (2**128 -1)) // since we have to be able to return -1 (if the char isn't found or input error), this function must return an "int" type with a max length of (2^128 - 1)
    		return -1;									
    	else
    	{
    		uint subindex = 0;
    		for (uint i = 0; i < h.length; i ++)
    		{
    			if (h[i] == n[0]) // found the first char of b
    			{
    				subindex = 1;
    				while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) // search until the chars don't match or until we reach the end of a or b
    				{
    					subindex++;
    				}	
    				if(subindex == n.length)
    					return int(i);
    			}
    		}
    		return -1;
    	}	
    }
}

contract CropSupplyChain {

    mapping (string => uint) cropBalances;
    mapping (string => mapping (string => uint)) userBalances;
    mapping (string => uint) cropPrices;
    mapping (string => string) userType;
    mapping (string => string) userPasswords;
    string[] transactions;

    // customer buys the crops
    function buyCrops (uint quantity,string memory cropType,string memory fromId,string memory toId) public {
        userBalances[fromId][cropType] -= quantity;
        userBalances[toId][cropType] += quantity;
        string memory statement = makeStatement(toId," bought ",quantity,cropType,fromId);
        transactions.push(statement);
    }

    // Farmer adds the crops
    function addCrops (uint quantity,string memory cropType,string memory userId) public {
        cropBalances[cropType] += quantity;
        userBalances[userId][cropType] += quantity;
    }

    function setCropPrice (string memory cropType,uint cropPrice) public {
        cropPrices[cropType] = cropPrice;
    }

    function getCropPrice (string memory cropType) public view returns (uint) {
        return cropPrices[cropType];
    }

    function showCropBalance(string memory cropType) public view returns (uint) {
        return cropBalances[cropType];
    }

    function showUserBalance(string memory cropType,string memory userId) public view returns (uint) {
        return userBalances[userId][cropType];
    }

    function showTransactions () public view returns (string[] memory) {
        return transactions;
    }

    function loginUser(string memory _userAccountNumber, string memory _userPassword, string memory _userType) public view returns (string memory) {
        if (StringUtils.equal(userType[_userAccountNumber],"")) {
            return "no-user-found";
        }
        if (StringUtils.equal(userType[_userAccountNumber],_userType)
             &&
            StringUtils.equal(userPasswords[_userAccountNumber],_userPassword)){
                return "login-success";
        }
        return "login-fail";
    }

    function createUser(string memory _userAccountNumber, string memory _userPassword, string memory _userType) public {
        userType[_userAccountNumber] = _userType;
        userPasswords[_userAccountNumber] = _userPassword;
    }

    // Util Functions

    // https://stackoverflow.com/questions/32157648/string-concatenation-in-solidity
    function makeStatement (string memory party1, string memory action,uint quantity, string memory crop, string memory party2 ) private pure returns (string memory) {
        // PARTY1 + (bought / sold ) + quantity + "of" + crop + "from" + PARTY2
        bytes memory b;
        b = abi.encodePacked(party1);
        b = abi.encodePacked(b, action);
        b = abi.encodePacked(b, Strings.toString(quantity));
        b = abi.encodePacked(b," ");
        b = abi.encodePacked(b, crop);
        b = abi.encodePacked(b," ");
        b = abi.encodePacked(b, party2);

        string memory s = string(b);
        return s;
    }

}
