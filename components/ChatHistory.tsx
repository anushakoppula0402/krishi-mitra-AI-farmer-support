import React, { useState } from 'react';
import type { Language, Conversation } from '../types';
import { UI_STRINGS } from '../constants';
import { Icon } from './Icon';

interface ChatHistoryProps {
  conversations: Conversation[];
  onLoadConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onClose: () => void;
  language: Language;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  conversations,
  onLoadConversation,
  onDeleteConversation,
  onClose,
  language,
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState<boolean>(false);
  const uiText = UI_STRINGS[language.code].chatHistory;

  const sortedConversations = [...conversations].sort((a, b) => b.lastUpdateTime - a.lastUpdateTime);
  
  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      onDeleteConversation(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleClearAllHistory = () => {
    setShowClearAllConfirm(true);
  };

  const confirmClearAll = () => {
    // Delete all conversations
    conversations.forEach(conv => onDeleteConversation(conv.id));
    setShowClearAllConfirm(false);
  };

  const cancelClearAll = () => {
    setShowClearAllConfirm(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col animate-modal-fade-in">
        <header className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800">{uiText.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50">
            <Icon name="close" className="w-6 h-6" />
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto bg-gray-50">
          {sortedConversations.length > 0 ? (
            <>
              <div className="flex justify-end mb-4">
                <button 
                  onClick={handleClearAllHistory}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Icon name="trash" className="w-4 h-4" />
                  {uiText.clearAll}
                </button>
              </div>
              <ul className="space-y-4">
                {sortedConversations.map(conv => (
                  <li key={conv.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate pr-3" title={conv.title}>{conv.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(conv.lastUpdateTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button onClick={() => onLoadConversation(conv.id)} className="p-2.5 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg" title={uiText.load}>
                          <Icon name="send" className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeleteClick(conv.id)} className="p-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg" title={uiText.delete}>
                          <Icon name="trash" className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon name="history" className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium">{uiText.noHistory}</p>
            </div>
          )}
        </main>
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl animate-modal-fade-in max-w-sm w-full mx-4">
                <h3 className="text-xl font-bold mb-6 text-gray-800">{uiText.deleteConfirm}</h3>
                <div className="flex justify-end gap-4">
                    <button onClick={cancelDelete} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">{uiText.cancel}</button>
                    <button onClick={confirmDelete} className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md">{uiText.confirm}</button>
                </div>
            </div>
        </div>
      )}

      {showClearAllConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl animate-modal-fade-in max-w-sm w-full mx-4">
                <h3 className="text-xl font-bold mb-6 text-gray-800">{uiText.clearAllConfirm}</h3>
                <p className="text-gray-600 mb-6">{uiText.clearAllWarning}</p>
                <div className="flex justify-end gap-4">
                    <button onClick={cancelClearAll} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">{uiText.cancel}</button>
                    <button onClick={confirmClearAll} className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md">{uiText.confirm}</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;