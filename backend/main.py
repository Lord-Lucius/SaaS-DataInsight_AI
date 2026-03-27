from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
	return {"hello": "world"}

@app.get('/health/')
def health_check():
	return {"status": "healthy"}