import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FC, useState } from "react";
import { MINT_GEM_ABI, MINT_GEM_ADDRESS } from "../caverConfig";
import { useAccount, useCaver } from "../hooks";
import axios from "axios";
import { Image } from "@chakra-ui/image";

import { IGem } from "../interfaces";

interface MintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintingModal: FC<MintingModalProps> = ({ isOpen, onClose }) => {
  const [metadata, setMetadata] = useState<IGem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account } = useAccount();
  const { mintGemContract, caver } = useCaver();

  const onClickMint = async () => {
    try {
      if (!account || !mintGemContract || !caver) return;

      setIsLoading(true);

      // payable 함수 실행법 (최신)
      const mintGemResponse = await caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: account,
        to: MINT_GEM_ADDRESS,
        value: caver.utils.convertToPeb(1, "KLAY"),
        gas: 3000000,
        data: mintGemContract.methods.mintGem().encodeABI(),
      });

      if (mintGemResponse.status) {
        const getTokenResponse = await mintGemContract.methods
          .getLatestMintedGem(account)
          .call();

        // 외부에 알려지지 말아야 할 텍스트는 .env 에 보관하기!
        const metadataResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_METADATA_URI}/${getTokenResponse[0]}/${getTokenResponse[1]}.json`
        );

        setMetadata(metadataResponse.data); // axios 는 .data에 데이터가 들어있음을 유의!
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>민팅하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {metadata ? (
            <Flex justifyContent="center">
              <Box w={200}>
                <Image
                  src={metadata.image}
                  fallbackSrc="loading.png"
                  alt="h662-GEMz"
                />
                <Text>{metadata.name}</Text>
                <Text>{metadata.description}</Text>
              </Box>
            </Flex>
          ) : (
            <>
              <Text>민팅을 진행하시겠습니까?</Text>
              <Text>(1 Klay 소모예정)</Text>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClickMint}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Mint
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintingModal;
