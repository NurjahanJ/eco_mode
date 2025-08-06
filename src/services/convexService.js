import { useMutation, useQuery } from "convex/react";
import { nanoid } from "nanoid";

// Import a mock API until Convex is properly initialized
const api = {
  users: {
    getOrCreateUser: "users:getOrCreateUser"
  },
  conversations: {
    storeConversation: "conversations:storeConversation",
    getUserConversations: "conversations:getUserConversations",
    getAllConversations: "conversations:getAllConversations"
  }
};

/**
 * Service for interacting with Convex database
 * This service handles storing and retrieving user and conversation data
 */

// Get or create a user ID
export const useGetOrCreateUser = () => {
  const createUser = useMutation(api.users.getOrCreateUser);
  
  return async () => {
    // Check if user ID exists in local storage
    let userId = localStorage.getItem('userId');
    
    if (!userId) {
      // If no user ID in local storage, create a new one
      userId = await createUser();
      // Store the user ID in local storage
      localStorage.setItem('userId', userId);
    }
    
    return userId;
  };
};

// Store a conversation in Convex
export const useStoreConversation = () => {
  const storeConversationMutation = useMutation(api.conversations.storeConversation);
  
  return async (prompt, response, isEcoModeActive) => {
    // Get user ID from local storage or generate a temporary one
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = nanoid(10);
      localStorage.setItem('userId', userId);
    }
    
    // Store the conversation in Convex
    return await storeConversationMutation({
      userId,
      prompt,
      response,
      ecoModeActive: isEcoModeActive,
      timestamp: new Date().toISOString(),
    });
  };
};

// Get conversations for the current user
export const useGetUserConversations = (userId) => {
  return useQuery(api.conversations.getUserConversations, { userId });
};

// Get all conversations (admin function)
export const useGetAllConversations = () => {
  return useQuery(api.conversations.getAllConversations);
};
