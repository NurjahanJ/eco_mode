import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Store a new conversation (prompt + response) with EcoMode state
export const storeConversation = mutation({
  args: {
    userId: v.string(),
    prompt: v.string(),
    response: v.string(),
    ecoModeActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { userId, prompt, response, ecoModeActive } = args;
    
    // Store the conversation in the database
    const conversationId = await ctx.db.insert("conversations", {
      userId,
      prompt,
      response,
      ecoModeActive,
    });
    
    return conversationId;
  },
});

// Get conversations for a specific user
export const getUserConversations = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc", (q) => q.field("_creationTime"))
      .collect();
  },
});

// Get all conversations (admin function)
export const getAllConversations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("conversations")
      .order("desc", (q) => q.field("_creationTime"))
      .collect();
  },
});
