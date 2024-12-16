from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import MarianMTModel, MarianTokenizer

app = FastAPI()

# Enable CORS for all origins (you can restrict this to your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or replace "*" with a specific domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize the translation model and tokenizer
model_name = "Helsinki-NLP/opus-mt-en-es"  # Example: English to Spanish translation model
model = MarianMTModel.from_pretrained(model_name)
tokenizer = MarianTokenizer.from_pretrained(model_name)

@app.post("/translate")
async def translate(text: str):
    """Endpoint to translate text using the pre-trained model"""
    # Encode the input text
    inputs = tokenizer(text, return_tensors="pt", padding=True)
    
    # Generate translation
    translated = model.generate(**inputs)
    
    # Decode the translation
    translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)
    
    return {"translated_text": translated_text}
