import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import SideBar from './SideBar';
import TopBar from './TopBar';

const MailList = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/mails')
      .then(response => {
        setMails(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the mail list!', error);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedMail) {
        if (event.key === 'r') {
          handleReply();
        } else if (event.key === 'd') {
          handleDelete();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMail]);

  const handleReply = () => {
    if (selectedMail) {
      setReplyMode(true);
      setReplySubject(`RE: ${selectedMail.subject}`);
    }
  };

  const handleSendReply = () => {
    if (selectedMail) {
      const replyMail = {
        fromName: selectedMail.toName,
        fromEmail: selectedMail.toEmail,
        toName: selectedMail.fromName,
        toEmail: selectedMail.fromEmail,
        subject: replySubject,
        body: replyContent,
        sentAt: new Date(),
        replyTo: selectedMail._id, // Linking reply to original email
      };

      axios.post('http://localhost:5000/api/mails', replyMail)
        .then(() => {
          setReplyMode(false);
          setReplyContent('');
          setReplySubject('');
          // Refresh the mail list or update state accordingly
          setMails(prevMails => [...prevMails, replyMail]);
        })
        .catch(error => {
          console.error('There was an error sending the reply!', error);
        });
    }
  };

  const handleDelete = () => {
    if (selectedMail) {
      axios.delete(`http://localhost:5000/api/mails/${selectedMail._id}`)
        .then(() => {
          setMails(prevMails => prevMails.filter(mail => mail._id !== selectedMail._id));
          setSelectedMail(null);
        })
        .catch(error => {
          console.error('There was an error deleting the mail!', error);
        });
    }
  };

  if (mails.length === 0) {
    return <div className="text-center text-gray-500">No emails found.</div>;
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <SideBar className="flex-none w-1/4 bg-gray-800 text-white p-4 overflow-y-auto" />
      
      <div className="flex-1 flex flex-col">
        <TopBar darkMode={darkMode} onToggleDarkMode={handleToggle} />
        
        <div className="flex flex-1">
          {/* Mail list */}
          <div className="w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-400">All Inbox(s)</h2>
              <p className="text-gray-400">25/25 Inboxes selected</p>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg"
            />
            <div className="flex justify-between mb-4">
              <span>26 New Replies</span>
              <span>Newest</span>
            </div>
            {mails.map(mail => (
              <div
                key={mail._id}
                className={`p-4 mb-2 cursor-pointer rounded-lg ${selectedMail && selectedMail._id === mail._id ? 'bg-blue-600' : 'bg-gray-700'}`}
                onClick={() => setSelectedMail(mail)}
              >
                <div className="font-semibold">{mail.fromName}</div>
                <div className="text-sm text-gray-400">{mail.subject}</div>
                <div className="text-xs text-gray-500">{new Date(mail.sentAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>

          {/* Mail details and reply */}
          <div className="flex-1 bg-gray-700 p-6 text-white">
            {selectedMail ? (
              <div>
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold">{selectedMail.subject}</h2>
                  <div className="text-gray-400">From: {selectedMail.fromName} ({selectedMail.fromEmail})</div>
                  <div className="text-gray-400">To: {selectedMail.toName} ({selectedMail.toEmail})</div>
                  <div className="text-gray-400">Date: {new Date(selectedMail.sentAt).toLocaleDateString()}</div>
                </div>
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: selectedMail.body }}></div>

                {replyMode ? (
                  <div className="mt-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium">From:</label>
                      <input
                        type="text"
                        className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                        value={`${selectedMail.toName} <${selectedMail.toEmail}>`}
                        readOnly
                      />
                      <label className="block text-sm font-medium">To:</label>
                      <input
                        type="text"
                        className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                        value={`${selectedMail.fromName} <${selectedMail.fromEmail}>`}
                        readOnly
                      />
                      <label className="block text-sm font-medium">Subject:</label>
                      <input
                        type="text"
                        className="w-full p-2 mb-2 bg-gray-800 text-white rounded-lg"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                      />
                    </div>
                    <textarea
                      className="w-full p-4 bg-gray-800 text-white rounded-lg mb-4"
                      rows="6"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mr-2"
                        onClick={handleSendReply}
                      >
                        Send
                      </button>
                      <button
                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                        onClick={() => setReplyMode(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex justify-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                      onClick={handleReply}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">Select an email to view its details</div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-1/4 bg-gray-800 text-white p-4">
            {selectedMail && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Lead Details</h3>
                  <p>Name: {selectedMail.toName}</p>
                  <p>Email ID: {selectedMail.toEmail}</p>
                  <p>Contact No: +54-9062827869</p>
                  <p>Company Name: Reachinbox</p>
                  <p>LinkedIn: <a href="#" className="text-blue-400">linkedin.com/in/timvadde</a></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Activities</h3>
                  <ul>
                    <li>Step 1: Email - Sent 3rd, Feb</li>
                    <li>Step 2: Email - Opened 5th, Feb</li>
                    <li>Step 3: Email - Opened 5th, Feb</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailList;
