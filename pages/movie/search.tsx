import { SearchIcon } from "@chakra-ui/icons";
import { Container, IconButton, Input, InputGroup, InputRightElement, VStack, Text, Progress, Badge, Table, TableContainer, Thead, Tr, Th, Tbody, Td, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaSort } from "react-icons/fa";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { fetcher } from "../../utils/api";
import { ERROR_UNEXPECTED } from "../../utils/errors";
import { DefaultProps, MovieSearchData } from "../../utils/types";

type RenderResultsProps = {
    query: string;
};

type SortState = {
    sortType: "asc" | "desc";
    sortBy: "id" | "title" | "releaseDate" | "voteCount";
};

function RenderResults(props: RenderResultsProps): JSX.Element {
    const { data, error } = useSWR<MovieSearchData>(`/api/movie/search/?query=${props.query}`, fetcher);

    const [sort, setSort] = useState<SortState>({
        sortType: "asc",
        sortBy: "id"
    });

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
                                <Th cursor="pointer" onClick={() => setSort({ sortType: sort.sortType === "asc" ? "desc" : "asc", sortBy: "id" })}><Icon as={FaSort} /> ID</Th>
                                <Th cursor="pointer" onClick={() => setSort({ sortType: sort.sortType === "asc" ? "desc" : "asc", sortBy: "title" })}><Icon as={FaSort} /> Title</Th>
                                <Th cursor="pointer" onClick={() => setSort({ sortType: sort.sortType === "asc" ? "desc" : "asc", sortBy: "releaseDate" })}><Icon as={FaSort} /> Release Date</Th>
                                <Th cursor="pointer" onClick={() => setSort({ sortType: sort.sortType === "asc" ? "desc" : "asc", sortBy: "voteCount" })}><Icon as={FaSort} /> Vote Count</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.results.sort((a, b) => {
                                switch(sort.sortBy) {
                                    case "id": return a.id && b.id ? (sort.sortType === "asc" ? a.id - b.id : b.id - a.id) : 0;
                                    case "title": return a.title && b.title ? (sort.sortType === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)) : 0;
                                    case "releaseDate": return a.release_date && b.release_date ? (sort.sortType === "asc" ? a.release_date.localeCompare(b.release_date) : b.release_date.localeCompare(a.release_date)) : 0;
                                    case "voteCount": return a.vote_count && b.vote_count ? (sort.sortType === "asc" ? a.vote_count - b.vote_count : b.vote_count - a.vote_count) : 0;
                                }
                            }).map((result, index) => (
                                <Tr key={index}>
                                    <Td>{result.id}</Td>
                                    <Td><Link href={`/movie/${result.id}`} style={{ display: "inline-flex" }}>{result.title}</Link></Td>
                                    <Td><Badge>{result.release_date}</Badge></Td>
                                    <Td>{result.vote_count}</Td>
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