"""create initial tables

Revision ID: 20a5db1cff9f
Revises:
"""

from alembic import op
import sqlalchemy as sa


revision = "20a5db1cff9f"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.create_table(
        "organizations",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(100), nullable=False)
    )

    op.create_index(
        "ix_organizations_id",
        "organizations",
        ["id"]
    )

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("email", sa.String(150), nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column(
            "organization_id",
            sa.Integer(),
            sa.ForeignKey("organizations.id"),
            nullable=False
        )
    )

    op.create_index("ix_users_id", "users", ["id"])

    op.create_index(
        "ix_users_email",
        "users",
        ["email"],
        unique=True
    )

    op.create_table(
        "products",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("sku", sa.String(), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=True),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("low_stock_threshold", sa.Integer(), nullable=True),
        sa.Column(
            "organization_id",
            sa.Integer(),
            sa.ForeignKey("organizations.id"),
            nullable=False
        )
    )

    op.create_index("ix_products_id", "products", ["id"])


def downgrade() -> None:

    op.drop_table("products")
    op.drop_table("users")
    op.drop_table("organizations")