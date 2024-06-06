import MainCard from "ui-component/cards/MainCard";
import useCrowdFundingContract from "hooks/useCrowdFundingContracts";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

import { Typography, Box, Grid, CircularProgress } from "@mui/material";

const Home = () => {
    const address = useAddress()
    const {contract, isLoading, error} = useCrowdFundingContract();

    useEffect(() => {
        const fetchCampaigns = async () => {
            const campaigns = await contract.call('getCampaigns');
            console.log(campaigns);
        };

        fetchCampaigns();
    }, [])


    return(
        <MainCard
        title="Home"
        >

        </MainCard>
    )
};

export default Home;