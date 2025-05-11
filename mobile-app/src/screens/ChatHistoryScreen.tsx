import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'; // Added Alert
import { useSession } from '../context/SessionContext';
import { SessionSummary } from '../services/ChatApiService';
import { useTranslation } from 'react-i18next';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import Reanimated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons'; // For FAB icon
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import useNavigation and NavigationProp

type SwipeableRowRef = SwipeableMethods;

// Define a param list type for the navigator that includes ChatHistoryScreen and ChatScreen
type RootDrawerParamList = {
  Chat: undefined; 
  ChatHistory: undefined;
  // Add other screens here if any that might be navigated to from here
};

type ChatHistoryScreenNavigationProp = NavigationProp<RootDrawerParamList, 'ChatHistory'>;

const ChatHistoryScreen: React.FC = () => {
  const { sessions, isLoadingSummaries, selectSession, deleteSession: contextDeleteSession, renameSession, createNewSession } = useSession(); 
  const { t } = useTranslation();
  const navigation = useNavigation<ChatHistoryScreenNavigationProp>(); // Get navigation object
  const swipeableRefs = useRef<Map<string, SwipeableRowRef | null>>(new Map());

  const RightActionsComponent: React.FC<{
    progress: SharedValue<number>;
    dragX: SharedValue<number>; 
    sessionId: string;
    onDeletePress: () => void;
    onRenamePress: () => void; 
  }> = ({ progress, dragX, sessionId, onDeletePress, onRenamePress }) => {
    const { t } = useTranslation();
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: progress.value,
        transform: [{ scale: progress.value }],
      };
    });

    return (
      <Reanimated.View style={[{ flexDirection: 'row', alignItems: 'center' }, animatedStyle]}>
        <RectButton style={[styles.rightAction, styles.renameAction]} onPress={onRenamePress}>
          <Text style={styles.actionText}>{t('rename', 'Rename')}</Text>
        </RectButton>
        <RectButton style={[styles.rightAction, styles.deleteAction]} onPress={onDeletePress}>
          <Text style={styles.actionText}>{t('delete', 'Delete')}</Text>
        </RectButton>
      </Reanimated.View>
    );
  };

  const renderItem = ({ item }: { item: SessionSummary }) => {
    const handleDelete = () => {
      swipeableRefs.current.get(item.id)?.close();
      Alert.alert(
        t('deleteSessionTitle', 'Delete Session'),
        t('deleteSessionMessage', 'Are you sure you want to delete this chat session? This action cannot be undone.'),
        [
          {
            text: t('cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('delete', 'Delete'),
            onPress: async () => {
              console.log('Confirmed delete session:', item.id);
              await contextDeleteSession(item.id);
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    };

    const handleRename = () => {
      swipeableRefs.current.get(item.id)?.close();
      
      // Determine current display text for prompt default, consistent with display logic
      const isDefaultTitlePattern = /^New Chat \d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2}( AM| PM)?$/i;
      let currentMainDisplayText = item.title; // Start with title
      if (isDefaultTitlePattern.test(item.title)) { // If title is default
        currentMainDisplayText = item.lastMessageSnippet || item.title; // Use snippet, or fallback to default title if no snippet
      }
      // If title is custom, currentMainDisplayText remains item.title

      Alert.prompt(
        t('renameSessionTitle', 'Rename Session'),
        t('renameSessionMessage', 'Enter a new name for this session:'),
        [
          {
            text: t('cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('rename', 'Rename'),
            onPress: async (newTitle) => {
              if (newTitle && newTitle.trim() !== '') {
                await renameSession(item.id, newTitle.trim());
              }
            },
          },
        ],
        'plain-text',
        currentMainDisplayText // Default text in prompt is what's currently shown
      );
    };

    return (
      <ReanimatedSwipeable
        ref={(refValue) => { // Renamed 'ref' to 'refValue' to avoid conflict if any
          if (refValue) {
            swipeableRefs.current.set(item.id, refValue as SwipeableRowRef);
          } else {
            swipeableRefs.current.delete(item.id);
          }
        }}
        friction={2}
        rightThreshold={40}
        renderRightActions={(progress, dragXVal) => ( // Renamed 'dragX' to 'dragXVal'
          <RightActionsComponent
            progress={progress}
            dragX={dragXVal} 
            sessionId={item.id}
            onDeletePress={handleDelete}
            onRenamePress={handleRename} // Re-enabled rename action
          />
        )}
        onSwipeableWillOpen={() => {
          swipeableRefs.current.forEach((rowRef, rowId) => { // Renamed 'ref' to 'rowRef', 'id' to 'rowId'
            if (rowId !== item.id && rowRef) {
              rowRef.close();
            }
          });
        }}
      >
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleSelectSession(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
            {(() => {
              const isDefaultTitlePattern = /^New Chat \d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2}( AM| PM)?$/i;
              if (!isDefaultTitlePattern.test(item.title)) { // If title is custom (not default pattern)
                return item.title; // Display the custom title
              }
              // If title is default, display snippet, or fallback to default title if no snippet
              return item.lastMessageSnippet || item.title; 
            })()}
          </Text>
          <Text style={styles.itemTimestamp}>
            {t('lastUpdated', 'Last updated:')} {new Date(item.updatedAt).toLocaleDateString()} {new Date(item.updatedAt).toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
      </ReanimatedSwipeable>
    );
  };

  const handleSelectSession = async (sessionId: string) => {
    await selectSession(sessionId);
    console.log('Selected session:', sessionId);
    navigation.navigate('Chat');
  };

  if (isLoadingSummaries) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (sessions.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.emptyText}>{t('noChatHistory', 'No chat history yet.')}</Text>
        {/* TODO: Add a "New Chat" button here later (Task C.3.6) */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={async () => {
          const newSessionId = await createNewSession();
          if (newSessionId) {
            // Navigation to ChatScreen would typically happen here.
            // If ChatScreen is the main screen, context update might be enough.
            // For now, we assume AppNavigator handles showing ChatScreen for active session.
            console.log('New session created and activated:', newSessionId);
            navigation.navigate('Chat'); 
          }
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingVertical: 8,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemTitle: { // Displays custom title or snippet
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  // itemSubtitle style is not used for a two-line display
  itemTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75, // Restore width for two actions
  },
  actionContentContainer: { 
    // This style might not be needed if RectButton directly contains Text
    // Or ensure it's used correctly within the RectButton for animated content
    paddingHorizontal: 10, // Adjust if text is cramped
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  renameAction: { // Re-add renameAction style
    backgroundColor: '#007AFF',
  },
  deleteAction: { 
    backgroundColor: '#FF3B30',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF', // Standard blue
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ChatHistoryScreen;
