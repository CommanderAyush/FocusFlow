const AccountSettings = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="mb-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Change Password
          </button>
        </div>
        <div className="mb-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    );
  };
  
  export default AccountSettings;
  