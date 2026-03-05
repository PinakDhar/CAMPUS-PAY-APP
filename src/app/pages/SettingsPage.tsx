import { ArrowLeft, Moon, Sun, Bell, Lock, Palette, Globe, HelpCircle, Info } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { Switch } from "../components/ui/switch";

export function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 dark:text-white" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Settings</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {theme === "dark" ? "Dark theme enabled" : "Light theme enabled"}
                  </p>
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <SettingRow
              icon={Bell}
              title="Push Notifications"
              description="Receive push notifications"
              hasToggle
              defaultChecked={true}
            />
            <SettingRow
              icon={Bell}
              title="Transaction Alerts"
              description="Get notified for all transactions"
              hasToggle
              defaultChecked={true}
            />
            <SettingRow
              icon={Bell}
              title="Rewards Updates"
              description="Updates about coins and levels"
              hasToggle
              defaultChecked={true}
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <SettingRow
              icon={Lock}
              title="Biometric Login"
              description="Use fingerprint or face ID"
              hasToggle
              defaultChecked={false}
            />
            <SettingRow
              icon={Lock}
              title="Transaction PIN"
              description="Require PIN for transactions"
              hasToggle
              defaultChecked={true}
            />
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language & Region
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <SettingRow
              icon={Globe}
              title="Language"
              description="English"
              hasArrow
              onClick={() => {}}
            />
            <SettingRow
              icon={Globe}
              title="Currency"
              description="INR (₹)"
              hasArrow
              onClick={() => {}}
            />
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden transition-colors">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5" />
              About
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            <SettingRow
              icon={HelpCircle}
              title="Help & Support"
              description="Get help with Campus Pay"
              hasArrow
              onClick={() => {}}
            />
            <SettingRow
              icon={Info}
              title="Terms & Conditions"
              description="Read our terms"
              hasArrow
              onClick={() => {}}
            />
            <SettingRow
              icon={Info}
              title="Privacy Policy"
              description="Your privacy matters"
              hasArrow
              onClick={() => {}}
            />
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Info className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Version</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingRowProps {
  icon: any;
  title: string;
  description: string;
  hasToggle?: boolean;
  hasArrow?: boolean;
  defaultChecked?: boolean;
  onClick?: () => void;
}

function SettingRow({ 
  icon: Icon, 
  title, 
  description, 
  hasToggle, 
  hasArrow, 
  defaultChecked,
  onClick 
}: SettingRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
      disabled={!hasArrow && !hasToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
        {hasToggle && <Switch defaultChecked={defaultChecked} />}
        {hasArrow && <span className="text-gray-400 dark:text-gray-500">›</span>}
      </div>
    </button>
  );
}
