import Auth from "../../components/Auth";
import Layout from "../../components/Layout";
import { DefaultProps } from "../../utils/types";

export default function Register({ user }: DefaultProps): JSX.Element {
    return (
        <Layout title="Register" user={user}>
            <Auth type="register" />
        </Layout>
    );
};