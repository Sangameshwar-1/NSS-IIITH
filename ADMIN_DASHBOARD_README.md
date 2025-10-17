# Admin Dashboard Documentation

## Overview

The admin dashboard provides a web interface for managing the NSS IIITH database directly from the website. Admins can perform full CRUD (Create, Read, Update, Delete) operations on members and events.

## Access

**URL**: `http://localhost:3000/admin`

**Requirements**:
- Must be logged in via CAS authentication
- User's `team` field in database must be set to `ADMIN`

If a non-admin user tries to access the dashboard, they will see an "Access Denied" message.

## Features

### Members Management

#### View Members
- Grid view of all members with cards showing key information
- Search by name, username, or email
- Filter by team (ADMIN, TECH, DESIGN, CONTENT, LOGISTICS, VOLUNTEER)
- Shows member count

#### Add Member
- Click "➕ Add Member" button
- Fill in required fields:
  - Username (ID) - format: firstname.lastname
  - Name
  - Email
  - Team
  - Status (ACTIVE/INACTIVE)
- Optional fields:
  - Roll Number
  - Role (President, Vice President, etc.)
  - Year
  - Department
  - Phone
  - LinkedIn URL
  - GitHub URL
  - Photo URL
  - Bio

#### Edit Member
- Click "✏️ Edit" on any member card
- Modify any fields
- Save changes

#### Delete Member
- Click "🗑️ Delete" on any member card
- Confirm deletion
- Member is permanently removed from database

### Events Management

#### View Events
- List view of all events with full details
- Search by event name or location
- Shows event count

#### Add Event
- Click "➕ Add Event" button
- Fill in required fields:
  - Event Name
  - Location
  - Start Time (datetime)
  - End Time (datetime)
- Optional fields:
  - Description

#### Edit Event
- Click "✏️ Edit" on any event
- Modify any fields
- Save changes

#### Delete Event
- Click "🗑️ Delete" on any event
- Confirm deletion
- Event is permanently removed from database

## Backend Mutations

### Members

**Add Member**
```graphql
mutation AddMember($member: MemberInput!) {
  addMember(member: $member)
}
```

**Update Member**
```graphql
mutation ChangeMember($member: MemberInput!) {
  changeMember(member: $member)
}
```

**Delete Member**
```graphql
mutation DeleteMember($id: String!) {
  deleteMember(id: $id)
}
```

### Events

**Add Event**
```graphql
mutation AddEvent($event: EventInput!, $head: MemberInput) {
  addEvent(event: $event, head: $head)
}
```

**Update Event**
```graphql
mutation ChangeEvent($event: EventInput!, $head: MemberInput) {
  changeEvent(event: $event, head: $head)
}
```

**Delete Event**
```graphql
mutation DeleteEvent($name: String!) {
  deleteEvent(name: $name)
}
```

## File Structure

```
frontend/
  src/
    app/
      admin/
        page.tsx              # Admin dashboard UI
    graphql_Q&M/
      admin.ts                # GraphQL operations for admin

backend/
  qnm_members.py              # Member queries and mutations
  qnm_events.py               # Event queries and mutations
  model_members.py            # Member data model
  model_events.py             # Event data model
```

## Security Considerations

1. **Authentication**: Users must be logged in via CAS
2. **Authorization**: Only users with `team: "ADMIN"` can access the dashboard
3. **No JWT tokens**: Currently using simple cookie-based authentication
4. **Frontend validation**: Form validation ensures required fields are filled
5. **Backend validation**: GraphQL schema enforces type safety

## Improvements for Production

Consider implementing:

1. **Enhanced Security**
   - JWT tokens with expiration
   - Role-based access control (RBAC)
   - Audit logs for all changes
   - Rate limiting on mutations

2. **Better UX**
   - Confirmation dialogs with undo option
   - Bulk operations (delete multiple, import CSV)
   - Image upload for member photos
   - Rich text editor for descriptions
   - Data validation with better error messages

3. **Advanced Features**
   - Activity history/changelog
   - Backup/restore database
   - Export data to CSV/JSON
   - Analytics dashboard
   - Email notifications for changes

## Usage Example

1. **Login as admin**:
   - Go to `http://localhost:3000`
   - Click "Login" and authenticate with CAS
   - Ensure your user has `team: "ADMIN"` in database

2. **Add a new member**:
   - Hover over profile icon → click "🛠️ Admin Dashboard"
   - Click "👥 Members" tab
   - Click "➕ Add Member"
   - Fill in the form
   - Click "💾 Save"

3. **Update an event**:
   - Click "📅 Events" tab
   - Find the event to update
   - Click "✏️ Edit"
   - Modify fields
   - Click "💾 Save"

## Troubleshooting

**Issue**: "Access Denied" message
- **Solution**: Ensure your user's `team` field is set to `ADMIN` in MongoDB

**Issue**: Changes not saving
- **Solution**: Check browser console for GraphQL errors. Verify backend is running.

**Issue**: Cannot access admin dashboard
- **Solution**: Ensure you're logged in. Check cookie `uid` is set.

**Issue**: GraphQL errors
- **Solution**: Verify all required fields are filled. Check data types match schema.

## Quick Access

From navbar profile dropdown menu:
- Login → Hover over profile icon → Click "🛠️ Admin Dashboard"

Direct URL:
- `http://localhost:3000/admin`
