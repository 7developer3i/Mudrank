import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from './settings/settings-notifications';
import { SettingsPassword } from './settings/settings-password';
import { Layout as DashboardLayout } from './layout';
import TopNav from './top-nav';

const Page = () => (
    <>
        {/* <Head> */}
        <title>
            Settings | Devias Kit
        </title>
        {/* </Head> */}
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            {/* <TopNav /> */}
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Typography variant="h4" color={'#000000'}>
                        Settings
                    </Typography>
                    <SettingsNotifications />
                    <SettingsPassword />
                </Stack>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
