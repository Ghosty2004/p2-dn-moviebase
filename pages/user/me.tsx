import Router from "next/router";
import { Container } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { DefaultProps } from "../../utils/types";

export default function Me({ user }: DefaultProps): JSX.Element {
    if(!user) Router.push("/user/login");
    return (
        <Layout title="Your account" user={user}>
            <Container>

            </Container>
        </Layout>
    );
};