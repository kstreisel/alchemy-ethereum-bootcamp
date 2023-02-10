import React from 'react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import { EditIcon, RepeatIcon } from '@chakra-ui/icons';
import { 
  ChakraProvider,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, 
  Select,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import deploy from './deploy';
import accept from './accept';
import redline from './redline';
import Terms from '../../artifacts/contracts/Terms.sol/Terms';

const provider = new ethers.providers.Web3Provider(window.ethereum);


function App() {
  const [addr, setAddr] = useState('');
  const [order, setOrder] = useState('');
  const [expiration, setExpiration] = useState('');
  const [executed, setExecuted] = useState('');
  const [isRedlined, setIsRedlined] = useState('');
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [queried, setQueried] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [aContract, setContract] = useState('');
  const [hasRedlined, setRedlined] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nine, setNine ] = useState(95);
  const [ten, setTen] = useState('California');
  const [rOne, setROne] = useState(false);
  const [rTwo, setRTwo] = useState(false);
  const [hasSubmit, setSubmit] = useState(false);
  const [showNine, setShow] = useState(0);
  const toast = useToast();


  useEffect(() => {
    async function getAccounts() {
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setSigner(provider.getSigner());
      }
      getAccounts();
    }, [account]);
  
  async function createOffer(){
    console.log(addr, order, expiration);
    const newOffer = await deploy(signer, addr, order, expiration);
    console.log(`deployed to address: ${newOffer.address}`);
    const receipt = await newOffer.deployTransaction.wait(); 
    console.log(receipt); 
    setAddr('');
    setOrder('');
    setExpiration('');
  }
  
  async function getOffer(contractAddr){
    const iContract = await new ethers.Contract(contractAddr, Terms.abi, signer);
    const iOrder = await iContract.getOrder();
    const iExp = await iContract.getExp();
    const iExecuted = await iContract.getExecuted();
    const iRedlined = await iContract.getRedlined();
    setOrder(iOrder);
    setExpiration(iExp);
    setExecuted(iExecuted);
    setRedlined(iRedlined);
  }
  async function myOffer(){
    const iContract = await new ethers.Contract(aContract, Terms.abi, signer);
    const iOrder = await iContract.getOrder();
    const iExp = await iContract.getExp();
    setOrder(iOrder);
    setExpiration(iExp);
    setQueried(true);
  }
  function handleNine() {
    console.log(nine);
    onClose(true);
    console.log(nine);
    setRedlined(true);
    console.log(nine);
  }
  async function acceptOffer(){
    const acceptedOffer = await accept(aContract);
  }
  async function submitRedlines(){
    const submittedRedlines = await redline(aContract, nine, ten);
    const iContract = await new ethers.Contract(aContract, Terms.abi, signer);
    const iNine = await iContract.getNine();
    if(iNine != 95){
      setShow(iNine);
    setSubmit(true)
  }
  }
  async function getRedlines(aContract){
    const iContract = await new ethers.Contract(aContract, Terms.abi, signer);
    const iNine = await iContract.getNine();
    const iTen = await iContract.getTen();
    if(iNine != 95){
      setROne(true);
      setNine(iNine);
    }
    if(iTen != 'California'){
      setRTen(true);
      setTen(iTen);
    }
    setClicked(true);
  }
  
  return (
    <ChakraProvider resetCSS>
      <Flex justifyContent="center" alignItems="center" w="100vw">
        <Tabs size="md" variant="solid-rounded">
          <Flex justifyContent="center" alignItems="center">
            <TabList backgroundColor="whiteAlpha.900" pl={4} pr={4} pt={2} pb={2}>
              <Tab>Vendor Sales Portal</Tab>
              <Tab> Customer Portal </Tab>
              <Tab>Vendor Legal Portal</Tab>
            </TabList>
          </Flex>
          <Flex
              justifyContent="center"
              backgroundColor="gray.200"
              flexDirection="column"
              alignItems="center"
              w="100vw"    
            ></Flex>
          <TabPanels 
            backgroundColor="gray.200" 
            height="100vw"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            w="100vw"
          >
            <TabPanel>
              
              <Flex 
                backgroundColor="whiteAlpha.900"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mr={0}
                ml={150}
                p={5}
                maxWidth={600}
                minWidth={600}

              >
                  <Heading size="md" textAlign="center" pb={2} mt={2}>
                      Create a New Offer
                  </Heading>
                  <Stack spacing={2}>
                      <FormControl display="flex">
                          <FormLabel>Address</FormLabel>
                          <Input value={addr} onChange={e => setAddr(e.target.value)}/>
                      </FormControl>
                      <FormControl display="flex">
                          <FormLabel>Subscription</FormLabel>
                          <Select placeholder='Select option' value={order} onChange={e => setOrder(e.target.value)}>
                              <option value='100 units for $80,000'>100 units for $80,000</option>
                              <option value='150 units for $125,000'>150 units for $125,000</option>
                              <option value='200 units for $200,000'>200 units for $200,000</option>
                          </Select>
                      </FormControl>
                      <FormControl display="flex">
                          <FormLabel>Order Expiration</FormLabel>
                          <Select placeholder='Select option' value={expiration} onChange={e => setExpiration(e.target.value)}>
                              <option value='5'>5 days</option>
                              <option value='10'>10 days</option>
                              <option value='20'>20 days</option>
                              <option value='30'>30 days</option>
                          </Select>
                      </FormControl>
                    </Stack>
                    <Button variant="solid" size="md" m={4} backgroundColor="teal.400" 
                        onClick={(e) => {e.preventDefault(); createOffer();}} >
                        Create Offer!
                    </Button>
              </Flex>
             
            </TabPanel>
            <TabPanel>
                <Flex backgroundColor="whiteAlpha.900" p={3} minWidth={600} mb={5} ml={10} mr={10}>
                    <Stack spacing={2} pl={3} pr={3} pt={1}>
                        <FormLabel>Contract</FormLabel>
                        <FormErrorMessage>Error message</FormErrorMessage>
                    </Stack>
                    <Input value={aContract} onChange={e => setContract(e.target.value)} />
                    <Flex>
                        <Button variant="solid" size="md" ml={7} backgroundColor="teal.400"
                          onClick={(e) => {e.preventDefault(); myOffer();}}>
                            Get Your Offer!
                        </Button>
                    </Flex>
                </Flex>
                <Flex
                    justifyContent="center"
                    backgroundColor="gray.200"
                    p={1}
                    flexDirection="column"
                    alignItems="center"
                    w="100vw"
                >
                  {queried ? (
                    <>
                      <Flex
                          backgroundColor="whiteAlpha.900"
                          flexDirection="column"
                          justifyContent="flex-start"
                          alignItems="center"
                          mr={10}
                          ml={10}
                          p={2}
                          maxWidth={600}
                          minWidth={400}
                      >
                        <Heading size="md" textAlign="left" pb={2} mt={2}>
                          Order
                        </Heading>
                        <Stack spacing={2}>
                            <Flex flexDirection="row" textAlign="left" pl={2} pr={2} pb={3}>
                                <Text fontWeight="bold" pr={2}>Subscription Terms: </Text>
                                <Text>{order}</Text>
                            </Flex>
                          </Stack>
                      </Flex>
                      <Flex
                          backgroundColor="whiteAlpha.900"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems="center"
                          mr={2}
                          ml={2}
                          mt={5}
                      >
                          <Heading size="md" textAlign="left" pb={2} mt={5}>
                            Terms of Service
                          </Heading>
                          <Flex flexDirection="column" textAlign="left" fontSize="sm" pl={5} pr={5} pb={3} pt={3}>
                            <Text >These Terms of Service ("Terms") between SaaSy.io and the Customer referenced in the Order ("you" or "your") govern your subscription to the Services and SaaSy.io's provision of the Services to you.</Text>
                            <Flex >
                                <Box pl={2} pt={2} fontSize="sm">
                                    <Text>1.  PROVISION AND USE.   SaaSy.io will make the Services available to Customer, and Customer is authorized to access and use the Services according to the Documentation and these Terms, during the Subscription Term.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2} fontSize="sm">
                                    <Text >2. CUSTOMER DATA.   Customer is responsible for all data transmitted to or through the Services by or on behalf Customer ("Customer Data") and grants SaaSy.io a non-exclusive, worldwide, royalty-free license to use Customer Data to provide and improve the Services.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2}>
                                    <Text >3. INTELLECTUAL PROPERTY.   The Services (including, for example, its algorithms, calculations, organization, look and feel, and the underlying software code) is and will remain the sole property of SaaSy.io, and SaaSy.io is and will remain the sole owner of all intellectual property embodied or practiced by the Services. Each party reserves all intellectual property rights not expressly granted in these Terms.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2}>
                                    <Text >4. WARRANTY.   The Services will perform according to the Documentation” for the Subscription Term. SaaSy.io will have 30 days to correct a failure of this warranty after receiving notice, and if it cannot do so, Customer may terminate the  Subscription immediately and receive a prorated refund for its unused subscription. The Services are otherwise provided "as is," and SaaSy.io disclaims all other warranties, express or implied.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2}>
                                    <Text >5. CONFIDENTIAL INFORMATION.   “Confidential Information” is all information, regardless of the medium through which it is conveyed, that is marked as “Confidential” by the disclosing party or that would reasonably be deemed likely to be confidential. Customer`s Confidential Information includes all Customer Data, and SaaSy.io`s Confidential Information includes the non-public features and functionality of the Services. Confidential Information excludes all information that: (i) is or becomes publicly known, other than through a breach of a confidentiality obligation owed to the disclosing party; or (ii) was known to the receiving party before disclosure, other than through a breach of a confidentiality obligation owed to the disclosing party. The receiving party will use the Confidential Information of the disclosing party only as necessary to perform its obligations and exercise its rights under this Agreement and will use reasonable care to protect such Confidential Information. At the termination of this Agreement, or upon the disclosing party`s request, the receiving party will destroy the disclosing party`s Confidential Information that is then in its possession.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2}>
                                    <Text >6.   INDEMNIFICATION.   To “Indemnify” is defined as to (i) defend against all third party claims and regulatory actions and (ii) to pay all amounts under all theories of liability and damages awarded to such third party or accepted in settlement or imposed as fines of any kind. SaaSy.io will Indemnify Customer for the infringement of a patent or copyright, provided that the infringement arises through Customer`s use of the Services according to the Documentation, either alone or (when SaaSy.io would be liable for indirect or contributory infringement) in combination with other Customer technology or processes. Each party will Indemnify the other for their use or transfer of personally identifiable information or Customer Data in a manner inconsistent with this Agreement. Each party will Indemnify the other for their use or transfer of personally identifiable information or Customer Data in a manner inconsistent with these Terms.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2}>
                                    <Text >7. LIMITATION OF LIABILITY.   With the exception of violations involving Confidential Information and amounts owed under a party`s obligation to Indemnify, neither party`s total liability to the other will exceed the Annual Subscription Cost.</Text>
                                </Box>
                                <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                            </Flex>
                            <Flex >
                                <Box pl={2} pt={2}>
                                    <Text >8. LIMITATION OF DAMAGES.   Each party will be liable to the other for direct damages only. As such, the following types of damages will be excluded, regardless of the underlying theory of recovery: indirect damages, consequential damages, special damages, punitive damages, lost profits, lost reputation, and the cost of replacement services.</Text>
                                </Box>
                            </Flex>
                            <Flex>
                                <Box pl={2} pt={2}>
                                    <Text>9.  UPTIME.   The Services will be available to Customer 95% of each month. If SaaSy.io fails to meet this uptime commitment for three consecutive months or any four months within the Subscription Term, Customer may terminate the Order and receive a prorated refund.</Text>
                                </Box>
                                <>
                                  <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                    onClick={onOpen}
                                  />
                                  <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay/>
                                    <ModalContent>
                                      <ModalHeader>Redline Request</ModalHeader>
                                      <ModalCloseButton />
                                      <ModalBody pb={6}>
                                        <FormControl>
                                          <Text textAlign="center">The Services will be available to Customer</Text>
                                          <NumberInput defaultValue={95}  precision={2} step={0.5} min={95} max={100} >
                                            <NumberInputField />
                                            <NumberInputStepper value={nine} onChange={(e) => setNine(e.target.value)}>
                                              <NumberIncrementStepper />
                                              <NumberDecrementStepper />
                                            </NumberInputStepper>
                                          </NumberInput>
                                          <Text textAlign="center">of each month.</Text>
                                        </FormControl>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button colorScheme='teal' mr={3}
                                          onClick={(e) => {e.preventDefault(); handleNine();}}>
                                          Save
                                        </Button>

                                      </ModalFooter>
                                    </ModalContent>
                                  </Modal>
                                </>
                              </Flex>
                            <Flex>
                                <Box pl={2} pt={2}>
                                    <Text>10. MISCELLANEOUS.   No amendment or waiver under these Terms will be effective unless it is in writing and signed by both parties. A waiver granted on one occasion will not operate as a waiver on other occasions. United States federal laws and the state laws of California govern these Terms. If a provision of these Terms is deemed unenforceable, it will be modified to capture the parties original intent or, if the provision cannot be saved, it will be removed from these Terms. These Terms are the entire agreement of the parties with respect to its subject matter and supersedes all other written or oral agreements.</Text>
                                </Box>
                                <>
                                  <IconButton
                                    mt={2}
                                    aria-label="Redline"
                                    icon={<EditIcon />}
                                    variant="ghost"
                                  />
                                </>
                            </Flex>
                            </Flex>
                          </Flex>
                      <Flex
                        backgroundColor="whiteAlpha.900"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        mr={10}
                        ml={10}
                        mt={5}
                        p={5}
                        maxWidth={600}
                        minWidth={600}
                      >
                          {hasRedlined ? (
                            <>
                              <Text fontWeight="bold" pr={2} pb={2}>Submit Redlines as Counteroffer </Text>
                              <p>When you click "Submit Offer," your wallet will prompt you to confirm the transaction. Your digital signature will make the Order and your redlined version Terms of Service into an offer to SaaSy.io. If SaaSy.io accepts your offer before the expiration date, the Order and new Terms of Service will become a legally binding agreement between Customer and SaaSy.io.</p>
                              <Button onClick={submitRedlines} mt={4} colorScheme='teal'>Submit Offer</Button>
                            </>
                          ) : (
                            <>
                              <Text fontWeight="bold" pr={2} pb={2}>Accept and Sign the Order and Terms of Service </Text>
                              <p>When you click "Accept and Sign!," your wallet to prompt you to confirm the transaction. Your digital signature will make the Terms of Service and Order into a legally binding agreement between Customer and SaaSy.io.</p>
                              <Button onClick={acceptOffer} mt={4} colorScheme='teal'>Accept and Sign!</Button>
                            </>
                          )}
                      </Flex>
                    </>
                  ) : (
                    <><Text> Enter contract address to get your offer</Text></>
                      
                  )}
                </Flex>
            </TabPanel>
            <TabPanel> 
                <Flex backgroundColor="whiteAlpha.900" p={3} minWidth={600} mb={5} ml={20} mr={20}>
                    <Stack spacing={2} pl={3} pr={3} pt={1}>
                        <FormLabel>Contract</FormLabel>
                        <FormErrorMessage>Error message</FormErrorMessage>
                    </Stack>
                    <Input value={aContract} onChange={e => setContract(e.target.value)} />
                    <Flex>
                        <Button variant="solid" size="md" ml={7} backgroundColor="teal.400"
                          onClick={(e) => {e.preventDefault(); getRedlines(aContract);}}>
                            Get Redlines
                        </Button>
                    </Flex>
                </Flex>
                <Flex
                  justifyContent="center"
                  backgroundColor="gray.200"
                  p={1}
                  flexDirection="column"
                  alignItems="center"
                  w="100vw"
                >
                  {clicked ? ( 
                    <>
                      <Flex
                        backgroundColor="whiteAlpha.900"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        pr={10}
                        pl={10}
                        p={2}
                        ml={10}
                        mr={10}
                        
                        minWidth={600}
                      >
                        <Heading size="md" textAlign="left" pb={2} mt={2}>
                          Redlines to Review
                        </Heading>
                      
                      {setROne ? (
                        <>
                          <Flex backgroundColor="whiteAlpha.900" p={3} minWidth={600} mb={0} ml={10} mr={10} flexDirection="column">
                            <Text fontWeight="bold">
                              9: Uptime
                            </Text>
                            <Text>
                              The Services will be available to Customer 
                              <Box as='span' color="red.500" ml={1} mr={1}>
                                {nine}
                              </Box>
                               of each month. If SaaSy.io fails to meet this uptime commitment for three consecutive months or any four months within the Subscription Term, Customer may terminate the Order and receive a prorated refund.
                            </Text>
                            
                          </Flex>
                          <Flex><Button onClick={acceptOffer} mt={4} colorScheme='teal' >Accept Redlines </Button></Flex>
                        </>
                      ) : (
                        <>
                        </>
                      )}
                      </Flex>
                    </>
                  ) : (
                    <></>
                  )}
                </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ChakraProvider>
  )
}

export default App;
