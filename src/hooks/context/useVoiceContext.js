import { useContext } from 'react';
import VoiceContext from '../../components/context/VoiceContext';

export function useVoiceContext() {
  const context = useContext(VoiceContext);

  if (!context) {
    throw new Error('useVoiceContext must be used within a VoiceProvider');
  }

  return context;
}
