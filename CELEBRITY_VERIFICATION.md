# Celebrity Verification System

## Overview

A 3-tier verification system for celebrities requiring approval from two social admins and one super admin before a celebrity is fully verified.

## Verification Flow

```
Pending → Social Admin 1 Verifies (70%+ profile complete) → Social Admin 2 Confirms → Super Admin Approves → Verified
```

### Step-by-Step Process

1. **Social Admin 1 Verification (Profile Completeness Check)**
   - Any social admin can initiate the verification process
   - Clicking "Verify" opens a verification modal showing:
     - Overall profile completion percentage
     - 6 category sections: Personal, Wealth, Career, Public Persona, Fun, Niche
     - Each category shows field completion status
     - Checkboxes to verify each category
   - **70% of categories must be checked** before verification is allowed
   - Celebrity must have completed sufficient profile information
   - After verification, status changes to `social_admin_1` (1/3 Verified)

2. **Social Admin 2 Confirmation (Review)**
   - A **different** social admin must confirm
   - The same social admin who did step 1 cannot confirm
   - Clicking "Confirm Verification" opens modal showing:
     - What information the celebrity has completed
     - Which categories were verified by the first admin
     - All field completion details
   - Reviews and confirms the verification
   - After confirmation, status changes to `social_admin_2` (2/3 Confirmed)

3. **Super Admin Approval (Final Review)**
   - Only super admin can perform the final approval
   - Clicking "Approve" opens modal showing:
     - Complete profile information review
     - All verified categories and fields
     - Verification history
   - Final approval granted
   - After approval, status changes to `verified` (Fully Verified)

## Where to Verify

### Verification Requests Page
- **Path:** `/verification-requests`
- **Features:**
  - Shows all pending celebrity verification requests
  - Displays verification status badges:
    - `Pending` - No verifications yet
    - `1/3 Verified` - First social admin verified
    - `2/3 Confirmed` - Second social admin confirmed
    - `Verified` - Fully verified
  - **No verify buttons on this page** - users must go to the profile
  - Eye icon button to view the celebrity's profile

### Celebrity Profile Page
- **Path:** `/profile/:userId`
- **Features:**
  - Verify button appears in the top section (next to CELEBRITY and ACTIVE badges)
  - Button text changes based on role:
    - Social Admin: "Verify" or "Confirm Verification"
    - Super Admin: "Approve"
  - Verification progress tracker shows all three steps
  - Green checkmarks indicate completed steps

## Verification Modal

### Profile Completeness Categories

The verification modal checks 6 categories of profile information:

1. **Personal Information**
   - Full Name
   - Date of Birth
   - Nationality
   - Country
   - Bio
   - Occupation

2. **Wealth Information**
   - Net Worth
   - Wealth Sources
   - Assets
   - Investments

3. **Career Information**
   - Current Role
   - Company/Organization
   - Achievements
   - Awards
   - Skills

4. **Public Persona**
   - Social Media Links
   - Website
   - Brand Collaborations
   - Public Appearances

5. **Personal Interests (Fun)**
   - Hobbies
   - Interests
   - Favorite Things
   - Pets

6. **Niche & Specialty**
   - Industry
   - Areas of Expertise
   - Certifications
   - Publications

### Modal Features

#### First Social Admin View
- Interactive checkboxes for each category
- Real-time percentage calculation
- Visual indicators:
  - Green: Category verified (checked)
  - Gray: Category not yet verified
  - Orange: Category below 50% complete
- Verify button only enabled when 70%+ categories are checked
- Each category shows:
  - Completion percentage
  - Number of completed fields
  - Individual field status (complete/incomplete)

#### Second Social Admin & Super Admin View
- Read-only view of completed information
- Checkmark icons showing category completion status
- All field details visible for review
- Approve/Confirm button always enabled (no checkbox requirement)

