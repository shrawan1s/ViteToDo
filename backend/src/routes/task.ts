import express, { Response } from 'express';
import { fetchUser, AuthenticatedRequest } from '../middleware/fetchUser';
import { Task } from '../model/taskSchema';

const router = express.Router();

// ROUTE 1: Get All Tasks using GET "/api/app/fetchalltasks". Login required.
router.get('/fetchalltasks', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Fetch all tasks for the authenticated user
        const tasks = await Task.find({ user: req.user!.id });
        res.status(200).json({ success: true, tasks });
    } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ROUTE 2: Get a Task using GET "/api/app/fetchtask/:id". Login required.
router.get('/fetchtask/:id', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);

        // Check if the task exists and belongs to the user
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });
        if (task.user.toString() !== req.user!.id) return res.status(401).json({ success: false, message: "Not Authorized" });

        res.status(200).json({ success: true, task });
    } catch (error: any) {
        console.error("Error fetching task:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ROUTE 3: Add a New Task using POST "/api/app/addtask". Login required.
router.post('/addtask', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { task } = req.body;

        // Ensure the task is provided
        if (!task) return res.status(400).json({ success: false, message: "Task content is required" });

        // Create and save a new task for the authenticated user
        const newTask = new Task({
            task,
            date: new Date(),
            user: req.user!.id
        });

        const savedTask = await newTask.save();
        res.status(201).json({ success: true, message: "Task added successfully", savedTask });
    } catch (error: any) {
        console.error("Error adding task:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ROUTE 4: Update an existing Task using PUT "/api/app/updatetask/:id". Login required.
router.put('/updatetask/:id', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    const { task } = req.body;

    try {
        // Find the task by ID
        let existingTask = await Task.findById(req.params.id);

        // Task not found
        if (!existingTask) return res.status(404).json({ success: false, message: "Task not found" });

        // Check if the task belongs to the authenticated user
        if (existingTask.user.toString() !== req.user!.id) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        // Update the task content if provided
        if (task) existingTask.task = task;

        const updatedTask = await existingTask.save();
        res.status(200).json({ success: true, message: "Task updated successfully", updatedTask });
    } catch (error: any) {
        console.error("Error updating task:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ROUTE 5: Delete a Task using DELETE "/api/app/deletetask/:id". Login required.
router.delete('/deletetask/:id', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Find the task by ID
        const task = await Task.findById(req.params.id);

        // Task not found
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Check if the task belongs to the authenticated user
        if (task.user.toString() !== req.user!.id) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        // Delete the task
        await Task.findByIdAndDelete(req.params.id);  // Use the model directly here
        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// ROUTE 6: Delete All Tasks using DELETE "/api/app/deletealltasks". Login required.
router.delete('/deletealltasks', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Delete all tasks for the authenticated user
        const result = await Task.deleteMany({ user: req.user!.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "No tasks found to delete" });
        }

        res.status(200).json({ success: true, message: "All tasks deleted successfully", deletedCount: result.deletedCount });
    } catch (error: any) {
        console.error("Error deleting tasks:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
