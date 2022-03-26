import { useEffect, useState } from "react";

export const useAccount = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      const response = await window.klaytn.enable();
      //   console.log(response);   // response: 주소 하나만 들어있음!
      setAccount(response[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.klaytn) {
      getAccount();
    }
  }, []);

  return { account };
};
