import { Card, CardBody, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { buildImageUrl } from "../utils/api";
import { fetchUserRecommendation } from "../utils/methods/user";
import { DefaultProps, userRecommendationResponse } from "../utils/types";

export default function Home({ user }: DefaultProps): JSX.Element {
    const [recommendation, setRecommendation] = useState<userRecommendationResponse>();

    useEffect(() => {
        fetchUserRecommendation((window.localStorage.getItem("token") as string)).then(setRecommendation)
    }, []);

    return (
        <Layout title="Home" meta={{ description: "Moviebase - Home page" }} user={user}>
            <Container>
                <Heading size="lg">Welcome!</Heading>
                <Heading size="sm">
                    {typeof(recommendation) === "undefined" ? (
                        <>We are searching some recommendations for you...</>
                    ): !recommendation?.results?.length ? (
                        <>No recommendations found. Please add more movies to your watchlist!</>
                    ): (
                        <>Found {recommendation.results.length} recommendations based on your watchlist.</>
                    )}
                </Heading>
                {typeof(recommendation) !== "undefined" && !recommendation.error && recommendation.results?.length ? (
                    <>
                        <SimpleGrid pt="20px" columns={[1, 2, 3, 4]} spacing={10}>
                            {recommendation.results.map((result) => (
                                <Card minW="300px">
                                    <CardBody as={Link} href={`/movie/${result.id}`}>
                                        <Image
                                            src={buildImageUrl((result.poster_path as string), "w300")}
                                            alt="Movie poster"
                                            layout="responsive"
                                            width="250"
                                            height="300"
                                            objectFit="contain"
                                            unoptimized
                                        />
                                        <Heading size="md">{result.title}</Heading>
                                    </CardBody>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </>
                ): null}
            </Container>
        </Layout>
    );
};