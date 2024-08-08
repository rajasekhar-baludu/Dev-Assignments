const mongoose = require('mongoose');
const Mail = require('./models/mailModel'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('YourMongoDBConnectionString', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Data to insert
const mails = [
  {
    fromName: "Shaw Adley",
    fromEmail: "shaw@getmemeetings.com",
    toName: "",
    toEmail: "mitrajit2022@gmail.com",
    cc: null,
    bcc: null,
    threadId: 1,
    messageId: "<a5dcWbm1ac5e46d38746648c3e2f6d2c@getmemeetings.com>",
    inReplyTo: "<4a5cWemdbfda475fabaf856ef5e806a7@gmail.com>",
    references: "<4a5cWemdbfda475fabaf856ef5e806a7@gmail.com>",
    subject: "Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E",
    body: "<p>Hi Mitrajit,</p><p>Just wondering if you’re still interested.</p><p>Regards,<br/>Shaw Adley</p><p>6KG634E practicecowboy</p>",
    isRead: true,
    folder: "INBOX",
    uid: 594,
    sentAt: new Date("2023-11-23T04:08:45.000Z"),
    archivedAt: null,
    createdAt: new Date("2023-11-23T07:38:46.000Z"),
    updatedAt: new Date("2023-11-23T07:38:46.000Z"),
    deletedAt: null
  },
  {
    fromName: "Shaw Adley",
    fromEmail: "shaw@getmemeetings.com",
    toName: "",
    toEmail: "mitrajit2022@gmail.com",
    cc: null,
    bcc: null,
    threadId: 2,
    messageId: "<a5dcWbm1ac5e46d38746648c3e2f6d2c@getmemeetings.com>",
    inReplyTo: "<4a5cWemdbfda475fabaf856ef5e806a7@gmail.com>",
    references: "<4a5cWemdbfda475fabaf856ef5e806a7@gmail.com>",
    subject: "Test mail",
    body: "<p>Test mail</p>",
    isRead: true,
    folder: "INBOX",
    uid: 594,
    sentAt: new Date("2023-11-23T04:08:45.000Z"),
    archivedAt: null,
    createdAt: new Date("2023-11-23T07:38:46.000Z"),
    updatedAt: new Date("2023-11-23T07:38:46.000Z"),
    deletedAt: null
  }
];

// Insert data
Mail.insertMany(mails)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  });
