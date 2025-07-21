import { useState, useEffect, useCallback } from 'react';
import { useGetMailsData } from '../../hooks/useGetMailsData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PropTypes from 'prop-types';
import VoiceContext from './VoiceContext';

export function VoiceProvider({ children }) {
  const { newMail } = useGetMailsData();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechQueue, setSpeechQueue] = useState([]);
  const [voiceNotifyEnable, setVoiceNotifyEnable] = useLocalStorage(
    'voiceNotifyEnable',
    true
  );

  useEffect(() => {
    if (!voiceNotifyEnable || !newMail) return;

    const { receiver, title, urgency } = newMail;
    const message = `有一封新郵件已送達，標題 ${title}，收件人 ${receiver}，緊急度 ${urgency}`;

    // 加入佇列
    setSpeechQueue((prevQueue) => [...prevQueue, message]);
  }, [newMail, voiceNotifyEnable]);

  useEffect(() => {
    if (speechQueue.length === 0) return;

    // 先取消當前語音，避免被打斷
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(speechQueue[0]);
    utterance.lang = 'zh-TW';
    utterance.rate = 1; // 語速 (1 為正常, 可設 0.5 ~ 2)
    utterance.pitch = 1; // 音調 (1 為正常, 可設 0 ~ 2)

    // 語音開始
    utterance.onstart = () => setIsSpeaking(true);

    // 播放完畢後移除佇列第一項
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeechQueue((prevQueue) => prevQueue.slice(1));
    };

    // 開始播放
    window.speechSynthesis.speak(utterance);
  }, [speechQueue]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const value = {
    isSpeaking,
    voiceNotifyEnable,
    setVoiceNotifyEnable,
    stop,
  };

  return (
    <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
  );
}

VoiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
