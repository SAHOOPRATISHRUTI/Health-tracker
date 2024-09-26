// goalService.js
const Goal = require('../models/goalModel');
const messages = require('../constants/constMessage');

const createGoal = async (data) => {
    try {
        const goal = new Goal({ ...data });
        await goal.save();
        return goal;
    } catch (error) {
        console.error('Error creating goal:', error);
        throw new Error(messages.createdGoalError);
    }
};

const getGoalsByUserId = async (userId) => {
    try {
        const goals = await Goal.find({ userId });
        if (!goals.length) {
            throw new Error(messages.goalNotFound);
        }
        return goals;
    } catch (error) {
        console.error('Error fetching goals by user ID:', error);
        throw new Error(messages.fetchGoalsError);
    }
};

const updateGoal = async (goalId, data) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(goalId, data, { new: true });
        if (!updatedGoal) {
            throw new Error(messages.goalNotFound);
        }
        return updatedGoal;
    } catch (error) {
        console.error('Error updating goal:', error);
        throw new Error(messages.updateGoalError);
    }
};

const deleteGoal = async (goalId) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(goalId);
        if (!deletedGoal) {
            throw new Error(messages.goalNotFound);
        }
        return deletedGoal;
    } catch (error) {
        console.error('Error deleting goal:', error);
        throw new Error(messages.deleteGoalError);
    }
};

module.exports = {
    createGoal,
    getGoalsByUserId,
    updateGoal,
    deleteGoal
};
