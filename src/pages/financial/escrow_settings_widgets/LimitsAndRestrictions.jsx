import React, { useState } from 'react'
import { Lock, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { SettingsCard, SettingField } from '../payment_methods_widgets/SettingsCard'

const LimitsAndRestrictions = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState({
    minEscrowAmount: settings?.minEscrowAmount ?? 10,
    maxEscrowAmount: settings?.maxEscrowAmount ?? 100000,
    dailyEscrowLimit: settings?.dailyEscrowLimit ?? 50000,
    monthlyEscrowLimit: settings?.monthlyEscrowLimit ?? 500000,
    maxActiveEscrows: settings?.maxActiveEscrows ?? 10,
    allowMultipleEscrows: settings?.allowMultipleEscrows ?? true,
    requireApprovalOver: settings?.requireApprovalOver ?? 25000,
    restrictNewUsers: settings?.restrictNewUsers ?? true,
    newUserLimit: settings?.newUserLimit ?? 1000,
    newUserLimitDays: settings?.newUserLimitDays ?? 30,
    ...settings
  })

  const handleChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value }
    setLocalSettings(newSettings)
    onChange(newSettings)
  }

  return (
    <SettingsCard title="Limits & Restrictions">
      <SettingField
        label="Minimum Escrow Amount ($)"
        type="number"
        value={localSettings.minEscrowAmount}
        onChange={(e) => handleChange('minEscrowAmount', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Maximum Escrow Amount ($)"
        type="number"
        value={localSettings.maxEscrowAmount}
        onChange={(e) => handleChange('maxEscrowAmount', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Daily Escrow Limit per User ($)"
        type="number"
        value={localSettings.dailyEscrowLimit}
        onChange={(e) => handleChange('dailyEscrowLimit', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Monthly Escrow Limit per User ($)"
        type="number"
        value={localSettings.monthlyEscrowLimit}
        onChange={(e) => handleChange('monthlyEscrowLimit', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="Maximum Active Escrows per User"
        type="number"
        value={localSettings.maxActiveEscrows}
        onChange={(e) => handleChange('maxActiveEscrows', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Allow Multiple Active Escrows"
          type="checkbox"
          value={localSettings.allowMultipleEscrows}
          onChange={(e) => handleChange('allowMultipleEscrows', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="Require Approval for Amounts > $"
        type="number"
        value={localSettings.requireApprovalOver}
        onChange={(e) => handleChange('requireApprovalOver', parseInt(e.target.value) || 0)}
      />
      
      <div>
        <SettingField
          label="Restrict New Users"
          type="checkbox"
          value={localSettings.restrictNewUsers}
          onChange={(e) => handleChange('restrictNewUsers', e.target.checked)}
        />
      </div>
      
      <SettingField
        label="New User Escrow Limit ($)"
        type="number"
        value={localSettings.newUserLimit}
        onChange={(e) => handleChange('newUserLimit', parseInt(e.target.value) || 0)}
      />
      
      <SettingField
        label="New User Limit Period (Days)"
        type="number"
        value={localSettings.newUserLimitDays}
        onChange={(e) => handleChange('newUserLimitDays', parseInt(e.target.value) || 0)}
      />
    </SettingsCard>
  )
}

export default LimitsAndRestrictions

