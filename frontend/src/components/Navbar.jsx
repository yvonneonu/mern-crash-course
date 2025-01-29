import { useState } from "react";
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

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, login } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls modal state

  // State for login inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      onClose(); // Close modal after successful login
    }
  };

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
          <Link to={"/"}>Product Store 🛒</Link>
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

          <Button colorScheme="blue" onClick={onOpen}>
            Login
          </Button>
        </HStack>
      </Flex>

      {/* Login Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
export default Navbar;
