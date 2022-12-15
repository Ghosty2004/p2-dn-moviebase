import Image from "next/image";
import { Badge, Box, Button, Center, CircularProgress, Container, Heading, HStack, Icon, Stack, Tag, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { buildFlagImageUrl, buildImageUrl, fetcher } from "../../utils/api";
import { ERROR_UNEXPECTED } from "../../utils/errors";
import { DefaultProps, MovieDetailsData } from "../../utils/types";
import { FaExternalLinkAlt, FaFlag, FaMinus, FaPlus, FaSpeakap, FaStar } from "react-icons/fa";
import Link from "next/link";
import { addUserHistoryList, toggleUserWatchList } from "../../utils/methods/user";

function RenderActions({ user, movieId }: DefaultProps & { movieId: number }): JSX.Element {
    const [isInWatchList, setIsInWatchList] = useState<boolean>(user?.watchList?.includes(movieId) || false);
    const toast = useToast({ position: "bottom-right", isClosable: true });

    return (
        <>
            {user ? (
                <Box>
                    <Button size="sm" colorScheme={isInWatchList ? "red" : "green"} leftIcon={isInWatchList ? <FaMinus /> : <FaPlus />} onClick={() => {
                        const toastId = toast({ title: `${isInWatchList ? "Removing from watch list" : "Adding to watch list"}...`, status: "loading" });
                        toggleUserWatchList((window.localStorage.getItem("token") as string), movieId).then((response) => {
                            if(response.error) return;
                            setIsInWatchList(response.status === "added");
                            toast.update(toastId, { title: `${response.status === "added" ? "Added to watch list" : "Removed from watch list"}`, status: "success" });
                        });
                    }}>{isInWatchList ? "Remove from watchlist" : "Add to watchlist"}</Button>
                </Box>
            ): null}
        </>
    );
};

export default function Details({ user }: DefaultProps): JSX.Element {
    const { id } = useRouter().query;
    const { data, error } = useSWR<MovieDetailsData>(`/api/movie/details/?id=${id}`, fetcher);

    if(!error && data?.id && user) {
        addUserHistoryList((localStorage.getItem("token") as string), data.id);
    }

    return (
        <Layout title={data?.title || "Not found"} user={user}>
            <Container>
                {error ? (
                    <Text color="red">{ERROR_UNEXPECTED}</Text>
                ): !data ? (
                    <Center h="full">
                        <CircularProgress isIndeterminate />
                    </Center>
                ): data.success === false ? (
                    <Text color="red">{data.status_message}</Text>
                ): (
                    <Stack direction={['column', 'row']}>
                        <Box minW="300px" pos="relative">
                            <Image
                                src={buildImageUrl(data.poster_path, "w300")}
                                alt="Movie poster"
                                layout="responsive"
                                width="300"
                                height="450"
                                objectFit="contain"
                                unoptimized
                            />
                        </Box>
                        <Stack pl={3}>
                            <HStack justify="space-between">
                                <Heading as="h2">{data.title}</Heading>
                                <Box>
                                    <Tag colorScheme="blue" variant="solid">
                                        {data.release_date}
                                    </Tag>
                                </Box>
                            </HStack>

                            <Box>{data.tagline}</Box>

                            <Stack direction="row">
                                <>
                                    {data.genres?.map((genre) => (
                                        <Badge key={genre.id} colorScheme="blue" variant="outline">
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </>
                            </Stack>
                            <Box>{data.overview}</Box>

                            <Box cursor="default" border="2px"borderColor="blue.300"  p="10px">
                                <HStack>
                                    <Tooltip label={`${data.spoken_languages.length} language(s)`}><Badge><Icon as={FaSpeakap} /> Available in:</Badge></Tooltip>
                                    {data.spoken_languages.map((language, index) => (
                                        <Tooltip label={language.english_name} key={index}>
                                            <img src={buildFlagImageUrl(language.iso_639_1)} alt={language.english_name} width="24" height="24" key={index} />
                                        </Tooltip>
                                    ))}
                                </HStack>

                                <HStack pt="3px">
                                    <Badge><Icon as={FaFlag} /> Original language:</Badge>
                                    <Tooltip label={data.original_language}>
                                        <img src={buildFlagImageUrl(data.original_language)} alt={data.original_language} width="24" height="24" />
                                    </Tooltip>
                                </HStack>

                                <HStack>
                                    <Badge><Icon as={FaStar} /> Rating:</Badge>
                                    <Text>{data.vote_count}</Text>
                                </HStack>

                                {data.homepage.length ? (
                                    <HStack>
                                        <Badge><Icon as={FaExternalLinkAlt} /> Home page:</Badge>
                                        <Text><Link href={data.homepage}>{data.homepage}</Link></Text>
                                    </HStack>
                                ): null}
                            </Box>

                            <RenderActions user={user} movieId={data.id} />
                        </Stack>
                    </Stack>
                )}
            </Container>
        </Layout>
    );
};