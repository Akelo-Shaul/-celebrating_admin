import React, { useState } from 'react'
import { DollarSign, Percent, CreditCard } from 'lucide-react'
import { SettingsCard, SettingField } from '../payment_methods_widgets/SettingsCard'

const FeeSettings = ({ settings, onChange }) => {
  const [localSettings, setLocalSettings] = useState({
    escrowFeePercentage: settings?.escrowFeePercentage ?? 1.5,
    platformFeePercentage: settings?.platformFeePercentage ?? 2.5,
    disputeFeePercentage: settings?.disputeFeePercentage ?? 5.0,
    minEscrowFee: settings?.minEscrowFee ?? 1.0,
    maxEscrowFee: settings?.maxEscrowFee ?? 100.0,
    feeChargedTo: settings?.feeChargedTo ?? 'buyer',
    processingFee: settings?.processingFee ?? 0.5,
    ...settings
  })

  const handleChange = (field, value) => {
    const newSettings = { ...localSettings, [field]: value }
    setLocalSettings(newSettings)
    onChange(newSettings)
  }

  return (
    <SettingsCard title="Fee Settings">
      <SettingField
        label="Escrow Fee (%)"
        type="number"
        value={localSettings.escrowFeePercentage}
        onChange={(e) => handleChange('escrowFeePercentage', parseFloat(e.target.value) || 0)}
      />
      
      <SettingField
        label="Platform Fee (%)"
        type="number"
        value={localSettings.platformFeePercentage}
        onChange={(e) => handleChange('platformFeePercentage', parseFloat(e.target.value) || 0)}
      />
      
      <SettingField
        label="Dispute Resolution Fee (%)"
        type="number"
        value={localSettings.disputeFeePercentage}
        onChange={(e) => handleChange('disputeFeePercentage', parseFloat(e.target.value) || 0)}
      />
      
      <SettingField
        label="Processing Fee (%)"
        type="number"
        value={localSettings.processingFee}
        onChange={(e) => handleChange('processingFee', parseFloat(e.target.value) || 0)}
      />
      
      <SettingField
        label="Minimum Escrow Fee ($)"
        type="number"
        value={localSettings.minEscrowFee}
        onChange={(e) => handleChange('minEscrowFee', parseFloat(e.target.value) || 0)}
      />
      
      <SettingField
        label="Maximum Escrow Fee ($)"
        type="number"
        value={localSettings.maxEscrowFee}
        onChange={(e) => handleChange('maxEscrowFee', parseFloat(e.target.value) || 0)}
      />
      
      <SettingField
        label="Fee Charged To"
        type="dropdown"
        value={localSettings.feeChargedTo}
        options={[
          { value: 'buyer', label: 'Buyer' },
          { value: 'seller', label: 'Seller' },
          { value: 'split', label: 'Split (50/50)' }
        ]}
        onChange={(e) => handleChange('feeChargedTo', e.target.value)}
      />
    </SettingsCard>
  )
}

export default FeeSettings

