import MainCard from "ui-component/cards/MainCard";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useAddress, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import useCrowdFundingContract from "hooks/useCrowdFundingContracts";
import moment from 'moment';
import { FileUploader } from 'react-drag-drop-files';
import { useState } from "react";

const CreateCampain = () => {
    const navigate = useNavigate();
    const { contract, error } = useCrowdFundingContract();
    const { mutateAsync: upload } = useStorageUpload();
    const address = useAddress();
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    });

    const [imageFle, setImageFile] = useState(null);

    const fileTypes = ["JPG", "PNG", "GIF"]

    const handleImageChange = (file) => {
        setImageFile(file);
    }

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const uploadImage = async () => {
        const dataToUpload = [imageFle];
        const uris = await upload({ data: dataToUpload });
        console.log(uris);
        return uris[0];
    }

    if (!address) {
        return (
            <MainCard title='Create Campaign'>
                <Typography variant="h6" color={'red'}>Please connect your wallet to create campaign.</Typography>
            </MainCard>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const imageURI = await uploadImage();
            setForm({ ...form, image: imageURI })

            const targetInWei = ethers.utils.parseEther(form.target);

            //adding data to smartcontarct

            console.log([
                address,
                form.title,
                targetInWei,
                form.description,
                new Date(form.deadline).getTime(),
                imageURI.toString()
            ])
            const data = await createCampaign({
                args: [
                    address,
                    form.title,
                    targetInWei,
                    form.description,
                    new Date(form.deadline).getTime(),
                    imageURI.toString()
                ]
            });

            console.log('transaction: ', data)
            alert('new campaignn created successfully')
            navigate('/home')
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <MainCard
            title='Create Campaign'
        >
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={1}
                >
                    <Grid
                        item
                        md={5}
                        sm={12}
                    >
                        <FileUploader
                            handleChange={handleImageChange}
                            name='image'
                            types={fileTypes}
                            multiple={false}
                        />
                        {
                            imageFle && (
                                <Box sx={{ mt: 2, mb: 2}}>
                                    <Typography>Image Preview: </Typography>
                                    <img src={URL.createObjectURL(imageFle)} alt="" style={{width:'100%',borderRadius: '10px'}}/>
                                </Box>
                            )
                        }
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={12}
                    >
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={form.title}
                            onChange={(e) => handleFormFieldChange('title', e)}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            value={form.description}
                            onChange={(e) => handleFormFieldChange('description', e)}
                        />
                        <TextField
                            fullWidth
                            label="Target Amount (ETH)"
                            variant="outlined"
                            margin="normal"
                            value={form.target}
                            onChange={(e) => handleFormFieldChange('target', e)}
                        />
                        <TextField
                            fullWidth
                            label="Deadline"
                            variant="outlined"
                            margin="normal"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: moment().format('YYYY-MM-DD') }}
                            value={form.deadline}
                            onChange={(e) => handleFormFieldChange('deadline', e)}
                        />
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {
                                isLoading ? <CircularProgress size={24} /> : 'Create Campaign'
                            }
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </form>
        </MainCard>
    )
};

export default CreateCampain;