export default function MobileUserMenu() {
  return (
    <div className="mt-3 px-2 space-y-1">
      <a
        href="/profile"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
      >
        Your Profile
      </a>

      <a
        href="/setting"
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
      >
        Settings
      </a>

      <a
        href="#"
        onClick={handleLogout}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
      >
        Sign out
      </a>
    </div>
  );
}
