const express = require('express');
const router = express.Router();
const Mail = require('../models/mailModel');

// GET all mails
router.get('/api/mails', async (req, res) => {
  try {
    const mails = await Mail.find().sort({ sentAt: -1 }).populate('replyTo');
    res.json({ status: 200, data: mails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// POST a new mail (or reply)
router.post('/api/mails', async (req, res) => {
  const { fromName, fromEmail, toName, toEmail, cc, bcc, threadId, messageId, inReplyTo, references, subject, body, isRead, folder, uid, sentAt, archivedAt, replyTo } = req.body;

  // Validate required fields
  if (!fromName || !fromEmail || !toName || !toEmail || !subject || !body || !sentAt) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newMail = new Mail({
      fromName, fromEmail, toName, toEmail, cc, bcc, threadId, messageId, inReplyTo, references,
      subject, body, isRead, folder, uid, sentAt, archivedAt, replyTo
    });

    // Ensure `sentAt` is a valid date
    if (!(newMail.sentAt instanceof Date && !isNaN(newMail.sentAt.getTime()))) {
      return res.status(400).json({ message: 'Invalid date format for sentAt' });
    }

    await newMail.save();
    res.status(201).json({ message: 'Mail sent successfully', data: newMail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending mail', error });
  }
});

// DELETE a mail by ID
router.delete('/api/mails/:id', async (req, res) => {
  try {
    const result = await Mail.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Mail not found' });
    }
    res.json({ message: 'Mail deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting mail', error });
  }
});

module.exports = router;
