import strawberry
from pydantic import BaseModel
from enum import Enum

@strawberry.enum
class MemberTypeEnum(str, Enum):
    ADMIN = "admin"
    TECH = "tech"
    DESIGN = "design"
    CONTENT = "content"
    LOGISTICS = "logistics"
    VOLUNTEER = "volunteer"

@strawberry.enum
class MemberStatusEnum(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class MemberModel(BaseModel):
    id: str  # username in firstname.lastname format
    name: str
    email: str
    rollNumber: str | None = None
    role: str | None = None  # President, Vice President, Secretary, etc.
    year: str | None = None  # 1st Year, 2nd Year, 3rd Year, 4th Year
    department: str | None = None  # CSE, ECE, etc.
    team: MemberTypeEnum
    status: MemberStatusEnum
    start: str | None = None  # renamed from 'start' to match 'from' in frontend
    end: str | None = None  # renamed from 'end' to match 'to' in frontend
    photoUrl: str | None = None
    phone: str | None = None
    linkedin: str | None = None
    github: str | None = None
    bio: str | None = None
    achievements: list[str] | None = None
    interests: list[str] | None = None


@strawberry.experimental.pydantic.type(model=MemberModel, all_fields=True)
class Member:
    pass

@strawberry.experimental.pydantic.input(model=MemberModel, fields=[
    "id",
    "name",
    "email",
    "rollNumber",
    "role",
    "year",
    "department",
    "team",
    "status",
    "start",
    "end",
    "photoUrl",
    "phone",
    "linkedin",
    "github",
    "bio",
    "achievements",
    "interests"
])
class MemberInput:
    pass