import React, { useRef, useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button as RNButton } from 'react-native'; // Removed TextInput
import Svg, { Path } from 'react-native-svg';
import { BottomSheetModal, BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet'; // Added BottomSheetTextInput
import { useTranslation } from 'react-i18next';

import { ChatMessage } from '../services/ChatApiService';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  messageId?: string;
  feedback?: ChatMessage['feedback']; // Use the type from ChatMessage
  detailedFeedback?: ChatMessage['detailedFeedback']; // Use the type from ChatMessage
  onFeedback?: (
    messageId: string | undefined,
    type: 'liked' | 'disliked',
    details?: { presets: string[]; comment: string }
  ) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isUser,
  timestamp,
  messageId,
  feedback, // Receive current feedback state
  // detailedFeedback, // This prop might not be needed if bubble manages its own detailed feedback UI state
  onFeedback,
}) => {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('');

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleFeedbackPress = (type: 'liked' | 'disliked') => {
    if (onFeedback) {
      if (type === 'disliked') {
        setSelectedPresets([]); // Reset presets when opening
        setComment(''); // Reset comment when opening
        bottomSheetModalRef.current?.present();
      } else {
        // If 'liked', directly call onFeedback and clear any previous 'disliked' detailed feedback
        onFeedback(messageId, 'liked', undefined); 
      }
    }
  };

  const handleSubmitDetailedFeedback = () => {
    if (onFeedback && messageId) {
      onFeedback(messageId, 'disliked', { presets: selectedPresets, comment });
    }
    bottomSheetModalRef.current?.dismiss();
  };

  const togglePreset = (preset: string) => {
    setSelectedPresets(prev => 
      prev.includes(preset) ? prev.filter(p => p !== preset) : [...prev, preset]
    );
  };

  const feedbackPresetReasons = [
    { key: 'inaccurate', label: t('feedbackInaccurate', 'Inaccurate or irrelevant') },
    { key: 'unhelpful', label: t('feedbackUnhelpful', 'Unhelpful') },
    { key: 'offensive', label: t('feedbackOffensive', 'Offensive or inappropriate') },
    { key: 'other', label: t('feedbackOther', 'Other (please specify)') },
  ];


  const likedColor = '#007AFF'; // Blue for liked
  const dislikedColor = '#FF3B30'; // Red for disliked
  const defaultColor = styles.aiTimestamp.color;

  const thumbUpColor = feedback === 'liked' ? likedColor : defaultColor;
  const thumbDownColor = feedback === 'disliked' ? dislikedColor : defaultColor;

  return (
    <>
      <View style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer
      ]}>
        <Text style={[
          styles.text,
          isUser ? styles.userText : styles.aiText
        ]}>
          {text}
        </Text>
        
        <View style={styles.footer}>
          <Text style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.aiTimestamp
          ]}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          
          {!isUser && onFeedback && (
            <View style={styles.feedbackContainer}>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => handleFeedbackPress('liked')}
                accessibilityLabel="Thumbs up"
              >
                <Svg height="16" width="16" viewBox="0 0 24 24">
                  <Path fill={thumbUpColor} d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => handleFeedbackPress('disliked')}
                accessibilityLabel="Thumbs down"
              >
                <Svg height="16" width="16" viewBox="0 0 24 24">
                  <Path fill={thumbDownColor} d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17-.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                </Svg>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {!isUser && (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0} // Start at the first snap point
          snapPoints={snapPoints}
          // onChange={handleSheetChanges} // Optional: for logging or other actions
        >
          <BottomSheetView style={styles.bottomSheetContentContainer}>
            <Text style={styles.feedbackTitle}>{t('provideFeedbackTitle', 'Tell us more')}</Text>
            <View style={styles.presetsContainer}>
              {feedbackPresetReasons.map((reason) => (
                <TouchableOpacity
                  key={reason.key}
                  style={[
                    styles.presetButton,
                    selectedPresets.includes(reason.key) && styles.presetButtonSelected
                  ]}
                  onPress={() => togglePreset(reason.key)}
                >
                  <Text 
                    style={[
                      styles.presetButtonText,
                      selectedPresets.includes(reason.key) && styles.presetButtonTextSelected
                    ]}
                  >
                    {reason.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <BottomSheetTextInput
              style={styles.commentInput}
              placeholder={t('feedbackCommentPlaceholder', 'Additional comments (optional)')}
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <RNButton 
              title={t('submitFeedbackButton', 'Submit Feedback')} 
              onPress={handleSubmitDetailedFeedback} 
            />
          </BottomSheetView>
        </BottomSheetModal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // ... existing styles
  container: {
    maxWidth: '80%',
    marginVertical: 5,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // Standard iOS blue for user
    marginRight: 8,
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9EB', // Standard iOS light gray for AI/others
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7,
  },
  userTimestamp: {
    color: '#FFFFFF',
  },
  aiTimestamp: {
    color: '#3C3C43',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackButton: {
    marginLeft: 8,
    padding: 2,
  },
  // Styles for BottomSheet content
  bottomSheetContentContainer: {
    padding: 20,
    backgroundColor: 'white', // Or your theme background
    flex: 1, // Important for BottomSheetView to fill the modal
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  presetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  presetButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  presetButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  presetButtonText: {
    color: '#333',
  },
  presetButtonTextSelected: {
    color: '#fff',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top', // For Android
    marginBottom: 15,
  },
});

export default MessageBubble;
