import {Box, Container} from "@mui/material";

const Footer = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: '#676767',
                p: 6
            }}
            component={"footer"}
            >

                <Container maxWidth={'sm'}>
                    Footer
                </Container>

            </Box>
        </>
    );
}

export default Footer;