import { internalMutation } from "../_generated/server";

/**
 * Migration script to add promptNumber to existing conversations
 * Run this once after updating the schema to add promptNumber field
 */
export const add = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Get all users
    const users = await ctx.db.query("users").collect();
    let totalUpdated = 0;

    // Process each user's conversations
    for (const user of users) {
      const userId = user.userId;
      
      // Get all conversations for this user, ordered by creation time (oldest first)
      const userConversations = await ctx.db
        .query("conversations")
        .filter((q) => q.eq(q.field("userId"), userId))
        .order("asc", (q) => q.field("_creationTime"))
        .collect();
      
      // Update each conversation with its promptNumber
      for (let i = 0; i < userConversations.length; i++) {
        const conversation = userConversations[i];
        const promptNumber = i + 1; // 1-based indexing
        
        // Update the conversation with its promptNumber
        await ctx.db.patch(conversation._id, { promptNumber });
        totalUpdated++;
      }
    }
    
    return { success: true, conversationsUpdated: totalUpdated };
  },
});
