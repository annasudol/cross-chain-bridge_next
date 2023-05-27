import {  useAddress,useContract,
  useContractRead} from "@thirdweb-dev/react";
// import { ChangeNetwork } from '@/ui/ChangeNetwork'
// import { NetworkTab } from '@/ui/NetworkTab'
// import { TokenInfo } from '@/ui/TokenInfo'
// import {
//   token_address,
// } from '@/utils/constants'
// import { Token } from '../../typechain-types'
import {BigNumber, utils} from 'ethers'
// import { useSetChain } from '@web3-onboard/react';
import { ChangeEvent, useEffect, useState } from 'react';
export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<number>();
  const [balance, setBalance] = useState<number>();
const address = useAddress();


  // const [{ connectedChain }] = useSetChain();
  // const [tokenBalance, setTokenBalance] = useState(0)
  const { contract, isLoading, error } = useContract('0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61');
  const { data} = useContractRead(contract, "balanceOf", address);

  // const toast = useToast()
  // const { address } = useAccount()
  // const { chain } = useNetwork()

  // function handleBridgeSendSearchChain(): void {}
  function handleMaxOut(): void {
    // setSendAmount(tokenBalance)
  }
  function handleSend(e: ChangeEvent<HTMLInputElement>): void {
    //   const value = e.target.value.replace(/\+|-/gi, '')
    //   const value_num = Number(value)
    //   value_num > 0 && value_num <= tokenBalance && setSendAmount(value_num)
  }
  useEffect(() => {
    const balance = data?._hex && BigNumber.from(data?._hex);
    balance && setBalance(Number(utils.formatEther(balance)) || 0)
//     async function fetchContractGreeting() {
//       if (connectedChain) {
//         const contract = new ethers.Contract(
//           token_address(5) as string,
//           TokenContract,
//         )

//         console.log(contract, "contract")
// // eslint-disable-next-line no-console
        
//         try {
//           const balanceBN = await contract.balanceOf()
//                  console.log(balanceBN, "balanceBN?.id")

//           // const balance = ethers.utils.formatUnits(balanceBN)
//           // setTokenBalance(Number(balance))
//         } catch (err) {
//           // eslint-disable-next-line no-console
//           console.log('Error: ', err)
//         }
//       }
//     }
//     fetchContractGreeting()
  }, [data])
  // const { config } = usePrepareContractWrite({
  //   address: BRIDGE_ETH_ADDRESS,
  //   abi: BridgeContract.abi,
  //   functionName: 'swap',
  //   args: [
  //     '0x80dD5aD6B8775c4E31C999cA278Ef4D035717872',
  //     1,
  //     0,
  //     chain?.id,
  //     chain?.id === 5 ? 'gETH' : 'mETH',
  //   ],
  //   enabled: Boolean(chain?.id && provider),
  // })

  return (
    <div className='flex flex-col justify-center p-6'>
      <div className=' pt-4'>
        Balance: {balance}
        {/* <ChangeNetwork /> */}
        <div className='flex flex-row p-2'>
          <input
            placeholder=''
            className='w-[100%] rounded-md bg-gray-600 bg-opacity-20 px-4 py-3 text-base text-white outline-none'
            type='number'
            pattern='^-?[0-9]\d*\.?\d*$'
            value={sendAmount}
            // max={tokenBalance}
            onChange={(e) => handleSend(e)}
          />
          <div className='absolute right-[12%] mt-2'>
            {/* {connectedChain?.id && (
              <TokenInfo chainId={connectedChain?.id as unknown as number} />
            )} */}
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between pl-4 pr-12'>
        {/* <NetworkTab /> */}
        <div className='text-base text-gray-200'>
          <button onClick={handleMaxOut}>
            <p className='underline underline-offset-1'>
              {/* Max: {tokenBalance.toFixed(2)} */}
            </p>
          </button>
        </div>
      </div>
      <button className='mt-2 w-60 items-center justify-items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none'>
        Send
      </button>
    </div>
  );
};
// function fetchContractGreeting(): import("react").DependencyList | undefined {
//   throw new Error("Function not implemented.");
// }

