//components/Navbar.js
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuthStore } from "../store/authStore";
import { FaGoogle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    user,
    login,
    register,
    checkAuth,
    logout,
    googleLogin,
    faceBookLogin,
  } = useAuthStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  // State for login and register inputs expo router, typescript, instagram
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(loginEmail, loginPassword);
    if (success?.success) {
      onLoginClose();
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  const handleRegister = async () => {
    const success = await register({
      name: name,
      email: registerEmail,
      password: registerPassword,
    });
    if (success?.success) {
      onRegisterClose();
      setName("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (token) {
      // Decode the JWT token and get the user data
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      // Store the user info (you can customize this depending on your needs)
      localStorage.setItem("user", JSON.stringify(decodedToken));
      checkAuth();
    } else {
      checkAuth();
    }
  }, [checkAuth, token]);

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>YV Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          {user?.checkAuth && (
            <Link to={"/create"}>
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
          )}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>

          {!user?.checkAuth ? (
            <>
              <Button colorScheme="blue" onClick={onLoginOpen}>
                Login
              </Button>
              <Button colorScheme="green" onClick={onRegisterOpen}>
                Register
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={handleLogout}>
              Logout
            </Button>
          )}

          <Button colorScheme="pink" onClick={faceBookLogin}>
            Login with Facebook
          </Button>
        </HStack>
      </Flex>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={onLoginClose} isCentered>
        <ModalOverlay />
        <ModalContent className="w-full bg-black">
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button colorScheme="blue" onClick={googleLogin}>
              <FaGoogle />
            </Button>

            <Button colorScheme="blue" onClick={handleLogin} className="ml-5">
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={isRegisterOpen} onClose={onRegisterClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleRegister}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
export default Navbar;