### Completion Calculation
- Each category is evaluated independently
- A category is considered complete if at least 50% of its fields are filled
- Overall profile completion = (completed fields / total fields) × 100
- Green badge shown if 70%+ complete
- Orange badge shown if below 70%

## Role-Based Access

### Social Admin
- Can verify unverified celebrities (must check 70%+ categories)
- Can confirm verification (must be different from first verifier)
- Cannot verify the same celebrity twice
- Cannot approve (only super admin can)
- Sees interactive verification modal with checkboxes

### Super Admin
- Cannot verify or confirm (only social admins can)
- Can only approve after both social admins have verified
- Button shows "Approve" instead of "Verify"
- Sees read-only verification modal showing all completed information

### Other Roles
- Cannot participate in verification process
- No verify buttons will appear

## Test Data

The system initializes with test data for demonstration:

### Shaul (@Shaul)
- **Status:** Pending
- **Next Action:** Any social admin can verify

### Hankue (@Hankue)
- **Status:** 1/3 Verified
- **Verified By:** Sarah Johnson (Social Admin)
- **Next Action:** Different social admin can confirm

### MaryJ (@MaryJ)
- **Status:** 2/3 Confirmed
- **Verified By:**
  - Social Admin 1: Sarah Johnson
  - Social Admin 2: John Smith
- **Next Action:** Super admin can approve

## Testing the Verification Flow

1. **Login as Social Admin 1** (`social_admin` / `social123`)
   - Go to Verification Requests
   - Click eye icon on Shaul's profile
   - Click yellow "Verify" button
   - **Verification Modal Opens:**
     - Shows overall profile completion percentage
     - Displays 6 categories with completion status
     - Check at least 5 categories (70%+ = 4.2, rounded to 5)
     - Verify button becomes enabled
   - Click "Verify" in modal
   - Modal closes, status updates to "1/3 Verified"

2. **Logout and Login as Different Social Admin** (`social_admin2` / `social123`)
   - Go to same profile
   - Click yellow "Confirm Verification" button
   - **Verification Modal Opens:**
     - Shows read-only view of completed categories
     - Displays all field details
     - Review the information
   - Click "Confirm Verification" in modal
   - Modal closes, status updates to "2/3 Confirmed"

3. **Login as Super Admin** (`super_admin` / `admin123`)
   - Go to same profile
   - Click yellow "Approve" button
   - **Verification Modal Opens:**
     - Shows complete verification review
     - Displays all completed categories and fields
     - Final review of all information
   - Click "Approve" in modal
   - Modal closes, celebrity is now fully verified!

## Visual Indicators

### Status Badges (Verification Requests Page)
- **Pending:** Gray badge
- **1/3 Verified:** Blue badge
- **2/3 Confirmed:** Yellow badge
- **Verified:** Green badge

### Progress Tracker (Profile Page)
Shows three steps with checkmarks for completed steps:
- ☐ Social Admin 1 Verification
- ☐ Social Admin 2 Confirmation
- ☐ Super Admin Approval

## Error Messages

The system provides clear error messages:
- "You have already verified this celebrity" - Same admin trying to verify twice
- "Waiting for both social admins to verify" - Super admin trying to approve too early
- "Only social admins and super admin can verify celebrities" - Other roles attempting verification
- "Another social admin has already started the verification" - Edge case handling

## Files Modified

1. **`src/services/verificationService.js`** - Core verification logic
2. **`src/pages/celebrities/VerificationRequests.jsx`** - Removed verify buttons, added status badges
3. **`src/pages/entities/UserProfile.jsx`** - Added verify button, progress tracker, and modal integration
4. **`src/components/modals/VerificationModal.jsx`** - New component for profile completeness checking and verification

## Future Enhancements

When implementing with real backend:
1. Store verification data in database
2. Send email notifications to admins at each step
3. Add verification history/audit log
4. Add ability to reject verification requests
5. Add comments/notes during verification
6. Implement verification expiration (e.g., must complete within 30 days)
