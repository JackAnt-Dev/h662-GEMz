import { Box } from "@chakra-ui/layout";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccount, useCaver } from "../hooks";

const Home: NextPage = () => {
  // const { account } = useAccount();
  const { caver, mintGemContract } = useCaver();
  useEffect(() => {
    console.log(caver);
  }, [caver]);
  useEffect(() => {
    console.log(mintGemContract);
  }, [mintGemContract]);
  return <Box>good</Box>;
};

export default Home;
