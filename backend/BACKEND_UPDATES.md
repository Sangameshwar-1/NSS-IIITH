# Backend Updates for Member Profile System

## Changes Made

### 1. Updated Member Model (`model_members.py`)

Added new fields to match frontend requirements:

**New Fields:**
- `id` (str): Username in firstname.lastname format (e.g., "akshay.chanda")
- `role` (str): Member role (President, Vice President, Secretary, etc.)
- `year` (str): Academic year (1st Year, 2nd Year, 3rd Year, 4th Year)
- `department` (str): Department (CSE, ECE, etc.)
- `phone` (str): Phone number
- `linkedin` (str): LinkedIn profile URL
- `github` (str): GitHub profile URL
- `bio` (str): Member biography/description
- `achievements` (list[str]): List of achievements
- `interests` (list[str]): List of interests/skills

**Existing Fields:**
- `name` (str): Full name
- `email` (str): Email address
- `rollNumber` (str): Roll number
- `team` (MemberTypeEnum): Team type (admin, tech, design, content, logistics, volunteer)
- `status` (MemberStatusEnum): Status (active, inactive)
- `start` (str): Start year/date
- `end` (str): End year/date (null if active)
- `photoUrl` (str): Profile photo URL

### 2. Updated Queries (`qnm_members.py`)

**Enhanced `viewMembers` Query:**
- Added `id` parameter to search by username
- Added `status` parameter to filter by status
- Improved query building logic

**New `getMemberByUsername` Query:**
```graphql
query {
  getMemberByUsername(username: "akshay.chanda") {
    id
    name
    role
    email
    phone
    bio
    achievements
    interests
    linkedin
    github
    year
    department
  }
}
```

### 3. Created Seed Script (`seed_members.py`)

Run this script to populate the database with sample member data:

```bash
cd backend
python seed_members.py
```

This will insert/update 8 sample members with complete profile information.

## GraphQL Schema

### Query Members

```graphql
query {
  viewMembers {
    id
    name
    email
    role
    year
    department
    phone
    linkedin
    github
    bio
    achievements
    interests
    team
    status
    photoUrl
  }
}
```

### Query Single Member

```graphql
query {
  getMemberByUsername(username: "sangameshwar.sale") {
    id
    name
    role
    email
    bio
  }
}
```

### Add Member

```graphql
mutation {
  addMember(member: {
    id: "john.doe"
    name: "John Doe"
    email: "john.doe@students.iiit.ac.in"
    rollNumber: "2024102022"
    role: "Member"
    year: "1st Year"
    department: "CSE"
    team: VOLUNTEER
    status: ACTIVE
    phone: "+91 98765 43218"
    bio: "Passionate about technology and innovation."
    achievements: ["Participated in Hackathon 2024"]
    interests: ["Web Development", "AI/ML"]
  })
}
```

### Update Member

```graphql
mutation {
  changeMember(member: {
    id: "john.doe"
    name: "John Doe"
    bio: "Updated biography"
    achievements: ["New achievement 1", "New achievement 2"]
  })
}
```

## Frontend Integration

The frontend now uses these fields from the backend:

1. **Profile Pages** (`/member/profile/[username]`, `/me/profile/[username]`):
   - Display member information
   - Show achievements and interests
   - Show contact information (email, phone, LinkedIn, GitHub)

2. **Members List** (`/members`):
   - Display all members with their roles
   - Filter by team/status (future enhancement)

3. **Member Cards**:
   - Click to view profile at `/member/profile/[username]`
   - Hover to see social links

## Database Structure

Collection: `members`

```json
{
  "id": "akshay.chanda",
  "name": "Akshay Chanda",
  "email": "akshay.chanda@students.iiit.ac.in",
  "rollNumber": "2024102014",
  "role": "President",
  "year": "4th Year",
  "department": "CSE",
  "team": "admin",
  "status": "active",
  "start": "2022",
  "end": null,
  "photoUrl": "/favicon.ico",
  "phone": "+91 98765 43210",
  "linkedin": "https://linkedin.com/in/akshaychanda",
  "github": "https://github.com/akshaychanda",
  "bio": "Passionate about building communities and fostering innovation.",
  "achievements": [
    "Led team to win National Hackathon 2024",
    "Published research paper on AI/ML",
    "Organized 10+ technical workshops"
  ],
  "interests": [
    "Machine Learning",
    "Web Development",
    "Community Building"
  ]
}
```

## Next Steps

1. **Run the seed script** to populate the database:
   ```bash
   python seed_members.py
   ```

2. **Update frontend components** to fetch data from backend instead of using MOCK_MEMBERS

3. **Add authentication** to verify user identity for `/me/profile/[username]` routes

4. **Implement profile editing** functionality for authenticated users

5. **Add image upload** for profile photos

## Testing

You can test the GraphQL API at: `http://localhost:8000/graphql`

Example query to test:
```graphql
query {
  getMemberByUsername(username: "sangameshwar.sale") {
    id
    name
    role
    email
    phone
    bio
    achievements
    interests
  }
}
```
