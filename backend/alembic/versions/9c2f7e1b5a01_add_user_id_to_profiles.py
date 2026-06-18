"""add user id to profiles

Revision ID: 9c2f7e1b5a01
Revises: a4505a422672
Create Date: 2026-06-18 21:10:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op


# revision identifiers, used by Alembic.
revision: str = "9c2f7e1b5a01"
down_revision: Union[str, Sequence[str], None] = "a4505a422672"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("profiles", sa.Column("user_id", sa.String(), nullable=True))
    op.execute("UPDATE profiles SET user_id = 'legacy-unowned' WHERE user_id IS NULL")
    op.alter_column("profiles", "user_id", nullable=False)
    op.create_index(op.f("ix_profiles_user_id"), "profiles", ["user_id"], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_profiles_user_id"), table_name="profiles")
    op.drop_column("profiles", "user_id")
