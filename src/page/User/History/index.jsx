import {
  Box,
  Card,
  Field,
  Heading,
  Stack,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetMailsData } from './hooks/useGetMailsData';
import useVoiceNotification from './hooks/useVoiceNotification';
import { Explanation } from './components/Explanation';
import { MailsTable } from './components/MailsTable';

export default function History() {
  const { setIsOnlyShowMyMail } = useGetMailsData();
  const [voiceNotifyEnable, setVoiceNotifyEnable] = useState(false);
  const { filteredMails, newMail } = useGetMailsData();

  // 初始化localStorage設定

  useEffect(() => {
    var storedSettings = JSON.parse(localStorage.getItem('voiceNotifyEnable'));
    setVoiceNotifyEnable(storedSettings);
  }, []);

  useVoiceNotification(newMail, voiceNotifyEnable);

  const handleVoiceNotifyEnable = (e) => {
    let isChecked = e.target.checked;
    setVoiceNotifyEnable(isChecked);
    localStorage.setItem('voiceNotifyEnable', isChecked.toString());

    if (!isChecked) window.speechSynthesis.cancel();
  };

  return (
    <>
      <Box animation="fade-in 0.5s">
        <Stack direction={['column', 'column', 'row']} w="100%" gap="4">
          <Card.Root size="sm" textAlign="center" w="50%">
            <Card.Header>
              <Heading size="2xl">說明</Heading>
            </Card.Header>
            <Card.Body>
              <Explanation />
            </Card.Body>
          </Card.Root>
          <Card.Root w="50%" size="sm">
            <Card.Header>
              <Heading size="2xl" textAlign="center">
                設定
              </Heading>
            </Card.Header>
            <Card.Body>
              <VStack
                css={{
                  '--field-label-width': '96px',
                }}
              >
                <Field.Root orientation="horizontal">
                  <Field.Label>開啟語音</Field.Label>
                  <Switch.Root
                    id="voiceNotifyEnable"
                    isChecked={voiceNotifyEnable}
                    onChange={handleVoiceNotifyEnable}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>顯示本人郵件</Field.Label>
                  <Switch.Root
                    id="myMails"
                    onChange={(e) => {
                      setIsOnlyShowMyMail(e.target.checked);
                    }}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </Field.Root>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Stack>
        <MailsTable mails={filteredMails} />
      </Box>
    </>
  );
}
