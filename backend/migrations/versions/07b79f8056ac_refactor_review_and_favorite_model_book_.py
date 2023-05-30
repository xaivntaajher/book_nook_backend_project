"""refactor review and favorite model book_id to not show as unique

Revision ID: 07b79f8056ac
Revises: 6c71b7e12c48
Create Date: 2023-05-30 13:52:03.495222

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '07b79f8056ac'
down_revision = '6c71b7e12c48'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.drop_index('book_id')

    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.drop_index('book_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.create_index('book_id', ['book_id'], unique=False)

    with op.batch_alter_table('favorite', schema=None) as batch_op:
        batch_op.create_index('book_id', ['book_id'], unique=False)

    # ### end Alembic commands ###
