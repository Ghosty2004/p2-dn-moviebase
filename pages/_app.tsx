import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { user } from '../utils/interfaces';
import { validateUser } from '../utils/methods/user';

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<user | null>();
    
    useEffect(() => {
        const init = async () => {
            try {
                const result = await validateUser(window.localStorage.getItem("token") as string);
                if(typeof(result.error) === "undefined") setUser(result);
                else setUser(null);
            } catch {}
        };
        init();
    }, []);

    return (
        <ChakraProvider theme={theme}>
            {typeof(user) !== "undefined" ? (
                <Component {...pageProps} user={user} />
            ): null}
        </ChakraProvider>
    );
}