import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/userWidget";
import MyPostWidget from "../widgets/myPostWidget";
import PostsWidget from "../widgets/postsWidget";
import AdvertWidget from "../widgets/advertWidget";
import FriendListWidget from "../widgets/friendListWidget";
import ErrorBoundary from "../errorBoundary/errorBoundary";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <ErrorBoundary>
                <Navbar />
                <Box width='100%' padding='2rem 6%' display={isNonMobileScreens ? 'flex' : 'block'} gap='0.5rem' justifyContent='space-between'>
                    <Box flexBasis={isNonMobileScreens ? '26%' : undefined } position={isNonMobileScreens ? 'sticky' : undefined } top={isNonMobileScreens ? '100px' : undefined } height={isNonMobileScreens ? 'fit-content' : undefined } >
                        <UserWidget userId={_id} picturePath={picturePath} />
                    </Box>
                    <Box flexBasis={isNonMobileScreens ? '42%' : undefined } mt={isNonMobileScreens ? undefined : '2rem'} >
                        <MyPostWidget picturePath={picturePath} /> 
                        <PostsWidget userId={_id} /> 
                    </Box>
                    {isNonMobileScreens && (
                        <Box flexBasis='26%' height='fit-content'>
                            <AdvertWidget />
                            <Box m='2rem 0' />
                            <FriendListWidget userId={_id} />
                        </Box>
                    )}
                </Box>
            </ErrorBoundary>
        </Box>
    )
};

export default HomePage;