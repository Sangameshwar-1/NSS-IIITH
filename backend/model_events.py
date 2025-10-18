import strawberry
from pydantic import BaseModel, ConfigDict
from model_members import MemberModel

class EventModel(BaseModel):
    model_config = ConfigDict(extra='ignore')
    
    name: str
    startTime: str
    endTime: str
    location: str
    description: str | None = None
    eventHead: MemberModel | None = None

@strawberry.experimental.pydantic.type(model=EventModel, all_fields=True)
class EventType:
    pass

@strawberry.experimental.pydantic.input(model=EventModel, fields=["name", "startTime", "endTime", "location", "description"])
class EventInput:
    pass