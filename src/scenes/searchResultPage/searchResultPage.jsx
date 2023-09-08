import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import Friend from "../../components/friend";

const SearchResultPage = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
    const { palette } = useTheme();
    const searchedUser = useSelector((state) => state.searchedUser);

    return (
        <Box>
            <ErrorBoundary>
                <Navbar />
                <Box width={ isNonMobileScreens ? '50%' : '90%'} display='flex' flexDirection='column' gap='1.5rem' margin='2rem auto'>
                { searchedUser.length === 0 ? (
                    <Typography color={palette.neutral.medium} textAlign='center' mb='1rem' variant="h4" >No User Found</Typography>
                ) : 
                    searchedUser.map((friend) => (
                        <Box key={friend._id} backgroundColor={palette.background.alt} padding='1rem' m='.25rem 0' borderRadius='.75rem'>
                            <Friend friendId={friend._id} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.occupation} userPicturePath={friend.picturePath} />
                        </Box>
                    ))
                }
                </Box>
            </ErrorBoundary>
        </Box>
    )
};

export default SearchResultPage;