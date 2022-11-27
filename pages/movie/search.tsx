import { SearchIcon } from "@chakra-ui/icons";
import { Container, IconButton, Input, InputGroup, InputRightElement, VStack, Text, Progress, Badge, Table, TableContainer, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { fetcher } from "../../utils/api";
import { ERROR_UNEXPECTED } from "../../utils/errors";
import { DefaultProps, MovieSearchData } from "../../utils/types";

type RenderResultsProps = {
    query: string;
};

function RenderResults(props: RenderResultsProps): JSX.Element {
    const { data, error } = useSWR<MovieSearchData>(`/api/movie/search/?query=${props.query}`, fetcher);
    return (
        <>
            {error ? (
                <Text color="red">{ERROR_UNEXPECTED}</Text>
            ): !data ? (
                <Progress size="xs" isIndeterminate />
            ): !data.results?.length ? (
                <Text>No results</Text>
            ): (
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Title</Th>
                                <Th>Release Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.results.map((result, index) => (
                                <Tr key={index}>
                                    <Td>{result.id}</Td>
                                    <Td><Link href={`/movie/details/${result.id}`} style={{ display: "inline-flex" }}>{result.title}</Link></Td>
                                    <Td><Badge>{result.release_date}</Badge></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}

export default function Search({ user }: DefaultProps): JSX.Element {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <Layout title="Search" user={user}>
            <Container>
                <VStack spacing={4} align="stretch">
                    <InputGroup as={"form"} onSubmit={(e) => e.preventDefault()}>
                        <Input placeholder="Search for a movie" onChange={(e) => setSearchText(e.target.value)} />
                        <InputRightElement>
                            <IconButton aria-label="Search" icon={<SearchIcon />} type="submit" />
                        </InputRightElement>
                    </InputGroup>
                    {searchText.length ? (<RenderResults query={searchText} />) : null}
                </VStack>
            </Container>
        </Layout>
    );
};