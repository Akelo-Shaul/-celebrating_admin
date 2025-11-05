import React, { useState } from 'react'
import { Shield, Settings, Save } from 'lucide-react'
import ReleaseSettings from './escrow_settings_widgets/ReleaseSettings'
import FeeSettings from './escrow_settings_widgets/FeeSettings'
import DisputeSettings from './escrow_settings_widgets/DisputeSettings'
import SecuritySettings from './escrow_settings_widgets/SecuritySettings'
import NotificationSettings from './escrow_settings_widgets/NotificationSettings'
import LimitsAndRestrictions from './escrow_settings_widgets/LimitsAndRestrictions'

const EscrowSettings = () => {
  const [settings, setSettings] = useState({
    releaseSettings: {},
    feeSettings: {},
    disputeSettings: {},
    securitySettings: {},
    notificationSettings: {},
    limitsSettings: {}
  })

  const handleSave = () => {
    // Save all settings
    console.log('Saving escrow settings:', settings)
    alert('Escrow settings saved successfully!')
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Escrow Settings</h1>
          <p className="text-gray-600">Configure escrow release rules, fees, disputes, and security settings</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Release Settings */}
          <ReleaseSettings 
            settings={settings.releaseSettings}
            onChange={(newSettings) => setSettings({ ...settings, releaseSettings: newSettings })}
          />

          {/* Fee Settings */}
          <FeeSettings 
            settings={settings.feeSettings}
            onChange={(newSettings) => setSettings({ ...settings, feeSettings: newSettings })}
          />

          {/* Dispute Settings */}
          <DisputeSettings 
            settings={settings.disputeSettings}
            onChange={(newSettings) => setSettings({ ...settings, disputeSettings: newSettings })}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Security Settings */}
          <SecuritySettings 
            settings={settings.securitySettings}
            onChange={(newSettings) => setSettings({ ...settings, securitySettings: newSettings })}
          />

          {/* Notification Settings */}
          <NotificationSettings 
            settings={settings.notificationSettings}
            onChange={(newSettings) => setSettings({ ...settings, notificationSettings: newSettings })}
          />

          {/* Limits and Restrictions */}
          <LimitsAndRestrictions 
            settings={settings.limitsSettings}
            onChange={(newSettings) => setSettings({ ...settings, limitsSettings: newSettings })}
          />
        </div>
      </div>
    </div>
  )
}

export default EscrowSettings

