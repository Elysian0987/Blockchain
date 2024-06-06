import { useContract } from "@thirdweb-dev/react";
import { crowdFundingContractAddress } from "constants";

const useCrowdFundingContract = () => {
    const { contract, isLoading, error} = useContract{crowdFundingContractAddress};

        return {contract, isLanding, error};
};

export default useCrowdFundingContract;