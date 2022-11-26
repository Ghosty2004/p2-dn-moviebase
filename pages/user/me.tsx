import { Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { validateUser } from "../../utils/methods/user";
import { user } from "../../utils/interfaces";

export default function Me(): JSX.Element {
    const [user, setUser] = useState<user>();
    useEffect(() => {
        validateUser(window.localStorage.getItem("token") as string).then((result) => {
            if(!result?.error) setUser(result);
            else window.location.href = "/";
        });
    }, []);
    return (
        <Layout title="Your account">
            {user ? (
                <Container>
                    We got this
                </Container>
            ): null}
        </Layout>
    );
};