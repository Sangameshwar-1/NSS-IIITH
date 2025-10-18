# 📅 Members Page - Date-Based Sorting Feature

## Overview

The members page now automatically sorts members into **Present Members** and **Past Members** based on their start and end dates, providing a clear timeline of NSS team evolution.

## How It Works

### Automatic Classification

**Present Members:**
- Members with no end date
- Members with end date = "_" 
- Members with end date = "present"
- Members whose end year is >= current year

**Past Members:**
- Members whose end year < current year

### Sorting Logic

**Present Members:**
- Grouped by **Team** (Admin, Tech, Design, Content, Logistics, Volunteer)
- Sorted by **Start Date** (newest first within each team)
- Shows when they joined NSS

**Past Members:**
- Grouped by **End Year** (graduation/leaving year)
- Sorted by **End Date** (most recent first)
- Displays as "2024", "2023", etc.

### Date Display Format

On member cards:
- **Current members**: `"2024 - present"`
- **Past members**: `"2021 - 2024"`

## Admin Dashboard - Managing Dates

### Adding/Editing Members

When you add or edit a member in the admin dashboard:

1. **Start Date** field:
   - Enter the year they joined NSS
   - Example: `2024`, `2023`, etc.
   - Shows on card as the "from" year

2. **End Date** field:
   - For **current members**: enter `_` or `present` or leave empty
   - For **past members**: enter the year they left
   - Example: `2025`, `2024`, etc.

### Example Scenarios

#### Current Member (Still Active)
```
Name: John Doe
Team: Tech
Start Date: 2024
End Date: _
Status: ACTIVE

Result: Shows under "CURRENT MEMBERS" → "Tech" section
Display: "2024 - present"
```

#### Past Member (Graduated)
```
Name: Jane Smith
Team: Design
Start Date: 2021
End Date: 2024
Status: INACTIVE

Result: Shows under "PAST MEMBERS" → "2024" section
Display: "2021 - 2024"
```

## Database Fields

The member model includes:
- `start` (string): Year they joined (e.g., "2024")
- `end` (string): Year they left or "_" for current members

## Visual Organization

```
CURRENT MEMBERS
├── Admin Team (sorted by start date, newest first)
│   ├── Member A (2025 - present)
│   └── Member B (2024 - present)
├── Tech Team
│   ├── Member C (2024 - present)
│   └── Member D (2023 - present)
└── Design Team
    └── Member E (2024 - present)

PAST MEMBERS
├── 2024 Batch (sorted by start date)
│   ├── Member F (2021 - 2024)
│   └── Member G (2022 - 2024)
├── 2023 Batch
│   └── Member H (2020 - 2023)
└── 2022 Batch
    └── Member I (2019 - 2022)
```

## Benefits

1. **Clear Timeline**: Easy to see who worked when
2. **Alumni Recognition**: Past members are organized by graduation year
3. **Team Evolution**: Track how teams have grown over time
4. **Automatic Updates**: As years pass, members automatically move to past if their end date has passed
5. **Flexible Format**: Support for various date formats ("_", "present", year numbers)

## Code Implementation

### Key Functions

**`isCurrentMember(member)`**
```typescript
const isCurrentMember = (member: Member) => {
  if (!member.to || member.to === "_" || member.to.toLowerCase() === "present") {
    return true;
  }
  const endYear = parseInt(member.to);
  return !isNaN(endYear) && endYear >= currentYear;
};
```

**Sorting Present Members**
```typescript
presentMembers.sort((a, b) => {
  const yearA = parseInt(a.from) || 0;
  const yearB = parseInt(b.from) || 0;
  return yearB - yearA; // Newest first
});
```

**Sorting Past Members**
```typescript
pastMembers.sort((a, b) => {
  const yearA = parseInt(a.to) || 0;
  const yearB = parseInt(b.to) || 0;
  return yearB - yearA; // Most recent first
});
```

## Usage Examples

### For Admin: Adding a New Current Member

1. Go to Admin Dashboard
2. Click "Add Member"
3. Fill in details:
   - Name: "Akash Kumar"
   - Team: TECH
   - Status: ACTIVE
   - **Start Date: 2024**
   - **End Date: _**
4. Save

Result: Member appears under "CURRENT MEMBERS" → "Tech" section with "2024 - present"

### For Admin: Marking a Member as Past

1. Find the member in Admin Dashboard
2. Click "Edit"
3. Change:
   - Status: INACTIVE
   - **End Date: 2024** (their last year)
4. Save

Result: Member moves to "PAST MEMBERS" → "2024" section with "2021 - 2024"

### For Admin: Updating Dates

1. Edit member
2. Update Start Date or End Date as needed
3. Save

Result: Member automatically re-sorts to correct section

## Best Practices

1. **Always include start dates** for proper sorting
2. **Use consistent format** for dates (just year: "2024")
3. **Use "_" for current members** to indicate ongoing tenure
4. **Update end dates** when members leave or graduate
5. **Keep status in sync** with dates:
   - ACTIVE + end date "_" = current member
   - INACTIVE + end date "2024" = past member

## Troubleshooting

**Member not showing in correct section?**
- Check their end date: should be "_" for current, year number for past
- Verify status field: ACTIVE for current, INACTIVE for past

**Dates not displaying correctly?**
- Ensure dates are stored as strings in format "YYYY"
- Check for typos in end date ("_" not "-")

**Sort order incorrect?**
- Make sure start/end dates are valid year numbers
- Empty dates default to 0 and sort to bottom

## Future Enhancements

Potential improvements:
- Full date support (MM/YYYY) for more precise sorting
- Date validation in admin form
- Automatic status updates based on dates
- Tenure duration calculation
- Year range filters in search
- Export members by year/batch
