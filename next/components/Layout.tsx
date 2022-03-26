import { Flex } from "@chakra-ui/layout";
import { FC } from "react";
import Header from "./Header";

const Layout: FC = ({ children }) => {
  // children: 페이지 내용
  return (
    <Flex h="100vh" direction="column">
      <Header />
      {children}
    </Flex>
  );
};

export default Layout;
