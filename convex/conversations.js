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
    
    // Get the user's previous conversations to calculate promptNumber
    const userConversations = await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    
    // Calculate the promptNumber (number of previous conversations + 1)
    const promptNumber = userConversations.length + 1;
    
    // Check if user exists, create only if this is their first prompt
    let user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    
    if (!user) {
      // Create user only when they make their first prompt
      const userId_doc = await ctx.db.insert("users", {
        userId,
        totalPrompts: 1, // Initialize with 1 since this is their first prompt
      });
    } else {
      // Update existing user's totalPrompts count
      const currentTotal = user.totalPrompts || 0;
      await ctx.db.patch(user._id, { totalPrompts: currentTotal + 1 });
    }
    
    // Store the conversation in the database with promptNumber
    const conversationId = await ctx.db.insert("conversations", {
      userId,
      prompt,
      response,
      ecoModeActive,
      promptNumber,
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
