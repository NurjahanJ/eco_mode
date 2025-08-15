import { internalMutation } from "../_generated/server";

/**
 * Migration script to add totalPrompts to existing users
 * Calculates the total number of prompts for each user based on conversations
 */
export const add = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Get all users
    const users = await ctx.db.query("users").collect();
    let totalUpdated = 0;

    // Process each user
    for (const user of users) {
      const userId = user.userId;
      
      // Count conversations for this user
      const userConversations = await ctx.db
        .query("conversations")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
      
      const totalPrompts = userConversations.length;
      
      // Update the user with totalPrompts count
      await ctx.db.patch(user._id, { totalPrompts });
      totalUpdated++;
    }
    
    return { success: true, usersUpdated: totalUpdated };
  },
});
