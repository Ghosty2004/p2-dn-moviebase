import Router from "next/router";
import Auth from "../../components/Auth";
import Layout from "../../components/Layout";
import { DefaultProps } from "../../utils/types";

export default function Login({ user }: DefaultProps): JSX.Element {
    if(user) Router.push("/");
    return (
        <Layout title="Login" user={user}>
            <Auth type="login" />
        </Layout>
    );
};