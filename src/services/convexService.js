import { useMutation, useQuery } from "convex/react";
import { nanoid } from "nanoid";

// Import the real Convex API
import { api } from "../convex/_generated/api";

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
      userId = await createUser({ existingUserId: null });
      // Store the user ID in local storage
      localStorage.setItem('userId', userId);
    } else {
      // If user ID exists in local storage, verify it exists in the database
      // This will either return the existing ID or create a new one if it doesn't exist
      userId = await createUser({ existingUserId: userId });
      // Update the user ID in local storage in case a new one was created
      localStorage.setItem('userId', userId);
    }
    
    return userId;
  };
};

// Store a conversation in Convex
export const useStoreConversation = () => {
  const storeConversationMutation = useMutation(api.conversations.storeConversation);
  const createUser = useMutation(api.users.getOrCreateUser);
  
  return async (prompt, response, isEcoModeActive) => {
    // Get user ID from local storage or create a new one
    let userId = localStorage.getItem('userId');
    if (!userId) {
      // If no user ID in local storage, create a new one
      userId = await createUser({ existingUserId: null });
      localStorage.setItem('userId', userId);
    } else {
      // Verify the user exists in the database
      userId = await createUser({ existingUserId: userId });
      localStorage.setItem('userId', userId);
    }
    
    // Store the conversation in Convex
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
