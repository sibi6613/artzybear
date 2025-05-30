from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import base64


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class CommissionRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    client_email: EmailStr
    client_phone: str
    commission_type: str  # portrait, family, traditional, abstract
    subject_description: str
    size_preference: str  # small, medium, large
    budget_range: str
    deadline: Optional[str] = None
    reference_images: List[str] = []  # base64 encoded images
    additional_notes: Optional[str] = None
    status: str = "pending"  # pending, confirmed, in_progress, completed, cancelled
    price_quoted: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CommissionRequestCreate(BaseModel):
    client_name: str
    client_email: EmailStr
    client_phone: str
    commission_type: str
    subject_description: str
    size_preference: str
    budget_range: str
    deadline: Optional[str] = None
    additional_notes: Optional[str] = None

class CommissionUpdate(BaseModel):
    status: Optional[str] = None
    price_quoted: Optional[float] = None
    additional_notes: Optional[str] = None

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ArtworkPiece(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str  # portraits, traditional, abstract, landscapes
    description: str
    size: str
    medium: str
    price: float
    image_url: str
    is_available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Commission Routes
@api_router.post("/commissions", response_model=CommissionRequest)
async def create_commission_request(commission: CommissionRequestCreate):
    commission_dict = commission.dict()
    commission_obj = CommissionRequest(**commission_dict)
    result = await db.commission_requests.insert_one(commission_obj.dict())
    return commission_obj

@api_router.get("/commissions", response_model=List[CommissionRequest])
async def get_commission_requests():
    commissions = await db.commission_requests.find().to_list(1000)
    return [CommissionRequest(**commission) for commission in commissions]

@api_router.get("/commissions/{commission_id}", response_model=CommissionRequest)
async def get_commission_request(commission_id: str):
    commission = await db.commission_requests.find_one({"id": commission_id})
    if not commission:
        raise HTTPException(status_code=404, detail="Commission request not found")
    return CommissionRequest(**commission)

@api_router.put("/commissions/{commission_id}", response_model=CommissionRequest)
async def update_commission_request(commission_id: str, update: CommissionUpdate):
    update_dict = {k: v for k, v in update.dict().items() if v is not None}
    update_dict["updated_at"] = datetime.utcnow()
    
    result = await db.commission_requests.update_one(
        {"id": commission_id}, 
        {"$set": update_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Commission request not found")
    
    commission = await db.commission_requests.find_one({"id": commission_id})
    return CommissionRequest(**commission)

# File upload for commission reference images
@api_router.post("/commissions/{commission_id}/upload-images")
async def upload_reference_images(commission_id: str, files: List[UploadFile] = File(...)):
    commission = await db.commission_requests.find_one({"id": commission_id})
    if not commission:
        raise HTTPException(status_code=404, detail="Commission request not found")
    
    # Convert uploaded files to base64
    base64_images = []
    for file in files:
        content = await file.read()
        base64_image = base64.b64encode(content).decode('utf-8')
        base64_images.append(f"data:{file.content_type};base64,{base64_image}")
    
    # Update commission with reference images
    result = await db.commission_requests.update_one(
        {"id": commission_id},
        {"$push": {"reference_images": {"$each": base64_images}}}
    )
    
    return {"message": f"Uploaded {len(base64_images)} reference images successfully"}

# Contact Routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(contact: ContactMessageCreate):
    contact_dict = contact.dict()
    contact_obj = ContactMessage(**contact_dict)
    result = await db.contact_messages.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find().to_list(1000)
    return [ContactMessage(**message) for message in messages]

# Portfolio/Artwork Routes (for displaying existing pieces)
@api_router.post("/artwork", response_model=ArtworkPiece)
async def create_artwork(artwork: ArtworkPiece):
    result = await db.artwork_pieces.insert_one(artwork.dict())
    return artwork

@api_router.get("/artwork", response_model=List[ArtworkPiece])
async def get_artwork():
    artwork = await db.artwork_pieces.find({"is_available": True}).to_list(1000)
    return [ArtworkPiece(**piece) for piece in artwork]

@api_router.get("/artwork/{category}")
async def get_artwork_by_category(category: str):
    artwork = await db.artwork_pieces.find({"category": category, "is_available": True}).to_list(1000)
    return [ArtworkPiece(**piece) for piece in artwork]

# Basic routes
@api_router.get("/")
async def root():
    return {"message": "Art Portfolio API"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
