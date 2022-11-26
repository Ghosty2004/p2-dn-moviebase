import { useState } from "react";
import { Box, Button, Center, CreateToastFnReturn, FormControl, FormLabel, Heading, Icon, Input, InputGroup, Stack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import { loginUser, registerUser } from "../utils/methods/user";
import { timeout } from "../utils/api";

type ValidTypes = "login" | "register";
type InputData = {
    name: string;
    eMail: string;
    password: string;
}

async function authProcessThis(toast: CreateToastFnReturn, type: ValidTypes, { name, eMail, password }: InputData): Promise<void> {
    switch(type) {
        case "login": {
            const toastId = toast({ title: "Logging in...", status: "loading" });
            loginUser(name, password).then(async(result) => {
                await timeout(1000);
                if(result.error) return toast.update(toastId, { title: result.message, status: "error" });
                toast.update(toastId, { title: "Logged in.", status: "success" });
                await timeout(2000);
                window.localStorage.setItem("token", result.token as string);
                window.location.href = "/user/me";
            });
            break;
        }
        case "register": {
            const toastId = toast({ title: "Signing up...", status: "loading" });
            registerUser(name, eMail, password).then(async(result) => {
                await timeout(1000);
                if(result.error) return toast.update(toastId, { title: result.message, status: "error" });
                await timeout(2000);
                window.localStorage.setItem("token", result.token as string);
                window.location.href = "/user/me";
            });
        }
    }
};

export default function Auth({ type }: { type: ValidTypes }): JSX.Element {
    const toast = useToast({ position: "bottom-right", isClosable: true });
    const [inputData, setInputData] = useState<InputData>({ name: "", eMail: "", password: "" });
    return (
        <Center h="full">
            <Box bg="blue.900" borderRadius="10px" p={10}>
                <Heading as={Center} size="lg"> <Icon m={2} as={FaSignInAlt} /> {type.toUpperCase()}</Heading>
                <InputGroup as="form" display="block" onSubmit={(e) => e.preventDefault()}>
                    <Stack pl={20} pr={20} pt={10} pb={10}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" onChange={(e) => setInputData({ ...inputData, name: e.target.value })} required />
                        </FormControl>
                        {type === "register" ? (
                            <FormControl>
                                <FormLabel>E-Mail</FormLabel>
                                <Input type="email" onChange={(e) => setInputData({ ...inputData, eMail: e.target.value })} required />
                            </FormControl>
                        ): null}
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e) => setInputData({ ...inputData, password: e.target.value })} required />
                        </FormControl>
                    </Stack>
                    <Center>
                        <Button type="submit" leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={() => authProcessThis(toast, type, inputData)}>{type.toUpperCase()}</Button>
                    </Center>
                </InputGroup>
            </Box>
        </Center>
    );
};