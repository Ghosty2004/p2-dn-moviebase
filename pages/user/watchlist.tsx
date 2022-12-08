import { Button, Container, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { FaList, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import { fetchUserWatchlist, toggleUserWatchList, userRemoveFromWatchList } from "../../utils/methods/user";
import { DefaultProps, MovieDetailsData } from "../../utils/types";

export default function Watchlist({ user }: DefaultProps): JSX.Element {
    if(!user) Router.push("/user/login");

    const [watchList, setWatchlist] = useState<Array<MovieDetailsData>>([]);
    const toast = useToast({ position: "bottom-right", isClosable: true });

    useEffect(() => {
        fetchUserWatchlist((window.localStorage.getItem("token") as string)).then((response) => {
            if(response.error || !response.result) return;
            setWatchlist(response.result);
        });
    }, []);

    return (
        <Layout title="Your watchlist" user={user}>
            <Container>
                {!watchList.length ? (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                ) : (
                    <>
                        <Heading><Icon as={FaList} /> Your watchlist</Heading>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Movie ID</Th>
                                    <Th>Movie Title</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {watchList.map((movie) => (
                                    <Tr key={movie.id}>
                                        <Td>{movie.id}</Td>
                                        <Td><Link href={`/movie/${movie.id}`}>{movie.title}</Link></Td>
                                        <Td>
                                            <Button leftIcon={ <FaTrash /> } onClick={() => {
                                                const toastId = toast({ title: "Removing from watchlist", status: "loading" });
                                                userRemoveFromWatchList((window.localStorage.getItem("token") as string), movie.id).then((response) => {
                                                    toast.update(toastId, { title: response.message, status: response.error ? "error" : "success" });
                                                    if(!response.error) setWatchlist(watchList.filter(f => f.id !== movie.id));
                                                });
                                            }}>Remove</Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </>
                )}
            </Container>
        </Layout>
    );
};