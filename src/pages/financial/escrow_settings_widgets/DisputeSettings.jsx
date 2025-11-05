import React, { useState } from 'react'
import { AlertTriangle, Clock, Gavel, MessageCircle } from 'lucide-react'
import { SettingsCard, SettingField } from '../payment_methods_widgets/SettingsCard'

const DisputeSettings = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState({
    disputeWindowDays: settings?.disputeWindowDays ?? 7,
    evidenceSubmissionDays: settings?.evidenceSubmissionDays ?? 3,
    adminResponseDays: settings?.adminResponseDays ?? 2,
    autoEscalateDays: settings?.autoEscalateDays ?? 5,
    allowBuyerDisputes: settings?.allowBuyerDisputes ?? true,
    allowSellerDisputes: settings?.allowSellerDisputes ?? true,
    requireEvidence: settings?.requireEvidence ?? true,
    enableMediation: settings?.enableMediation ?? true,
    maxDisputeAmount: settings?.maxDisputeAmount ?? 100000,
    ...settings
  })

  const handleChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value }
    setLocalSettings(newSettings)
    onChange(newSettings)
  }

  return (
    <SettingsCard title="Dispute Settings">
      <SettingField
        label="Dispute Window (Days after release)"
        type="number"
        value={localSettings.disputeWindowDays}
        onChange={(e) => handleChange('disputeWindowDays', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Evidence Submission Period (Days)"
        type="number"
        value={localSettings.evidenceSubmissionDays}
        onChange={(e) => handleChange('evidenceSubmissionDays', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Admin Response Time (Days)"
        type="number"
        value={localSettings.adminResponseDays}
        onChange={(e) => handleChange('adminResponseDays', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Auto-Escalate After (Days)"
        type="number"
        value={localSettings.autoEscalateDays}
        onChange={(e) => handleChange('autoEscalateDays', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Allow Buyer Disputes"
          type="checkbox"
          value={localSettings.allowBuyerDisputes}
          onChange={(e) => handleChange('allowBuyerDisputes', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Allow Seller Disputes"
          type="checkbox"
          value={localSettings.allowSellerDisputes}
          onChange={(e) => handleChange('allowSellerDisputes', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Require Evidence for Disputes"
          type="checkbox"
          value={localSettings.requireEvidence}
          onChange={(e) => handleChange('requireEvidence', e.target.checked)}
        />
      </div>
      
      <div>
        <SettingField
          label="Enable Mediation"
          type="checkbox"
          value={localSettings.enableMediation}
          onChange={(e) => handleChange('enableMediation', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Maximum Dispute Amount ($)"
        type="number"
        value={localSettings.maxDisputeAmount}
        onChange={(e) => handleChange('maxDisputeAmount', parseInt(e.target.value) || 0)}
      />
    </SettingsCard>
  )
}

export default DisputeSettings

