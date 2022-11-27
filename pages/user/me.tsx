import Router from "next/router";
import { useState } from "react";
import { Avatar, Badge, Box, Button, Center, Container, FormControl, FormLabel, Icon, Input, InputGroup, Table, Td, Tr, useToast } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { DefaultProps } from "../../utils/types";
import { FaCheck, FaClock, FaCog, FaHeart, FaInfo, FaMailBulk } from "react-icons/fa";
import { changeUserPassword } from "../../utils/methods/user";
import { timeout } from "../../utils/api";

export default function Me({ user }: DefaultProps): JSX.Element {
    if(!user) Router.push("/user/login");

    const [passwordInputData, setPasswordInputData] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordAgain: ""
    });
    const toast = useToast({ position: "bottom-right", isClosable: true });

    return (
        <Layout title="Your account" user={user}>
            <Container>
                <Box bg="blue.900" borderRadius={10} p={30}>
                    <Badge bgColor="blue.500" as={Center} display="flex" color="blue.100"><Icon as={FaInfo} /> Informations</Badge>
                    <Table>
                        <Tr>
                            <Td><Icon as={Avatar} /> Username</Td>
                            <Td><Badge>{user?.name}</Badge></Td>
                        </Tr>
                        <Tr>
                            <Td><Icon as={FaMailBulk} /> E-Mail</Td>
                            <Td><Badge>{user?.eMail}</Badge></Td>
                        </Tr>
                        <Tr>
                            <Td><Icon as={FaClock} /> Join Date</Td>
                            <Td><Badge>dd/mm/yyyy</Badge></Td>
                        </Tr>
                        <Tr>
                            <Td><Icon as={FaHeart} /> Liked movies</Td>
                            <Td><Badge>0</Badge></Td>
                        </Tr>
                    </Table>
                </Box>
                <Box bg="blue.900" borderRadius={10} mt={2} p={30}>
                    <Badge bgColor="blue.500" as={Center} display="flex"><Icon as={FaCog} /> Settings</Badge>
                    <InputGroup as="form" display="block" onSubmit={(e) => e.preventDefault()}>
                        <FormControl>
                            <FormLabel>Current password</FormLabel>
                            <Input type="password" placeholder="Enter your current password" onChange={(e) => setPasswordInputData({ ...passwordInputData, oldPassword: e.target.value })} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>New password</FormLabel>
                            <Input type="password" placeholder="Enter your new password" onChange={(e) => setPasswordInputData({ ...passwordInputData, newPassword: e.target.value })} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Repeat new password</FormLabel>
                            <Input type="password" placeholder="Enter your new password again" onChange={(e) => setPasswordInputData({ ...passwordInputData, newPasswordAgain: e.target.value  })} required />
                        </FormControl>
                        <Button colorScheme="green" mt={2} type="submit" onClick={() => {
                            const toastId = toast({ title: "Changing your password...", status: "loading" });
                            changeUserPassword((window.localStorage.getItem("token") as string), passwordInputData).then(async(result) => {
                                await timeout(1000);
                                if(result.error) return toast.update(toastId, { title: result.message, status: "error" });
                                toast.update(toastId, { title: "Password changed.", status: "success" });
                                window.localStorage.setItem("token", result.newToken as string);
                            });
                        }}><Icon as={FaCheck} /> Apply changes</Button>
                    </InputGroup>
                </Box>
            </Container>
        </Layout>
    );
};