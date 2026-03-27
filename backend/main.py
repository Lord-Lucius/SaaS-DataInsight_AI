from fastapi import FastAPI


list_files: list = []

app = FastAPI()

@app.get('/')
def root():
	return {"hello": "world"}

@app.get('/health/')
def health_check():
	return {"status": "healthy"}