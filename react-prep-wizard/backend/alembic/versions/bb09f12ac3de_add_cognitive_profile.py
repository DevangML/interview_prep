"""add user_cognitive_profile table

Revision ID: bb09f12ac3de
Revises: aa08e94dc3ab
Create Date: 2026-08-26 23:24:00.000000
"""
from alembic import op
from sqlalchemy import Text
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = 'bb09f12ac3de'
down_revision = 'aa08e94dc3ab'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'user_cognitive_profile',
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('rigor_level', sa.String(length=32), nullable=False, server_default='Senior'),
        sa.Column('weakness_heatmap', sa.JSON().with_variant(postgresql.JSONB(astext_type=Text()), 'postgresql'), nullable=False),
        sa.Column('mastered_invariants', sa.JSON().with_variant(postgresql.JSONB(astext_type=Text()), 'postgresql'), nullable=False),
        sa.Column('jd_analyses', sa.JSON().with_variant(postgresql.JSONB(astext_type=Text()), 'postgresql'), nullable=False),
        sa.Column('bug_drills', sa.JSON().with_variant(postgresql.JSONB(astext_type=Text()), 'postgresql'), nullable=False),
        sa.Column('star_stories', sa.JSON().with_variant(postgresql.JSONB(astext_type=Text()), 'postgresql'), nullable=False),
        sa.Column('cheat_sheets', sa.JSON().with_variant(postgresql.JSONB(astext_type=Text()), 'postgresql'), nullable=False),
        sa.Column('revision', sa.Integer(), nullable=False, server_default='1'),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('user_id')
    )


def downgrade() -> None:
    op.drop_table('user_cognitive_profile')
