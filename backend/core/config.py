from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SaaS-DataInsight-AI"
    APP_VERSION: str = "0.1.0"
    DATABASE_URL: str = "postgresql://user:password@db:5432/saas_db"
    MAX_FILE_SIZE_MB: int = 5

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
