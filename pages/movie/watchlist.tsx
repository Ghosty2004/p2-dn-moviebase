import Router from "next/router";
import Layout from "../../components/Layout";
import { DefaultProps } from "../../utils/types";

export default function WatchList({ user }: DefaultProps): JSX.Element {
    if(!user) Router.push("/user/login");

    return (
        <Layout title="Your watchlist" user={user}>
            
        </Layout>
    );
};