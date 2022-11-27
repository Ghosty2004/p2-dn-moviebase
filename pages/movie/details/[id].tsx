import Image from "next/image";
import { Badge, Box, Center, CircularProgress, Container, Heading, HStack, Spacer, Stack, Tag, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../../components/Layout";
import { buildFlagImageUrl, buildImageUrl, fetcher } from "../../../utils/api";
import { ERROR_UNEXPECTED } from "../../../utils/errors";
import { DefaultProps, MovieDetailsData } from "../../../utils/types";

export default function Details({ user }: DefaultProps): JSX.Element {
    const { id } = useRouter().query;
    const { data, error } = useSWR<MovieDetailsData>(`/api/movie/details/?id=${id}`, fetcher);

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
                                    <Spacer />
                                    {data.spoken_languages.map((language, index) => (
                                        <Tooltip label={language.english_name}>
                                            <img src={buildFlagImageUrl(language.iso_639_1)} alt={language.english_name} width="24" height="24" key={index} />
                                        </Tooltip>
                                    ))}
                                </>
                            </Stack>
                            <Box>{data.overview}</Box>
                        </Stack>
                    </Stack>
                )}
            </Container>
        </Layout>
    );
};