import Head from "next/head";
import Link from "next/link";
import { Box, Heading, Button, Container, useDisclosure, HStack, Stack, Spacer, VStack, Grid, ButtonProps, Menu, MenuButton, MenuList, Icon, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaHistory, FaList, FaRegUserCircle, FaSearch, FaUser } from "react-icons/fa"
import NavLink from "./NavLink";

function Header() {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box bg="blue.500">
            <Container>
                <Stack as="nav" direction={['column', 'row']} justify="space-between" wrap="wrap" py="1.5rem">
                    <HStack justify="space-between">
                        <Heading as={Link} href="/" mr={8} size="lg">Moviebase</Heading>
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
                            <MenuButton as={NavLink} href="/movie/watchlist">
                                <MenuItem icon={<FaList />} disabled>Watchlist</MenuItem>
                            </MenuButton>
                            <MenuButton as={NavLink} href="/movie/history">
                                <MenuItem icon={<FaHistory />} disabled>History</MenuItem>
                            </MenuButton>
                        </Menu>
                    </Stack>

                    <Spacer />

                    <Box display={[isOpen ? 'flex' : 'none', 'flex']}>
                        <Menu>
                            <MenuButton as={Button} leftIcon={<FaRegUserCircle />}>Account</MenuButton>
                            <MenuList>
                                <MenuItem as={Link} href="/user/me" icon={<FaUser />}>Profile</MenuItem>
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
} & ButtonProps;

export default function Layout(props: LayoutProps) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid minH="100vh">
                <VStack w="full" align="stretch" spacing={8}>
                    <Header />
                    <Box as="main" h="full">{props.children}</Box>
                </VStack>
            </Grid>
        </>
    );
}