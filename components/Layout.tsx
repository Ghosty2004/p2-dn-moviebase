import Head from "next/head";
import Link from "next/link";
import { Box, Heading, Button, Container, useDisclosure, HStack, Stack, Spacer, VStack, Grid, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaHistory, FaList, FaRegUserCircle, FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import NavLink from "./NavLink";
import { DefaultProps } from "../utils/types";

function Header({ user }: DefaultProps) {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box bg="blue.500">
            <Container>
                <Stack as="nav" direction={['column', 'row']} justify="space-between" wrap="wrap" py="1.5rem">
                    <HStack justify="space-between">
                        <Heading as={Link} display="flex" href="/" mr={8} size="lg"><Image src="/logo.png" width="30px" alt="logo" mr={2} /> Moviebase</Heading>
                        <Box display={['block', 'none']} onClick={onToggle}>
                            <Button variant="outline">
                                <HamburgerIcon />
                            </Button>
                        </Box>
                    </HStack>

                    <Stack direction={['column', 'row']} justify="start" align={['start', 'center']} display={[isOpen ? 'flex' : 'none', 'flex']} spacing={4}>
                        <Menu isLazy>
                            <MenuButton as={NavLink} href="/movie/search">
                                <MenuItem icon={<FaSearch />}>Search</MenuItem>
                            </MenuButton>
                            <MenuButton as={NavLink} href="/user/watchlist">
                                <MenuItem icon={<FaList />} disabled>Watchlist</MenuItem>
                            </MenuButton>
                            <MenuButton as={NavLink} href="/user/history">
                                <MenuItem icon={<FaHistory />} disabled>History</MenuItem>
                            </MenuButton>
                        </Menu>
                    </Stack>

                    <Spacer />

                    <Box display={[isOpen ? 'flex' : 'none', 'flex']}>
                        <Menu>
                            <MenuButton as={Button} leftIcon={<FaRegUserCircle />}>{user ? user.name : <>User</>}</MenuButton>
                            <MenuList>
                                {user ? (
                                    <>
                                        <MenuItem as={Link} href="/user/me" icon={<FaUser />}>Profile</MenuItem>
                                        <MenuItem icon={<FaSignOutAlt />} onClick={() => {
                                            window.localStorage.removeItem("token");
                                            window.location.href = "/";
                                        }}>Log out</MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem as={Link} href="/user/login" icon={<FaSignInAlt />}>Log in</MenuItem>
                                        <MenuItem as={Link} href="/user/register" icon={<FaSignInAlt />}>Register</MenuItem>
                                    </>
                                )}
                            </MenuList>
                        </Menu>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

type LayoutProps = {
    title: string;
    meta?: {
        description?: string;
        keywords?: string;
    };
    children: React.ReactNode;
} & DefaultProps;

export default function Layout({ title, meta, children, user }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content={title} />
                <meta property="og:image" content="http://ghosty2004.go.ro/logo.png" />
                {meta?.description ? <meta property="og:description" content={meta.description} /> : null}
                {meta?.keywords ? <meta property="og:keywords" content={meta.keywords} /> : null}
            </Head>
            <Grid minH="100vh">
                <VStack w="full" align="stretch" spacing={8}>
                    <Header user={user} />
                    <Box as="main" h="full">{children}</Box>
                </VStack>
            </Grid>
        </>
    );
}