// Celebrity Verification Service
// Implements a 3-tier verification system:
// 1. First Social Admin verifies
// 2. Second Social Admin confirms
// 3. Super Admin approves

// Mock verification data storage (in production, this would be in a database)
let verifications = {
  // userId: {
  //   status: 'pending' | 'social_admin_1' | 'social_admin_2' | 'verified',
  //   verifiedBy: {
  //     socialAdmin1: { id, name, timestamp },
  //     socialAdmin2: { id, name, timestamp },
  //     superAdmin: { id, name, timestamp }
  //   }
  // }
}

// Get verification status for a celebrity
export const getVerificationStatus = (userId) => {
  if (!verifications[userId]) {
    return {
      status: 'pending',
      verifiedBy: {},
      canVerify: true
    }
  }
  return verifications[userId]
}

// Check if user can verify based on their role and current verification status
export const canUserVerify = (userId, currentUser) => {
  const verification = getVerificationStatus(userId)

  if (!currentUser) return { canVerify: false, reason: 'Not authenticated' }

  // If already fully verified, no one can verify again
  if (verification.status === 'verified') {
    return { canVerify: false, reason: 'Already fully verified' }
  }

  const { role, id: currentUserId } = currentUser

  // Super Admin can only approve after both social admins have verified
  if (role === 'super_admin') {
    if (verification.status === 'social_admin_2') {
      return { canVerify: true, action: 'approve', buttonText: 'Approve' }
    }
    return { canVerify: false, reason: 'Waiting for both social admins to verify' }
  }

  // Social Admin verification logic
  if (role === 'social_admin') {
    // Check if this admin has already verified
    if (verification.verifiedBy?.socialAdmin1?.id === currentUserId ||
        verification.verifiedBy?.socialAdmin2?.id === currentUserId) {
      return { canVerify: false, reason: 'You have already verified this celebrity' }
    }

    // First social admin can verify
    if (verification.status === 'pending' || !verification.verifiedBy?.socialAdmin1) {
      return { canVerify: true, action: 'verify', buttonText: 'Verify' }
    }

    // Second social admin can verify (must be different from first)
    if (verification.status === 'social_admin_1' &&
        verification.verifiedBy?.socialAdmin1?.id !== currentUserId) {
      return { canVerify: true, action: 'confirm', buttonText: 'Confirm Verification' }
    }

    return { canVerify: false, reason: 'Another social admin has already started the verification' }
  }

  // Other roles cannot verify
  return { canVerify: false, reason: 'Only social admins and super admin can verify celebrities' }
}

// Perform verification
export const verifyCelebrity = async (userId, currentUser) => {
  const canVerifyResult = canUserVerify(userId, currentUser)

  if (!canVerifyResult.canVerify) {
    throw new Error(canVerifyResult.reason)
  }

  const verification = getVerificationStatus(userId)
  const timestamp = new Date().toISOString()

  if (currentUser.role === 'social_admin') {
    // First social admin verification
    if (!verification.verifiedBy?.socialAdmin1) {
      verifications[userId] = {
        status: 'social_admin_1',
        verifiedBy: {
          ...verification.verifiedBy,
          socialAdmin1: {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            timestamp
          }
        }
      }
      return {
        success: true,
        message: 'First verification completed. Waiting for confirmation from another social admin.',
        newStatus: 'social_admin_1'
      }
    }

    // Second social admin confirmation
    if (verification.status === 'social_admin_1') {
      verifications[userId] = {
        status: 'social_admin_2',
        verifiedBy: {
          ...verification.verifiedBy,
          socialAdmin2: {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            timestamp
          }
        }
      }
      return {
        success: true,
        message: 'Second verification completed. Waiting for super admin approval.',
        newStatus: 'social_admin_2'
      }
    }
  }

  // Super admin approval
  if (currentUser.role === 'super_admin' && verification.status === 'social_admin_2') {
    verifications[userId] = {
      status: 'verified',
      verifiedBy: {
        ...verification.verifiedBy,
        superAdmin: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          timestamp
        }
      }
    }
    return {
      success: true,
      message: 'Celebrity verification completed successfully!',
      newStatus: 'verified'
    }
  }

  throw new Error('Verification failed')
}

// Get verification progress message
export const getVerificationProgress = (userId) => {
  const verification = getVerificationStatus(userId)

  switch (verification.status) {
    case 'pending':
      return 'Not verified - Awaiting first social admin verification'
    case 'social_admin_1':
      return `First verification by ${verification.verifiedBy?.socialAdmin1?.name} - Awaiting second social admin confirmation`
    case 'social_admin_2':
      return `Confirmed by two social admins - Awaiting super admin approval`
    case 'verified':
      return 'Fully verified'
    default:
      return 'Status unknown'
  }
}

// Get verification details for display
export const getVerificationDetails = (userId) => {
  const verification = getVerificationStatus(userId)

  return {
    status: verification.status || 'pending',
    progress: getVerificationProgress(userId),
    verifiedBy: verification.verifiedBy || {},
    steps: [
      {
        title: 'Social Admin 1 Verification',
        completed: !!verification.verifiedBy?.socialAdmin1,
        verifier: verification.verifiedBy?.socialAdmin1
      },
      {
        title: 'Social Admin 2 Confirmation',
        completed: !!verification.verifiedBy?.socialAdmin2,
        verifier: verification.verifiedBy?.socialAdmin2
      },
      {
        title: 'Super Admin Approval',
        completed: !!verification.verifiedBy?.superAdmin,
        verifier: verification.verifiedBy?.superAdmin
      }
    ]
  }
}

// Reset verification (for testing purposes)
export const resetVerification = (userId) => {
  delete verifications[userId]
  return { success: true, message: 'Verification reset successfully' }
}

// Initialize some test data
export const initializeTestData = () => {
  verifications = {
    'Shaul': {
      status: 'pending',
      verifiedBy: {}
    },
    'Hankue': {
      status: 'social_admin_1',
      verifiedBy: {
        socialAdmin1: {
          id: 'ADM-2045',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          timestamp: new Date().toISOString()
        }
      }
    },
    'MaryJ': {
      status: 'social_admin_2',
      verifiedBy: {
        socialAdmin1: {
          id: 'ADM-2045',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        socialAdmin2: {
          id: 'ADM-2046',
          name: 'John Smith',
          email: 'john.smith@example.com',
          timestamp: new Date().toISOString()
        }
      }
    }
  }
}

// Initialize test data on module load
initializeTestData()
