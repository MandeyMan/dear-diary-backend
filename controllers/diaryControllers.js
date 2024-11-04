const Diary = require('../model/Diary');

// Create a new diary
const createDiary = async (req, res) => {
    const { story, date, specialNote } = req.body;

    try {
        const diary = new Diary({ userId: req.user, story, date, specialNote });
        await diary.save();

        res.status(201).json({ message: 'Diary created successfully', diary });
    } catch (error) {
        res.status(500).json({ error: 'Error creating diary in backend' });
    }
};
// get diareies

// Get all diaries for the authenticated user
const getDiaries = async (req, res) => {
    try {
      // Fetch all diaries for the logged-in user (userId from token)
      const diaries = await Diary.find({ userId: req.user });
  
      if (!diaries || diaries.length === 0) {
        return res.status(404).json({ message: 'No diaries found' });
      }
  
      res.status(200).json({ message: 'Diaries fetched successfully', diaries });
    } catch (error) {
      res.status(500).json({ message: 'Error in fetching diaries', error: error.message });
    }
  };
  

// Update a diary
const updateDiary = async (req, res) => {
    const { story, date, specialNote } = req.body;

    try {
        const diary = await Diary.findById(req.params.id);

        if (!diary) {
            return res.status(404).json({ message: "Diary not found" });
        }

        // Update diary fields only if provided
        diary.story = story !== undefined ? story : diary.story;
        diary.date = date !== undefined ? date : diary.date;
        diary.specialNote = specialNote !== undefined ? specialNote : diary.specialNote;

        const updatedDiary = await diary.save();

        res.status(200).json({ message: "Diary updated successfully", diary: updatedDiary });
    } catch (error) {
        res.status(500).json({ message: "Error updating diary", error: error.message });
    }
};

// Delete a diary
const deleteDiary = async (req, res) => {
    try {
        const deletedDiary = await Diary.findByIdAndDelete(req.params.id);

        if (!deletedDiary) {
            return res.status(404).json({ message: "Diary not found" });
        }

        res.status(200).json({ message: "Diary deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in deleting diary" });
    }
};

// Get a specific diary by ID
const getDiaryById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const diary = await Diary.findById(id);
  
      if (!diary) {
        return res.status(404).json({ message: 'Diary not found' });
      }
  
      res.status(200).json({ diary });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching diary', error: error.message });
    }
  };

module.exports = { createDiary, getDiaries, updateDiary, deleteDiary,getDiaryById };
