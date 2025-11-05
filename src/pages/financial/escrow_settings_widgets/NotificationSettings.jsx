import React, { useState } from 'react'
import { Bell, Mail, MessageSquare, AlertCircle } from 'lucide-react'
import { SettingsCard, SettingField } from '../payment_methods_widgets/SettingsCard'

const NotificationSettings = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState({
    notifyOnPayment: settings?.notifyOnPayment ?? true,
    notifyOnRelease: settings?.notifyOnRelease ?? true,
    notifyOnDispute: settings?.notifyOnDispute ?? true,
    notifyOnEscalation: settings?.notifyOnEscalation ?? true,
    notifyBeforeAutoRelease: settings?.notifyBeforeAutoRelease ?? true,
    notifyBeforeAutoReleaseDays: settings?.notifyBeforeAutoReleaseDays ?? 1,
    notifyOnHighValue: settings?.notifyOnHighValue ?? true,
    highValueThreshold: settings?.highValueThreshold ?? 5000,
    enableEmailNotifications: settings?.enableEmailNotifications ?? true,
    enableSMSNotifications: settings?.enableSMSNotifications ?? false,
    enableInAppNotifications: settings?.enableInAppNotifications ?? true,
    ...settings
  })

  const handleChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value }
    setLocalSettings(newSettings)
    onChange(newSettings)
  }

  return (
    <SettingsCard title="Notification Settings">
      <div>
        <SettingField
          label="Notify on Payment Confirmation"
          type="checkbox"
          value={localSettings.notifyOnPayment}
          onChange={(e) => handleChange('notifyOnPayment', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Notify on Release"
          type="checkbox"
          value={localSettings.notifyOnRelease}
          onChange={(e) => handleChange('notifyOnRelease', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Notify on Dispute Filed"
          type="checkbox"
          value={localSettings.notifyOnDispute}
          onChange={(e) => handleChange('notifyOnDispute', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Notify on Escalation"
          type="checkbox"
          value={localSettings.notifyOnEscalation}
          onChange={(e) => handleChange('notifyOnEscalation', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Notify Before Auto-Release"
          type="checkbox"
          value={localSettings.notifyBeforeAutoRelease}
          onChange={(e) => handleChange('notifyBeforeAutoRelease', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Notify Before Auto-Release (Days)"
        type="number"
        value={localSettings.notifyBeforeAutoReleaseDays}
        onChange={(e) => handleChange('notifyBeforeAutoReleaseDays', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Notify on High Value Transactions (>$)"
          type="checkbox"
          value={localSettings.notifyOnHighValue}
          onChange={(e) => handleChange('notifyOnHighValue', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="High Value Threshold ($)"
        type="number"
        value={localSettings.highValueThreshold}
        onChange={(e) => handleChange('highValueThreshold', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Enable Email Notifications"
          type="checkbox"
          value={localSettings.enableEmailNotifications}
          onChange={(e) => handleChange('enableEmailNotifications', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Enable SMS Notifications"
          type="checkbox"
          value={localSettings.enableSMSNotifications}
          onChange={(e) => handleChange('enableSMSNotifications', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Enable In-App Notifications"
          type="checkbox"
          value={localSettings.enableInAppNotifications}
          onChange={(e) => handleChange('enableInAppNotifications', e.target.checked)}
        />
      </div>
    </SettingsCard>
  )
}

export default NotificationSettings

