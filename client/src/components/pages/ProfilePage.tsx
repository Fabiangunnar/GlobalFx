import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/pages/User.module.scss'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  Avatar,
  StackDivider,
  WrapItem,
  Flex,
  Button,
  Grid,
  Divider,
  ModalOverlay,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react'
import { HiUser } from 'react-icons/hi2'
import { BsCamera, BsThreeDots } from 'react-icons/bs'
import {
  EditEmailInfoModal,
  EditPasswordInfoModal,
  EditPhoneInfoModal,
  ProfileImageModal,
  ProfilePictureChangeModal
} from './Modal'
import { setCurrentPage, setNavLink } from '@/redux-actions/navSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux-store/store'
import { getUser, reset, resetUsersState } from '@/redux-actions/HomeAppSlice'

type Props = {}

const ProfilePage = (props: Props) => {
  const modal1 = useDisclosure()
  const modal2 = useDisclosure()
  const modal3 = useDisclosure()
  const modal4 = useDisclosure()
  const modal5 = useDisclosure()
  const [openDots, setOpenDots] = useState(false)
  const { userInfo, usersState, errorMessage } = useSelector(
    (state: RootState) => state.HomeAppSlice
  )
  const { toast } = createStandaloneToast()
  const dispatch = useDispatch()
  const dotsBoxRef: any = useRef()
  const img = 'https://bit.ly/dan-abramov'

  const handleClick = (link: string, id: object) => {
    dispatch(setNavLink(id))
    dispatch(setCurrentPage(link))
  }

  const handleClickOutside = (event: any) => {
    if (dotsBoxRef.current && !dotsBoxRef.current.contains(event.target)) {
      setOpenDots(false)
    }
  }

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(10deg)'
    />
  )

  const [overlay, setOverlay] = useState(<OverlayOne />)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    dispatch(getUser(userInfo?.id))
    dispatch(reset())
  }, [])

  return (
    <section className={`${styles.user_block}`}>
      <Card
        color={'#fff'}
        background={'#759c4950'}
        w='100%'
        overflow={'hidden'}
      >
        <CardHeader background={'#759c4970'} ref={dotsBoxRef}>
          <Flex
            justify={'space-between'}
            align={'center'}
            position={'relative'}
          >
            <Flex gap={2} className={`${styles.management_head}`}>
              <HiUser fontSize={20} /> <span>Profile</span>
            </Flex>
            <Box
              cursor={'pointer'}
              p={1}
              onClick={() => {
                setOpenDots(prev => !prev)
              }}
            >
              <BsThreeDots fontSize={20} />
            </Box>
            {openDots && (
              <Card
                position={'absolute'}
                overflow={'hidden'}
                background={'#759c4999'}
                color={'#fff'}
                top={'2.4rem'}
                right={0}
                zIndex={4}
              >
                <Box
                  p={'0.6rem 1.4rem'}
                  cursor={'pointer'}
                  fontSize={14}
                  onClick={() => {
                    setOverlay(<OverlayOne />)
                    modal3.onOpen()
                  }}
                  _hover={{
                    backgroundColor: '#55b598'
                  }}
                >
                  Update Phone No.
                </Box>
                <Box
                  p={'0.6rem 1.4rem'}
                  cursor={'pointer'}
                  fontSize={14}
                  onClick={() => {
                    setOverlay(<OverlayOne />)
                    modal5.onOpen()
                  }}
                  _hover={{
                    backgroundColor: '#55b598'
                  }}
                >
                  Change Password
                </Box>
              </Card>
            )}
          </Flex>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Grid gridTemplateColumns={'1fr 2fr'} gap={2}>
              <Flex
                direction={'column'}
                justify={'space-between'}
                align={'center'}
                gap={2}
              >
                <WrapItem
                  position={'relative'}
                  borderRadius={'50%'}
                  overflow={'hidden'}
                >
                  {userInfo?.picture ? (
                    <Avatar
                      onClick={() => {
                        setOverlay(<OverlayOne />)
                        modal1.onOpen()
                      }}
                      cursor={'pointer'}
                      size='2xl'
                      name='Kola Tioluwani'
                      src={userInfo.picture}
                    />
                  ) : (
                    <Avatar
                      onClick={() => {
                        setOverlay(<OverlayOne />)
                        modal1.onOpen()
                      }}
                      cursor={'pointer'}
                      size='2xl'
                      name='Kola Tioluwani'
                      src={'/images.png'}
                    />
                  )}
                  <Flex
                    justify={'center'}
                    width={'100%'}
                    p={1}
                    position={'absolute'}
                    bottom={0}
                    left={0}
                    _hover={{
                      background: '#64d2b1'
                    }}
                    cursor={'pointer'}
                    bg={'#55b59890'}
                    onClick={() => {
                      setOverlay(<OverlayOne />)
                      modal2.onOpen()
                    }}
                  >
                    <BsCamera fontSize={28} />
                  </Flex>
                </WrapItem>
                <Text fontSize='md' textAlign={'center'}>
                  {`${userInfo?.firstname} ${userInfo?.lastname}`}
                </Text>
              </Flex>
              <Stack spacing={3}>
                <Divider />
                <Flex gap={2} direction={'column'} align={'flex-start'}>
                  <Heading fontSize='md' color={''}>
                    Email:
                  </Heading>
                  <Text fontSize='xs'>{userInfo?.email}</Text>
                </Flex>
                <Divider />
                <Flex gap={2} direction={'column'} align={'flex-start'}>
                  <Heading fontSize='md' color={''}>
                    Phone:
                  </Heading>
                  <Text fontSize='xs'>{userInfo?.phoneNumber} </Text>
                </Flex>
                <Divider />
                <Flex gap={2} direction={'column'} align={'flex-start'}>
                  <Heading fontSize='md' color={''}>
                    Account Verification Status:
                  </Heading>
                  {userInfo?.accountState === 'PENDING' ? (
                    <Button fontSize={12} colorScheme='messenger'>
                      Pending
                    </Button>
                  ) : userInfo?.accountState === 'BLOCKED' ? (
                    <Button fontSize={12} colorScheme='red'>
                      Blocked
                    </Button>
                  ) : (
                    <Button fontSize={12} colorScheme='whatsapp'>
                      Verified
                    </Button>
                  )}
                </Flex>
                <Divider />
              </Stack>
            </Grid>
            <Box>
              <Heading
                size='xs'
                fontFamily={'inherit'}
                textTransform='uppercase'
              >
                Account Overview
              </Heading>
              <Text pt='2' fontSize='sm'>
                Check out the overview of your clients.
              </Text>
            </Box>
            <Flex gap={4} p={0} w='100%'>
              <Button
                onClick={() => handleClick('deposit-funds', { id: 'YHB84Z' })}
                fontSize={14}
                type='submit'
                w='100%'
                maxW={'20rem'}
                _hover={{
                  background: '#64d2b1'
                }}
                color={'#fff'}
                background='#55b598'
              >
                Deposit Funds
              </Button>

              <Button
                onClick={() => handleClick('withdrawals', { id: 'RST48H' })}
                fontSize={14}
                // disabled={userInfo?.accountState === 'BLOCKED' ? true: false }
                w='100%'
                maxW={'20rem'}
                _hover={{
                  background: '#64d2b1'
                }}
                color={'#fff'}
                background='#759c49'
              >
                Withdraw Funds
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
      <ProfileImageModal
        overlay={overlay}
        isOpen={modal1.isOpen}
        onClose={modal1.onClose}
        img={userInfo?.picture ? userInfo.picture : '/images.png'}
      />
      <ProfilePictureChangeModal
        overlay={overlay}
        isOpen={modal2.isOpen}
        onClose={modal2.onClose}
      />
      <EditPhoneInfoModal
        overlay={overlay}
        isOpen={modal3.isOpen}
        onClose={modal3.onClose}
      />

      <EditPasswordInfoModal
        overlay={overlay}
        isOpen={modal5.isOpen}
        onClose={modal5.onClose}
      />
    </section>
  )
}

export default ProfilePage
