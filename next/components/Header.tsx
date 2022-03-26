import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";
import { FC } from "react";
import { useAccount } from "../hooks";

const Header: FC = () => {
  const { account } = useAccount();
  return (
    <Flex w="Full" p={4} justifyContent="space-between" bg="red.100">
      <Box>JackAnt</Box>
      <Box>
        <Link href="/">
          <Button size="sm" variant="ghost">
            Minting
          </Button>
        </Link>
        <Link href="my-gemz">
          <Button size="sm" variant="ghost" ml={2}>
            My-Gemz
          </Button>
        </Link>
      </Box>
      <Box>
        <Text size="sm">
          {account
            ? `${account.substring(0, 4)}...${account.substring(
                account.length - 4,
                account.length
              )}님 환영합니다`
            : "카이카스 지갑을 설치해주세요."}
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
