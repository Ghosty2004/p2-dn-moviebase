import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { user } from "../../utils/interfaces";

export default function Login(): JSX.Element {
    const [user, setUser] = useState<user>();

    useEffect(() => {
        
    }, []);

    return (
        <Layout title="Login">
            
        </Layout>
    );
};