from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "SupplyShield"
    API_V1_STR: str = "/api/v1"
    
    # DATABASE
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "supplyshield"
    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    @property
    def get_db_url(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}/{self.POSTGRES_DB}"

    # REDIS / CELERY
    REDIS_URL: str = "redis://localhost:6379/0"

    # AI
    GROQ_API_KEY: Optional[str] = None
    
    # SECURITY
    SECRET_KEY: str = "super-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
