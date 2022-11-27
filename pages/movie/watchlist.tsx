import Layout from "../../components/Layout";
import { DefaultProps } from "../../utils/types";

export default function WatchList({ user }: DefaultProps): JSX.Element {
    return (
        <Layout title="Your watchlist" user={user}>
            
        </Layout>
    );
};