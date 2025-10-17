from model_events import *
from model_members import MemberInput
from database import get_database
import strawberry
import datetime
import pytz

ist = pytz.timezone("Asia/Kolkata")
time=datetime.datetime.now(ist)

@strawberry.mutation
def addEvent(event: EventInput, head: MemberInput | None = None) -> bool:
    event_data = event.model_dump()    
    if head:
        head_data = head.model_dump()
        event_data["eventHead"] = head_data
    
    db = get_database()
    db["events"].insert_one(event_data)
    return True

@strawberry.mutation
def changeEvent(event: EventInput, head:MemberInput | None = None) -> bool:
    event_data = event.model_dump()
    if head:
        head_data = head.model_dump()
        event_data["eventHead"] = head_data
    
    db = get_database()
    result = db["events"].update_one(
        {"name": event.name},
        {"$set": event_data}
    )
    return result.modified_count > 0

@strawberry.field
def viewEvents(name: str | None = None, startTime:str | None = None, endTime:str | None = None)  -> list[EventType]:
    db = get_database()
    if name:
        events = db["events"].find({"name": name})
    elif startTime and endTime:
        events = db["events"].find({"startTime": {"$gte": startTime}, "endTime": {"$lte": endTime}})
    else:
        events = db["events"].find({})
    events = list(events)
    if not events:
        return []
    return [EventType(**event) for event in events]

queries = [viewEvents]
mutations = [addEvent, changeEvent]