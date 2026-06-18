"""create profiles skills tables

Revision ID: a4505a422672
Revises: 5b0ffb088835
Create Date: 2026-06-18 18:32:34.175586

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a4505a422672'
down_revision: Union[str, Sequence[str], None] = '5b0ffb088835'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('experience_type', sa.String(), nullable=False),
    sa.Column('company', sa.String(), nullable=True),
    sa.Column('portfolio_url', sa.Text(), nullable=True),
    sa.Column('resume_url', sa.Text(), nullable=True),
    sa.Column('github_url', sa.Text(), nullable=True),
    sa.Column('linkedin_url', sa.Text(), nullable=True),
    sa.Column('x_url', sa.Text(), nullable=True),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_profiles_company'), 'profiles', ['company'], unique=False)
    op.create_index(op.f('ix_profiles_experience_type'), 'profiles', ['experience_type'], unique=False)
    op.create_index(op.f('ix_profiles_id'), 'profiles', ['id'], unique=False)
    op.create_index(op.f('ix_profiles_role'), 'profiles', ['role'], unique=False)
    op.create_table('skills',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_skills_id'), 'skills', ['id'], unique=False)
    op.create_table('profile_skills',
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.Column('skill_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['profile_id'], ['profiles.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['skill_id'], ['skills.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('profile_id', 'skill_id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('profile_skills')
    op.drop_index(op.f('ix_skills_id'), table_name='skills')
    op.drop_table('skills')
    op.drop_index(op.f('ix_profiles_role'), table_name='profiles')
    op.drop_index(op.f('ix_profiles_id'), table_name='profiles')
    op.drop_index(op.f('ix_profiles_experience_type'), table_name='profiles')
    op.drop_index(op.f('ix_profiles_company'), table_name='profiles')
    op.drop_table('profiles')
