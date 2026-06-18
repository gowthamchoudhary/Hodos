from sqlalchemy import (
    Column,Integer,String,Text,ForeignKey,TIMESTAMP,func,
)
from sqlalchemy.orm import relationship
from app.db.database import Base

class Profile(Base):
  __tablename__ = "profiles"
  id = Column(Integer,primary_key=True,index=True)
  user_id = Column(Integer,nullable=False,unique=True)
  name = Column(String,nullable=False)
  role = Column(String,nullable=False)

  experience_type = Column(String,nullable=False)
  company = Column(String,nullable=False)
  portfolio_url = Column(Text,nullable=False)
  resume_url = Column(Text,nullable=False)
  github_url = Column(Text,nullable=False)
  linked_url = Column(Text,nullable=False)
  x_url = Column(Text,nullable=False)
  created = Column(TIMESTAMP(timezone=True),server_default=func.now())
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














#   id

# user_id

# name

# role

# experience_type

# company

# portfolio_url

# resume_url

# github_url

# linkedin_url

# created_at