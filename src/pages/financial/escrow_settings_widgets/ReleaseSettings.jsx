import React, { useState } from 'react'
import { Clock, Unlock, Lock, AlertCircle } from 'lucide-react'
import { SettingsCard, SettingField } from '../payment_methods_widgets/SettingsCard'

const ReleaseSettings = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState({
    autoReleaseEnabled: settings?.autoReleaseEnabled ?? true,
    defaultReleaseDays: settings?.defaultReleaseDays ?? 7,
    maxReleaseDays: settings?.maxReleaseDays ?? 30,
    minReleaseDays: settings?.minReleaseDays ?? 1,
    requireBuyerConfirmation: settings?.requireBuyerConfirmation ?? true,
    allowManualRelease: settings?.allowManualRelease ?? true,
    requireAdminApproval: settings?.requireAdminApproval ?? false,
    releaseThreshold: settings?.releaseThreshold ?? 10000,
    ...settings
  })

  const handleChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value }
    setLocalSettings(newSettings)
    onChange(newSettings)
  }

  return (
    <SettingsCard title="Release Settings">
      <div>
        <SettingField
          label="Enable Auto-Release"
          type="checkbox"
          value={localSettings.autoReleaseEnabled}
          onChange={(e) => handleChange('autoReleaseEnabled', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Default Release Period (Days)"
        type="number"
        value={localSettings.defaultReleaseDays}
        onChange={(e) => handleChange('defaultReleaseDays', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Minimum Release Period (Days)"
        type="number"
        value={localSettings.minReleaseDays}
        onChange={(e) => handleChange('minReleaseDays', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Maximum Release Period (Days)"
        type="number"
        value={localSettings.maxReleaseDays}
        onChange={(e) => handleChange('maxReleaseDays', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Require Buyer Confirmation"
          type="checkbox"
          value={localSettings.requireBuyerConfirmation}
          onChange={(e) => handleChange('requireBuyerConfirmation', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Allow Manual Release"
          type="checkbox"
          value={localSettings.allowManualRelease}
          onChange={(e) => handleChange('allowManualRelease', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Require Admin Approval for High Value (>$)"
        type="number"
        value={localSettings.releaseThreshold}
        onChange={(e) => handleChange('releaseThreshold', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Require Admin Approval for Manual Release"
          type="checkbox"
          value={localSettings.requireAdminApproval}
          onChange={(e) => handleChange('requireAdminApproval', e.target.checked)}
        />
      </div>
    </SettingsCard>
  )
}

export default ReleaseSettings

