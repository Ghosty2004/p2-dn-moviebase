import { Center, Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import { DefaultProps } from "../utils/types";

export default function Home({ user }: DefaultProps): JSX.Element {
    return (
        <Layout title="Home" meta={{ description: "Moviebase - Home page" }} user={user}>
            <Center h="full">
                <Heading as="h2">Welcome to homepage</Heading>
            </Center>
        </Layout>
    );
};