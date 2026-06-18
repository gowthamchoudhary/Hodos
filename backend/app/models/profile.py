from sqlalchemy import (
    Column,Integer,String,Text,ForeignKey,TIMESTAMP,func,
)
from sqlalchemy.orm import relationship
from app.db.database import Base
class Profile(Base):
  __tablename__ = "profiles"
  id = Column(Integer,primary_key=True,index=True)
  user_id = Column(String,nullable=False,index=True)
  name = Column(String,nullable=False)
  role = Column(String,nullable=False,index=True)


  experience_type = Column(String,nullable=False,index=True)
  company = Column(String,nullable=True,index=True)
  portfolio_url = Column(Text,nullable=True)
  resume_url = Column(Text,nullable=True)
  github_url = Column(Text, nullable=True)
  linkedin_url = Column(Text, nullable=True)
  x_url = Column(Text, nullable=True)
  created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=func.now())
  updated_at = Column(
    TIMESTAMP(timezone=True),
    nullable=False,
    server_default=func.now(),
    onupdate=func.now()
)
  skills = relationship("ProfileSkill",back_populates="profile")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

    profiles = relationship("ProfileSkill", back_populates="skill")



class ProfileSkill(Base):
    __tablename__ = "profile_skills"

    profile_id = Column(
        Integer,
        ForeignKey("profiles.id", ondelete="CASCADE"),
        primary_key=True,
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id", ondelete="CASCADE"),
        primary_key=True,
    )

    profile = relationship("Profile", back_populates="skills")
    skill = relationship("Skill", back_populates="profiles")    












