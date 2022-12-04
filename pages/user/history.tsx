import { Container, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { FaHistory } from "react-icons/fa";
import Layout from "../../components/Layout";
import { fetchUserHistory } from "../../utils/methods/user";
import { DefaultProps, MovieDetailsData } from "../../utils/types";

export default function History({ user }: DefaultProps): JSX.Element {
    if(!user) Router.push("/user/login");

    const [history, setHistory] = useState<Array<{ viewedAt: string } & MovieDetailsData>>([]);

    useEffect(() => {
        fetchUserHistory((window.localStorage.getItem("token") as string)).then((response) => {
            if(response.error || !response.result) return;
            setHistory(response.result);
        });
    }, []);

    return (
        <Layout title="History" user={user}>
            <Container>
                {!history.length ? (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                ) : (
                    <>
                        <Heading><Icon as={FaHistory}/> History</Heading>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Movie ID</Th>
                                    <Th>Movie Name</Th>
                                    <Th>Viewed at</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {history.map((movie) => (
                                    <Tr key={movie.id}>
                                        <Td>{movie.id}</Td>
                                        <Td><Link href={`/movie/details/${movie.id}`}>{movie.title}</Link></Td>
                                        <Td>{movie.viewedAt}</Td>
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