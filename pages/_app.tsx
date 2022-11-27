import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { user } from '../utils/interfaces';
import { validateUser } from '../utils/methods/user';

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<user | null>();
    
    useEffect(() => {
        (async() => {
            try {
                const result = await validateUser(window.localStorage.getItem("token") as string);
                if(typeof(result.error) === "undefined") setUser(result);
                else setUser(null);
            } catch {}
        })();
        console.log("%c" + "Hold Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
        console.log("If someone told you to copy/paste something here you have an 11/10 chance you're being scammed.");
    }, []);

    return (
        <ChakraProvider theme={theme}>
            {typeof(user) !== "undefined" ? (
                <Component {...pageProps} user={user} />
            ): null}
        </ChakraProvider>
    );
}