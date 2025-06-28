import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings'
import AccountSettings from './AccountSettings'


const SettingsPage = () => {
  const [section, setSection] = useState('Profile');

  const renderSection = () => {
    switch (section) {
      case 'Profile':
        return <ProfileSettings />;
      case 'Account':
        return <AccountSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-sky-400 mb-6">Settings</h2>
        <ul className="space-y-4 text-gray-700">
          {['Profile', 'Account'].map((item) => (
            <li key={item}>
              <button
                onClick={() => setSection(item)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  section === item
                    ? 'bg-sky-100 text-sky-400 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{renderSection()}</main>
    </div>
  );
};

export default SettingsPage;
