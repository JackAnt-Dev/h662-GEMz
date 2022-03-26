import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { useEffect } from "react";
import MintingModal from "../components/MintingModal";
import { useAccount, useCaver } from "../hooks";

const Home: NextPage = () => {
  // const { account } = useAccount();
  // const { caver, mintGemContract } = useCaver();
  // useEffect(() => {
  //   console.log(caver);
  // }, [caver]);
  // useEffect(() => {
  //   console.log(mintGemContract);
  // }, [mintGemContract]);
  const { isOpen, onClose, onOpen } = useDisclosure(); // 창이 열렸는지 확인해주는 모듈
  return (
    <>
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Button colorScheme="purple" onClick={onOpen}>
          민팅하기
        </Button>
      </Flex>
      <MintingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;
