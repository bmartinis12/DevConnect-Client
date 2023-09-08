import  { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined, ShareOutlined} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material';
import UserImage from '../../components/userImage';
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/widgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`https://devconnect-api-5vst.onrender.com/users/${userId}`, {
            method: "GET", 
            headers: { Authorization: `Bearer ${token}`}       
        });
        const data = await response.json();
        setUser(data);
    };

    const share = () => {
        navigator.clipboard.writeText(`https://devconnect-dmk2.onrender.com/profile/${userId}`);
        setIsOpen(true);
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions, 
        friends
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween gap='0.5rem' pb='1.1rem' onClick={() => navigate(`/profile/${userId}`)}>
                <FlexBetween gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography variant='h4' color={dark} fontWeight='500' sx={{ "&:hover": { color: palette.primary.light, cursor: 'pointer' }}}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium} >{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />
            <Box p='1rem 0'>
                <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                    <LocationOnOutlined fontSize='large' sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display='flex' alignItems='center' gap='1rem'>
                    <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box p='1rem 0'>
                <FlexBetween mb='0.5rem'>
                    <Typography color={medium} >Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight={500} >{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium} >Impressions of your posts</Typography>
                    <Typography color={main} fontWeight={500} >{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />
            <Box p='1rem 0'>
                <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>Social Profiles</Typography>
                <FlexBetween gap='1rem' mb='.5rem'>
                    <FlexBetween gap='1rem'>
                        <i className="fa-brands fa-twitter" style={{ fontSize: '25px', color: main }}></i>
                        <Box>
                            <Typography color={main} fontWeight='500'>Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap='1rem' mb='.5rem'>
                    <FlexBetween gap='1rem'>
                        <i className="fa-brands fa-linkedin" style={{ fontSize: '25px', color: main }}></i>
                        <Box>
                            <Typography color={main} fontWeight='500'>LinkedIn</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <FlexBetween gap='1rem'>
                        <i className="fa-solid fa-file-code" style={{ fontSize: '25px', color: main }}></i>
                        <Box>
                            <Typography color={main} fontWeight='500'>DevConnect</Typography>
                            <Typography color={medium}>Developer Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <IconButton onClick={share}>
                        <ShareOutlined sx={{ color: main }} />
                    </IconButton>
                </FlexBetween>
                {isOpen && (
                <FlexBetween gap='1rem'>
                        <FlexBetween gap='1rem'>
                            <FlexBetween>
                                <Typography color={main}>Copied to your Clipboard - </Typography>
                                <IconButton onClick={() => setIsOpen(false)}>
                                    <CloseIcon sx={{ color: 'red' }}/>
                                </IconButton>
                            </FlexBetween>
                        </FlexBetween>
                </FlexBetween>
                )}  
            </Box>
        </WidgetWrapper>
    )
};

export default UserWidget;
