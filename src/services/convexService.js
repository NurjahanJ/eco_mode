import { useMutation, useQuery } from "convex/react";

// Import the real Convex API
import { api } from "../convex/_generated/api";

/**
 * Service for interacting with Convex database
 * This service handles storing and retrieving user and conversation data
 */

// Get user ID from local storage
export const useGetUserId = () => {
  return () => {
    // Check if user ID exists in local storage
    const userId = localStorage.getItem('userId');
    return userId;
  };
};

// Store a conversation in Convex
export const useStoreConversation = () => {
  const storeConversationMutation = useMutation(api.conversations.storeConversation);
  
  return async (prompt, response, isEcoModeActive) => {
    // Generate a temporary user ID if none exists in local storage
    let userId = localStorage.getItem('userId');
    if (!userId) {
      // Generate a temporary ID without creating a user in the database yet
      userId = Math.random().toString(36).substring(2, 12);
      localStorage.setItem('userId', userId);
    }
    
    // Store the conversation in Convex - this will create the user if needed
    return await storeConversationMutation({
      userId,
      prompt,
      response,
      ecoModeActive: isEcoModeActive,
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
