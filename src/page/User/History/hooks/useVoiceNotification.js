import { useState, useEffect } from 'react';

export default function useVoiceNotification(newMail, isVoiceEnabled) {
  const [speechQueue, setSpeechQueue] = useState([]);

  useEffect(() => {
    if (!isVoiceEnabled || !newMail) return;

    const { receiver, title, urgency } = newMail;
    const message = `有一封新郵件已送達，標題 ${title}，收件人 ${receiver}，緊急度 ${urgency}`;

    // 加入佇列
    setSpeechQueue((prevQueue) => [...prevQueue, message]);
  }, [newMail, isVoiceEnabled]);

  useEffect(() => {
    if (speechQueue.length === 0) return;

    // 先取消當前語音，避免被打斷
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(speechQueue[0]);
    utterance.lang = 'zh-TW';
    utterance.rate = 1; // 語速 (1 為正常, 可設 0.5 ~ 2)
    utterance.pitch = 1; // 音調 (1 為正常, 可設 0 ~ 2)

    // 播放完畢後移除佇列第一項
    utterance.onend = () => {
      setSpeechQueue((prevQueue) => prevQueue.slice(1));
    };

    // 開始播放
    window.speechSynthesis.speak(utterance);
  }, [speechQueue]);
}
