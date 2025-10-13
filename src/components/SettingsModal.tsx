import { useState } from 'react';
import { ModalWrapper, Button } from './';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    defaultCardSide: 'front' | 'back';
    rightClickEditEnabled: boolean;
  };
  onSettingsChange: (settings: { 
    defaultCardSide: 'front' | 'back';
    rightClickEditEnabled: boolean;
  }) => void;
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  settings, 
  onSettingsChange 
}: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleCancel = () => {
    setLocalSettings(settings); // Reset to original
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleCancel} title="⚙️ Settings">
      <div className="space-y-6">
        
        {/* Default Card Side Section */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🎴</span>
            Default Card Side
          </h3>
          
          <div className="space-y-3">
            <label className="text-gray-300 text-sm block">
              Show this side first when viewing cards:
            </label>
            
            <div className="flex gap-3">
              <button
                onClick={() => setLocalSettings({ ...localSettings, defaultCardSide: 'front' })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                  localSettings.defaultCardSide === 'front'
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                    : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">Front Side</div>
                <div className="text-xs mt-1 opacity-75">Question first</div>
              </button>
              
              <button
                onClick={() => setLocalSettings({ ...localSettings, defaultCardSide: 'back' })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                  localSettings.defaultCardSide === 'back'
                    ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                    : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">Back Side</div>
                <div className="text-xs mt-1 opacity-75">Answer first</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right-Click Editing Section */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span className="text-xl">🖱️</span>
            Right-Click Editing
          </h3>
          
          <div className="space-y-3">
            <label className="text-gray-300 text-sm block">
              Enable right-click to edit cards:
            </label>
            
            <div className="flex gap-3">
              <button
                onClick={() => setLocalSettings({ ...localSettings, rightClickEditEnabled: true })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                  localSettings.rightClickEditEnabled
                    ? 'border-green-500 bg-green-500/20 text-green-300'
                    : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">✓ Enabled</div>
                <div className="text-xs mt-1 opacity-75">Right-click to edit</div>
              </button>
              
              <button
                onClick={() => setLocalSettings({ ...localSettings, rightClickEditEnabled: false })}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                  !localSettings.rightClickEditEnabled
                    ? 'border-red-500 bg-red-500/20 text-red-300'
                    : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">✗ Disabled</div>
                <div className="text-xs mt-1 opacity-75">Prevents accidental edits</div>
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <p className="text-blue-300 text-sm flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>
              These settings control your card viewing and editing experience. Changes apply to all cards.
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleCancel}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="success"
            className="flex-1"
          >
            Save Changes
          </Button>
        </div>

      </div>
    </ModalWrapper>
  );
}