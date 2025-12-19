import React, { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

// Calculate profile completeness for each category
const calculateCategoryCompleteness = (profile) => {
  const categories = {
    personal: {
      label: 'Personal Information',
      fields: [
        { key: 'name', label: 'Full Name', value: profile.name },
        { key: 'dob', label: 'Date of Birth', value: profile.dob },
        { key: 'nationality', label: 'Nationality', value: profile.nationality },
        { key: 'country', label: 'Country', value: profile.country },
        { key: 'bio', label: 'Bio', value: profile.bio },
        { key: 'occupation', label: 'Occupation', value: profile.occupation }
      ]
    },
    wealth: {
      label: 'Wealth Information',
      fields: [
        { key: 'netWorth', label: 'Net Worth', value: profile.netWorth },
        { key: 'sources', label: 'Wealth Sources', value: profile.wealthSources?.length > 0 },
        { key: 'assets', label: 'Assets', value: profile.assets?.length > 0 },
        { key: 'investments', label: 'Investments', value: profile.investments?.length > 0 }
      ]
    },
    career: {
      label: 'Career Information',
      fields: [
        { key: 'currentRole', label: 'Current Role', value: profile.currentRole },
        { key: 'company', label: 'Company/Organization', value: profile.company },
        { key: 'achievements', label: 'Achievements', value: profile.achievements?.length > 0 },
        { key: 'awards', label: 'Awards', value: profile.awards?.length > 0 },
        { key: 'skills', label: 'Skills', value: profile.skills?.length > 0 }
      ]
    },
    publicPersona: {
      label: 'Public Persona',
      fields: [
        { key: 'socialMedia', label: 'Social Media Links', value: profile.socialMedia?.length > 0 },
        { key: 'website', label: 'Website', value: profile.website },
        { key: 'brands', label: 'Brand Collaborations', value: profile.brands?.length > 0 },
        { key: 'publicAppearances', label: 'Public Appearances', value: profile.publicAppearances?.length > 0 }
      ]
    },
    fun: {
      label: 'Personal Interests',
      fields: [
        { key: 'hobbies', label: 'Hobbies', value: profile.hobbies?.length > 0 },
        { key: 'interests', label: 'Interests', value: profile.interests?.length > 0 },
        { key: 'favoriteThings', label: 'Favorite Things', value: profile.favoriteThings?.length > 0 },
        { key: 'pets', label: 'Pets', value: profile.pets?.length > 0 }
      ]
    },
    niche: {
      label: 'Niche & Specialty',
      fields: [
        { key: 'industry', label: 'Industry', value: profile.industry },
        { key: 'expertise', label: 'Areas of Expertise', value: profile.expertise?.length > 0 },
        { key: 'certifications', label: 'Certifications', value: profile.certifications?.length > 0 },
        { key: 'publications', label: 'Publications', value: profile.publications?.length > 0 }
      ]
    }
  }

  // Calculate completion for each category
  const categoryCompletion = {}
  let totalFields = 0
  let completedFields = 0

  Object.keys(categories).forEach((categoryKey) => {
    const category = categories[categoryKey]
    const completed = category.fields.filter(field => {
      if (typeof field.value === 'boolean') return field.value
      return field.value && field.value !== '' && field.value !== null && field.value !== undefined
    })

    categoryCompletion[categoryKey] = {
      ...category,
      completed: completed.length,
      total: category.fields.length,
      percentage: Math.round((completed.length / category.fields.length) * 100),
      isComplete: completed.length >= Math.ceil(category.fields.length * 0.5) // At least 50% of category
    }

    totalFields += category.fields.length
    completedFields += completed.length
  })

  const overallPercentage = Math.round((completedFields / totalFields) * 100)

  return {
    categories: categoryCompletion,
    overallPercentage,
    totalFields,
    completedFields,
    meetsRequirement: overallPercentage >= 70
  }
}

const VerificationModal = ({
  isOpen,
  onClose,
  profile,
  userRole,
  verificationStatus,
  onVerify
}) => {
  const [checkedCategories, setCheckedCategories] = useState({})
  const [completionData, setCompletionData] = useState(null)

  useEffect(() => {
    if (isOpen && profile) {
      const data = calculateCategoryCompleteness(profile)
      setCompletionData(data)

      // For first social admin, initialize checkboxes based on actual completion
      if (userRole === 'social_admin' && verificationStatus === 'pending') {
        const initialChecked = {}
        Object.keys(data.categories).forEach((key) => {
          initialChecked[key] = data.categories[key].isComplete
        })
        setCheckedCategories(initialChecked)
      }
    }
  }, [isOpen, profile, userRole, verificationStatus])

  if (!isOpen || !completionData) return null

  const isFirstSocialAdmin = userRole === 'social_admin' && verificationStatus === 'pending'
  const isSecondSocialAdmin = userRole === 'social_admin' && verificationStatus === 'social_admin_1'
  const isSuperAdmin = userRole === 'super_admin' && verificationStatus === 'social_admin_2'

  // Calculate checked percentage for first social admin
  const checkedCount = Object.values(checkedCategories).filter(Boolean).length
  const totalCategories = Object.keys(completionData.categories).length
  const checkedPercentage = Math.round((checkedCount / totalCategories) * 100)
  const canVerify = checkedPercentage >= 70

  const handleCategoryToggle = (categoryKey) => {
    if (isFirstSocialAdmin) {
      setCheckedCategories(prev => ({
        ...prev,
        [categoryKey]: !prev[categoryKey]
      }))
    }
  }

  const handleVerify = () => {
    if (isFirstSocialAdmin && !canVerify) {
      alert('At least 70% of categories must be verified before proceeding.')
      return
    }
    onVerify()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isFirstSocialAdmin && 'Verify Profile Completeness'}
              {isSecondSocialAdmin && 'Confirm Verification'}
              {isSuperAdmin && 'Final Approval'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isFirstSocialAdmin && 'Check that the celebrity has completed at least 70% of their profile'}
              {isSecondSocialAdmin && 'Review the verified information and confirm'}
              {isSuperAdmin && 'Review all verified information and give final approval'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Overall Completion Status */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Profile Completion</span>
              <span className={`text-2xl font-bold ${completionData.meetsRequirement ? 'text-green-600' : 'text-orange-600'}`}>
                {completionData.overallPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  completionData.meetsRequirement
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}
                style={{ width: `${completionData.overallPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {completionData.meetsRequirement ? (
                <>
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-xs text-green-700">Meets verification requirement (70%+)</span>
                </>
              ) : (
                <>
                  <AlertCircle size={16} className="text-orange-600" />
                  <span className="text-xs text-orange-700">Below verification requirement (needs 70%+)</span>
                </>
              )}
            </div>
          </div>

          {/* First Social Admin - Verification Checkboxes */}
          {isFirstSocialAdmin && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Verify Categories</h3>
                <span className={`text-sm font-medium ${canVerify ? 'text-green-600' : 'text-orange-600'}`}>
                  {checkedCount}/{totalCategories} verified ({checkedPercentage}%)
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Check each category to confirm the celebrity has provided sufficient information. At least 70% must be verified.
              </p>
            </div>
          )}

          {/* Category List */}
          <div className="space-y-3">
            {Object.keys(completionData.categories).map((categoryKey) => {
              const category = completionData.categories[categoryKey]
              const isChecked = checkedCategories[categoryKey]

              return (
                <div
                  key={categoryKey}
                  className={`border rounded-lg p-4 transition-all ${
                    isFirstSocialAdmin
                      ? 'cursor-pointer hover:border-blue-400 hover:shadow-sm'
                      : 'cursor-default'
                  } ${
                    isChecked
                      ? 'border-green-400 bg-green-50'
                      : category.isComplete
                        ? 'border-gray-300 bg-white'
                        : 'border-orange-300 bg-orange-50'
                  }`}
                  onClick={() => handleCategoryToggle(categoryKey)}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox for first social admin */}
                    {isFirstSocialAdmin && (
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isChecked
                            ? 'bg-green-500 border-green-500'
                            : 'bg-white border-gray-300'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Status icon for other admins */}
                    {!isFirstSocialAdmin && (
                      <div className="flex-shrink-0 mt-1">
                        {category.isComplete ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <AlertCircle size={20} className="text-orange-600" />
                        )}
                      </div>
                    )}

                    {/* Category Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">{category.label}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          category.percentage >= 70
                            ? 'bg-green-100 text-green-700'
                            : category.percentage >= 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}>
                          {category.completed}/{category.total} fields ({category.percentage}%)
                        </span>
                      </div>

                      {/* Field Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.fields.map((field) => {
                          const isFieldComplete = typeof field.value === 'boolean'
                            ? field.value
                            : field.value && field.value !== '' && field.value !== null && field.value !== undefined

                          return (
                            <div key={field.key} className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                isFieldComplete ? 'bg-green-500' : 'bg-gray-300'
                              }`}></div>
                              <span className={`text-xs ${
                                isFieldComplete ? 'text-gray-700' : 'text-gray-400'
                              }`}>
                                {field.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            disabled={isFirstSocialAdmin && !canVerify}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isFirstSocialAdmin && !canVerify
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-md hover:shadow-lg'
            }`}
          >
            {isFirstSocialAdmin && 'Verify'}
            {isSecondSocialAdmin && 'Confirm Verification'}
            {isSuperAdmin && 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationModal
