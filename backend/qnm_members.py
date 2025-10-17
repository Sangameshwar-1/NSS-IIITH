from model_members import *
from database import db
import strawberry
import datetime
import pytz
from qnm_events import queries, mutations

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)

@strawberry.mutation
def addMember(member: MemberInput) -> bool:
    member_data = member.model_dump()
    db["members"].insert_one(member_data)
    return True

@strawberry.mutation
def changeMember(member: MemberInput) -> bool:
    member_data = member.model_dump()
    # Update by id (username) or rollNumber
    filter_query = {"id": member.id} if hasattr(member, 'id') and member.id else {"rollNumber": member.rollNumber}
    db["members"].update_one(
        filter_query,
        {"$set": member_data}
    )
    return True

@strawberry.field
def viewMembers(
    name: str = None, 
    team: list[MemberTypeEnum] = None,
    id: str = None,
    status: MemberStatusEnum = None
) -> list[Member]:
    members = []
    query = {}
    
    if id:
        query["id"] = id
    if name:
        query["name"] = name
    if team:
        query["team"] = {"$in": team}
    if status:
        query["status"] = status
        
    members = list(db["members"].find(query))
    return members

@strawberry.field
def getMemberByUsername(username: str) -> Member | None:
    """Get a single member by their username (id field)"""
    member = db["members"].find_one({"id": username})
    return member if member else None

queries+=[viewMembers, getMemberByUsername]
mutations+=[addMember, changeMember]