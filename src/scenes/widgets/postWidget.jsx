import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ReplyOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/friend";
import WidgetWrapper from "../../components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments, update }) => {
    const [isComments, setIsComments] = useState(false);
    const [comment, setCommnet] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const primary = palette.primary.medium;
    const main = palette.neutral.main;

    const patchLike = async () => {
        const response = await fetch(`https://devconnect-api.adaptable.app/posts/${postId}/like`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const patchComment = async () => {
        const response = await fetch(`https://devconnect-api.adaptable.app/posts/${postId}/comment`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setCommnet('');
    }

    const handleDelete = async () => {
        const response = await fetch(`https://devconnect-api.adaptable.app/posts/${postId}/delete`, {
            method: 'DELETE',
            headers: { 
                Authorization: `Bearer ${token}`,
            },
        });
        const posts = await response.json();
        if(posts.deletedCount === 1){
            update(true);
        }
    }

    return (
        <WidgetWrapper m='2rem 0'>
            <Friend  friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
            <Typography color={main} sx={{ marginTop: '1rem' }}>{description}</Typography>
            {picturePath && (
                <img width='100%' height='auto' alt='post' style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }} src={`https://devconnect-api.adaptable.app/assets/${picturePath}`} />
            )}
            <FlexBetween mt='0.25rem' >
                <FlexBetween gap='1rem'>
                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />                           
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                {loggedInUserId === postUserId && (
                    <IconButton onClick={handleDelete}>
                        <DeleteOutlineOutlined />
                    </IconButton>
                )}
            </FlexBetween>
            {isComments && (
                <Box mt='0.5rem'>
                    <FlexBetween>
                        <FlexBetween width='90%' m='auto' >
                            <InputBase type='text' name='comment' value={comment} onChange={(e) => setCommnet(e.target.value)}  placeholder="Your thoughts..." style={{ margin: '0.5rem 0', paddingLeft: '1rem', backgroundColor: palette.background.alt, outline: 'none', width: '70%' }}/>
                            <IconButton disabled={!comment} onClick={patchComment} >
                                <ReplyOutlined sx={{ color: primary }} />
                            </IconButton>
                        </FlexBetween>
                    </FlexBetween>
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, margin: '0.5rem 0', paddingLeft: '1rem' }}>{comment}</Typography>
                        </Box>     
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget
