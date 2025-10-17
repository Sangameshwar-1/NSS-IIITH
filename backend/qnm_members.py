from model_members import *
from database import get_database
import strawberry
import datetime
import pytz
from qnm_events import queries, mutations

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)

@strawberry.mutation
def addMember(member: MemberInput) -> bool:
    # Convert Strawberry input to Pydantic model, then to dict
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.model_dump()
    db = get_database()
    db["members"].insert_one(member_data)
    return True

@strawberry.mutation
def changeMember(member: MemberInput) -> bool:
    # Convert Strawberry input to Pydantic model, then to dict
    pydantic_member = member.to_pydantic()
    member_data = pydantic_member.model_dump()
    db = get_database()
    # Update by id (username) or rollNumber
    filter_query = {"id": member.id} if hasattr(member, 'id') and member.id else {"rollNumber": member.rollNumber}
    db["members"].update_one(
        filter_query,
        {"$set": member_data}
    )
    return True

@strawberry.mutation
def deleteMember(id: str) -> bool:
    """Delete a member by their username (id field)"""
    db = get_database()
    result = db["members"].delete_one({"id": id})
    return result.deleted_count > 0

@strawberry.field
def viewMembers(
    name: str = None, 
    team: list[MemberTypeEnum] = None,
    id: str = None,
    status: MemberStatusEnum = None
) -> list[Member]:
    query = {}
    
    if id:
        query["id"] = id
    if name:
        query["name"] = name
    if team:
        query["team"] = {"$in": team}
    if status:
        query["status"] = status
    
    db = get_database()
    member_dicts = list(db["members"].find(query))
    
    # Convert MongoDB documents to Member objects
    members = []
    for member_dict in member_dicts:
        member_dict.pop('_id', None)  # Remove MongoDB's _id field
        # Convert dict to MemberModel (Pydantic model)
        member_model = MemberModel(**member_dict)
        # Strawberry will automatically convert the Pydantic model
        members.append(Member.from_pydantic(member_model))
    
    return members

@strawberry.field
def getMemberByUsername(username: str) -> Member | None:
    """Get a single member by their username (id field)"""
    db = get_database()
    member_dict = db["members"].find_one({"id": username})
    if member_dict:
        member_dict.pop('_id', None)  # Remove MongoDB's _id field
        # Convert dict to MemberModel (Pydantic model)
        member_model = MemberModel(**member_dict)
        # Strawberry will automatically convert the Pydantic model
        return Member.from_pydantic(member_model)
    return None

queries+=[viewMembers, getMemberByUsername]
mutations+=[addMember, changeMember, deleteMember]