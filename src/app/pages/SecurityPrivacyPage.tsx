import { ArrowLeft, Lock, Fingerprint, Smartphone, Eye, Bell, Shield, Key, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function SecurityPrivacyPage() {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    biometricAuth: true,
    twoFactorAuth: false,
    transactionAlerts: true,
    loginAlerts: true,
    deviceManagement: true,
    autoLogout: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Security & Privacy</h1>
        </div>
      </header>

      <div className="p-4 pb-20 space-y-6">
        {/* Security Status */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Account Secure</h3>
              <p className="text-sm opacity-90">Your account is well protected</p>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Authentication</h3>
          </div>
          <ToggleItem
            icon={Fingerprint}
            title="Biometric Authentication"
            description="Use fingerprint or face ID to login"
            enabled={settings.biometricAuth}
            onToggle={() => toggleSetting('biometricAuth')}
          />
          <ToggleItem
            icon={Smartphone}
            title="Two-Factor Authentication"
            description="Add an extra layer of security"
            enabled={settings.twoFactorAuth}
            onToggle={() => toggleSetting('twoFactorAuth')}
          />
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-800">Change Password</p>
              <p className="text-xs text-gray-500">Update your account password</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Notifications & Alerts */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Notifications & Alerts</h3>
          </div>
          <ToggleItem
            icon={Bell}
            title="Transaction Alerts"
            description="Get notified for all transactions"
            enabled={settings.transactionAlerts}
            onToggle={() => toggleSetting('transactionAlerts')}
          />
          <ToggleItem
            icon={AlertCircle}
            title="Login Alerts"
            description="Alert when new device logs in"
            enabled={settings.loginAlerts}
            onToggle={() => toggleSetting('loginAlerts')}
          />
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Privacy Settings</h3>
          </div>
          <ToggleItem
            icon={Eye}
            title="Auto-Hide Balance"
            description="Balance hidden by default"
            enabled={settings.autoLogout}
            onToggle={() => toggleSetting('autoLogout')}
          />
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-800">Privacy Policy</p>
              <p className="text-xs text-gray-500">View our privacy policy</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Device Management */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Device Management</h3>
          </div>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-800">Manage Devices</p>
              <p className="text-xs text-gray-500">2 active devices</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-red-100">
          <div className="p-4 border-b border-red-100 bg-red-50">
            <h3 className="font-bold text-red-600">Danger Zone</h3>
          </div>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-xs text-gray-500">Permanently delete your account</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ToggleItemProps {
  icon: typeof Lock;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleItem({ icon: Icon, title, description, enabled, onToggle }: ToggleItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-t border-gray-100">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        enabled ? 'bg-purple-100' : 'bg-gray-100'
      }`}>
        <Icon className={`w-5 h-5 ${enabled ? 'text-purple-600' : 'text-gray-400'}`} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-12 h-7 rounded-full transition-colors relative ${
          enabled ? 'bg-purple-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
