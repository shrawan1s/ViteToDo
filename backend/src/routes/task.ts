import express, { Response } from 'express';
import { fetchUser, AuthenticatedRequest } from '../middleware/fetchUser';
import { Note } from '../model/noteSchema';

const router = express.Router();

// ROUTE 1: Get All the Notes using GET "/api/notes/fetchallnotes". Login required.
router.get('/fetchalltasks', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const notes = await Note.find({ user: req.user!.id });
        res.json(notes);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a New Note using POST "/api/notes/addnote". Login required.
router.post('/addtask', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { task } = req.body;
        const note = new Note({
            task,
            date: new Date(Date.now() + 3600000),
            user: req.user!.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing Note using PUT "/api/notes/updatenote/:id". Login required.
router.put('/updatetask/:id', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    const { task } = req.body;
    const newNote: Partial<{ task: string }> = {};

    if (task) newNote.task = task;

    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user!.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete an existing Note using DELETE "/api/notes/deletenote/:id". Login required.
router.delete('/deletetask/:id', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user!.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete all existing Notes using DELETE "/api/notes/deleteallnote". Login required.
router.delete('/deletealltasks', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Directly use the authenticated user's ID to delete notes
        const deletedNotes = await Note.deleteMany({ user: req.user!.id });
        res.json({ "Success": "All notes have been deleted", deletedNotes });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
