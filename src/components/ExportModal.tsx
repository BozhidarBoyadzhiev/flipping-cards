import { useState } from 'react';
import { ModalWrapper, Button } from './';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ 
  isOpen, 
  onClose
}: SettingsModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="⚙️ Settings">
      <div className="space-y-6">
        
      </div>
    </ModalWrapper>
  );
}