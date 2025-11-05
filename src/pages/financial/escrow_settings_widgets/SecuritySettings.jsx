import React, { useState } from 'react'
import { Shield, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import { SettingsCard, SettingField } from '../payment_methods_widgets/SettingsCard'

const SecuritySettings = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState({
    requireVerification: settings?.requireVerification ?? true,
    requireIdentityVerification: settings?.requireIdentityVerification ?? false,
    holdPeriodDays: settings?.holdPeriodDays ?? 0,
    enableFraudDetection: settings?.enableFraudDetection ?? true,
    autoFreezeSuspicious: settings?.autoFreezeSuspicious ?? true,
    requireKYC: settings?.requireKYC ?? false,
    kycThreshold: settings?.kycThreshold ?? 10000,
    enableRiskScoring: settings?.enableRiskScoring ?? true,
    ...settings
  })

  const handleChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value }
    setLocalSettings(newSettings)
    onChange(newSettings)
  }

  return (
    <SettingsCard title="Security Settings">
      <div>
        <SettingField
          label="Require Account Verification"
          type="checkbox"
          value={localSettings.requireVerification}
          onChange={(e) => handleChange('requireVerification', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Require Identity Verification"
          type="checkbox"
          value={localSettings.requireIdentityVerification}
          onChange={(e) => handleChange('requireIdentityVerification', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Require KYC for Amounts > $"
        type="number"
        value={localSettings.kycThreshold}
        onChange={(e) => handleChange('kycThreshold', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Require KYC"
          type="checkbox"
          value={localSettings.requireKYC}
          onChange={(e) => handleChange('requireKYC', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Hold Period After Release (Days)"
        type="number"
        value={localSettings.holdPeriodDays}
        onChange={(e) => handleChange('holdPeriodDays', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Enable Fraud Detection"
          type="checkbox"
          value={localSettings.enableFraudDetection}
          onChange={(e) => handleChange('enableFraudDetection', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Auto-Freeze Suspicious Accounts"
          type="checkbox"
          value={localSettings.autoFreezeSuspicious}
          onChange={(e) => handleChange('autoFreezeSuspicious', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Enable Risk Scoring"
          type="checkbox"
          value={localSettings.enableRiskScoring}
          onChange={(e) => handleChange('enableRiskScoring', e.target.checked)}
        />
      </div>
    </SettingsCard>
  )
}

export default SecuritySettings

