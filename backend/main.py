from fastapi import FastAPI, HTTPException
from models.models import PostCreate

app = FastAPI()

text_posts = {
    1: {
        "title": "New Post",
        "content": "Test of id post"
    },
    2: {
		"title": "Second New Post",
		"content": "This second new post is made to tryout"
	},
    3: {
		"title": "Third New Post",
		"content": "This Third new post is made to tryout"
	},
    4: {
		"title": "Fourth New Post",
		"content": "This Fourth new post is made to tryout"
	},
    5: {
		"title": "Fifth New Post",
		"content": "This Fifth new post is made to tryout"
	},
    6: {
		"title": "Sixth New Post",
		"content": "This Sixth new post is made to tryout"
	}
}

@app.get("/posts")
def get_all_posts(limit: int = 10):
    if limit:
        return list(text_posts.values())[:limit]
    return text_posts

@app.get("/posts/{id}")
def get_post(id: int):
    if id not in text_posts:
        raise HTTPException(status_code=404, detail="Post not found")
    return text_posts.get(id)

@app.post("/create-post")
def create_post(post: PostCreate):
	new_post = {"title": post.title, "content": post.content}
	text_posts[max(text_posts.keys()) + 1] = new_post
	return new_post
