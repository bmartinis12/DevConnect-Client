import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/widgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight='500'>Sponsored</Typography>
                <Typography color={medium} sx={{ "&:hover": { color: palette.primary.light, cursor: 'pointer' }}} >Create Ad</Typography>
            </FlexBetween>
            <img width='100%'height='auto' alt='advert' src='https://devconnect-api.adaptable.app/assets/info4.jpeg' style={{ borderRadius: '0.75rem', margin: '0.75rem 0'}} />
            <FlexBetween>
                <Typography color={main}>LovelyCosmetics</Typography>
            </FlexBetween>
            <FlexBetween m='0.5rem 0'>
                <Typography color={medium} sx={{ "&:hover": { color: palette.primary.light, cursor: 'pointer' }}} >lovelyCosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m='0.5rem 0'>Discover your beauty's best friend with our exquisite cosmetics. Elevate your look, unleash your confidence - it's time to shine!</Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;
