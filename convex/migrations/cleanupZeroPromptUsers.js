import { internalMutation } from "../_generated/server";

/**
 * Migration script to remove users with zero prompts
 * This ensures the users table only contains users who have made at least one prompt
 */
export const cleanup = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Get all users
    const users = await ctx.db.query("users").collect();
    let totalRemoved = 0;

    // Process each user
    for (const user of users) {
      const userId = user.userId;
      
      // Check if user has any conversations
      const userConversations = await ctx.db
        .query("conversations")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
      
      // If user has no conversations or totalPrompts is 0, remove them
      if (userConversations.length === 0 || (user.totalPrompts !== undefined && user.totalPrompts === 0)) {
        await ctx.db.delete(user._id);
        totalRemoved++;
      }
    }
    
    return { success: true, usersRemoved: totalRemoved };
  },
});
